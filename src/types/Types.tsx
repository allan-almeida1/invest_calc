export type PeriodType = "M" | "Y";
export type RateType = "M" | "Y" | "CDI";
export type InvestmentInputs = {
  initialInvestment: number;
  monthlyContribution: number;
  period: number;
  interestRate: number;
  periodType: PeriodType;
  rateType: RateType;
};

export type InvestmentOutputs = {
  totalInvestment: number;
  finalAmount: number;
  totalInterest: number;
};