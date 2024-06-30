import { Grid } from "@mui/material";
import CurrencyInput from "../inputs/CurrencyInput";
import NumberButtonSelectInput from "../inputs/NumberWithButtonsAndSelectInput";
import RegularButton from "../buttons/RegularButton";
import { useState } from "react";
import { PeriodType, RateType } from "../../types/Types";

interface InvestmentFormProps {
  onSubmit?: () => void;
  cdi: number;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ onSubmit, cdi }) => {
  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
  const [period, setPeriod] = useState<number>(0);
  const [periodType, setPeriodType] = useState<PeriodType>("M");
  const [interestRate, setInterestRate] = useState<number>(0);
  const [rateType, setRateType] = useState<RateType>(cdi > 0 ? "CDI" : "M");

  const investmentInput = {
    initialInvestment,
    monthlyContribution,
    period,
    periodType,
    interestRate,
    rateType,
  };

  const interestRateOptions = ["mensal", "anual"];
  if (cdi > 0) {
    interestRateOptions.push("% do CDI");
  }
  return (
    <Grid container spacing={2} sx={{ pt: 3 }}>
      <Grid item xs={12} sm={6} md={4}>
        <CurrencyInput
          name="initial-investment"
          label="Investimento Inicial"
          onChange={(value: number) => {
            setInitialInvestment(value);
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <CurrencyInput
          name="monthly-contribution"
          label="Aporte Mensal"
          onChange={(value: number) => {
            setMonthlyContribution(value);
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <NumberButtonSelectInput
          name="period"
          label="Período de Aplicação"
          isInteger
          selectOptions={["meses", "anos"]}
          onChange={(value, selected) => {
            if (selected === "meses") {
              setPeriodType("M");
            } else {
              setPeriodType("Y");
            }
            setPeriod(value);
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <NumberButtonSelectInput
          name="interest-rate"
          label="Taxa de Juros"
          showButtons={false}
          defaultSelected={cdi > 0 ? "last" : "first"}
          selectOptions={interestRateOptions}
          onChange={(value, selected) => {
            if (selected === "mensal") {
              setRateType("M");
            } else if (selected === "anual") {
              setRateType("Y");
            } else {
              setRateType("CDI");
            }
            setInterestRate(value);
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <RegularButton
          fullWidth
          onClick={() => {
            console.log(investmentInput);
          }}
        >
          Calcular
        </RegularButton>
      </Grid>
    </Grid>
  );
};

export default InvestmentForm;
