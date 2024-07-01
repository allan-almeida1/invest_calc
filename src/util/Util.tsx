function parseCDI(cdiString: string | undefined) {
  return cdiString ? parseFloat(cdiString) : undefined;
}

function rateDay2Month(rate: number | undefined) {
  return rate ? (1 + rate / 100) ** 21 - 1 : 0;
}

function formatToCurrency(value: number): string {
  const formatter = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  });
  return formatter.format(value);
}

export { parseCDI, rateDay2Month, formatToCurrency };
