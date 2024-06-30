function parseCDI(cdiString: string | undefined) {
  return cdiString ? parseFloat(cdiString) : undefined;
}

function rateDay2Month(rate: number | undefined) {
  return rate ? (1 + rate / 100) ** 21 - 1 : 0;
}

export { parseCDI, rateDay2Month };
