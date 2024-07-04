import { useEffect, useState } from "react";

type CDIResponse = {
  data: string;
  valor: string;
};

export default function FetchCDI() {
  const [data, setData] = useState<CDIResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const currentDate = new Date();
    const finalDate = currentDate.toLocaleDateString("pt-BR");
    const someDaysAgo = currentDate;
    someDaysAgo.setDate(currentDate.getDate() - 10);
    const initialData = someDaysAgo.toLocaleDateString("pt-BR");
    const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados?formato=json&dataInicial=${initialData}&dataFinal=${finalDate}`;
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network fetching failed");
        }
        const jsonData: CDIResponse[] = await res.json();
        let mostRecentDate = new Date(1995, 11, 26);
        let mostRecentValue: string = "";
        for (let i = 0; i < jsonData.length; i++) {
          let receivedData = jsonData[i].data;
          const [day, month, year] = receivedData.split("/").map(Number);
          const dataObj = new Date(year, month - 1, day);
          if (dataObj >= mostRecentDate) {
            mostRecentDate = dataObj;
            mostRecentValue = jsonData[i].valor;
          }
        }
        const selectedObject: CDIResponse = {
          data: mostRecentDate.toLocaleDateString("pt-BR"),
          valor: mostRecentValue,
        };
        console.log("Received objects: ", jsonData);
        console.log("Selected: ", selectedObject);
        setData(selectedObject);
      } catch (error) {
        if (error instanceof Error) setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { data, loading, error };
}
