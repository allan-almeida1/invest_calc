import {
  InvestmentInputs,
  InvestmentOutputs,
  ProfitInputs,
  ProfitOutputs,
} from "../types/Types";

const calculateInvestment = (
  input: InvestmentInputs,
  cdi: number
): InvestmentOutputs => {
  // Se o período for anual, converta pra meses
  if (input.periodType === "Y") {
    input.period *= 12;
    input.periodType = "M";
  }
  //   Se a taxa de juros for anual, converta pra mensal
  if (input.rateType === "Y") {
    input.interestRate = (1 + input.interestRate) ** (1 / 12) - 1;
    input.rateType = "M";
  }
  //   Se a taxa de juros for percentual do CDI, calcule o valor
  else if (input.rateType === "CDI") {
    input.interestRate = input.interestRate * cdi;
    input.rateType = "M";
  }

  const FV =
    (input.monthlyContribution *
      ((1 + input.interestRate) ** input.period - 1)) /
    input.interestRate;
  const M = input.initialInvestment * (1 + input.interestRate) ** input.period;
  const output: InvestmentOutputs = {
    finalAmount: FV + M,
    totalInterest:
      FV +
      M -
      input.initialInvestment -
      input.monthlyContribution * input.period,
    totalInvestment:
      input.initialInvestment + input.monthlyContribution * input.period,
  };

  return output;
};

const calculateProfit = (input: ProfitInputs, cdi: number): ProfitOutputs => {
  if (input.rateType === "Y") {
    input.interestRate = (1 + input.interestRate) ** (1 / 12) - 1;
    input.rateType = "M";
  } else if (input.rateType === "CDI") {
    input.interestRate = input.interestRate * cdi;
    input.rateType = "CDI";
  }
  const output: ProfitOutputs = {
    necessaryAmount: input.desiredIncome / input.interestRate,
  };
  return output;
};

export { calculateInvestment, calculateProfit };
