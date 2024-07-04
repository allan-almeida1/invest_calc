import { Grid } from "@mui/material";
import CurrencyInput from "../inputs/CurrencyInput";
import NumberButtonSelectInput from "../inputs/NumberWithButtonsAndSelectInput";
import RegularButton from "../buttons/RegularButton";
import { useEffect, useState } from "react";
import {
  InvestmentInputs,
  InvestmentOutputs,
  PeriodType,
  RateType,
} from "../../types/Types";
import { calculateInvestment } from "../../util/Formulas";

interface InvestmentFormProps {
  onSubmit?: (output: InvestmentOutputs) => void;
  cdi: number;
  reset?: boolean;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({
  onSubmit,
  cdi,
  reset = false,
}) => {
  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
  const [period, setPeriod] = useState<number>(0);
  const [periodType, setPeriodType] = useState<PeriodType>("M");
  const [interestRate, setInterestRate] = useState<number>(0);
  const [rateType, setRateType] = useState<RateType>(cdi > 0 ? "CDI" : "M");
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [interestInputError, setInterestInputError] = useState<boolean>(false);
  const [interestInputHelperText, setInterestInputHelperText] =
    useState<string>("");

  const investmentInput: InvestmentInputs = {
    initialInvestment,
    monthlyContribution,
    period,
    periodType,
    interestRate,
    rateType,
  };

  useEffect(() => {
    if (reset) {
      setInterestInputError(false);
      setInterestInputHelperText("");
    }
  }, [reset]);

  const checkErrors = (rate: number) => {
    setButtonEnabled(rate > 0);
    if (!reset) {
      setInterestInputError(rate === 0);
      setInterestInputHelperText(
        rate === 0 ? "A taxa de juros deve ser maior que zero" : ""
      );
    }
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
          reset={reset}
          onChange={(value: number) => {
            setInitialInvestment(value);
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <CurrencyInput
          name="monthly-contribution"
          label="Aporte Mensal"
          reset={reset}
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
          reset={reset}
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
          reset={reset}
          error={interestInputError}
          helperText={interestInputHelperText}
          required
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
            setInterestRate(value / 100);
            checkErrors(value);
          }}
          onBlur={() => {
            checkErrors(interestRate);
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <RegularButton
          fullWidth
          disabled={!buttonEnabled}
          onClick={() => {
            console.log(JSON.parse(JSON.stringify(investmentInput)));
            const outputs = calculateInvestment(investmentInput, cdi);
            if (onSubmit) onSubmit(outputs);
          }}
        >
          Calcular
        </RegularButton>
      </Grid>
    </Grid>
  );
};

export default InvestmentForm;
