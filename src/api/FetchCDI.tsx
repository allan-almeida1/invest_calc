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
    const currentDate = new Date().toLocaleDateString("pt-BR");
    const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados?formato=json&dataInicial=${currentDate}&dataFinal=${currentDate}`;
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network fetching failed");
        }
        const jsonData: CDIResponse[] = await res.json();
        setData(jsonData[0]);
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
