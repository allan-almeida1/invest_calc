import { Grid } from "@mui/material";
import { FunctionComponent, useState } from "react";
import CurrencyInput from "../inputs/CurrencyInput";
import NumberButtonSelectInput from "../inputs/NumberWithButtonsAndSelectInput";
import { ProfitInputs, ProfitOutputs, RateType } from "../../types/Types";
import RegularButton from "../buttons/RegularButton";
import { calculateProfit } from "../../util/Formulas";

interface ProfitFormProps {
  cdi: number;
  onSubmit?: (values: ProfitOutputs) => void;
}

const ProfitForm: FunctionComponent<ProfitFormProps> = ({ cdi, onSubmit }) => {
  const [desiredIncomeHelperText, setDesiredIncomeHelperText] = useState("");
  const [desiredIncomeError, setDesiredIncomeError] = useState(false);
  const [interestInputHelperText, setInterestInputHelperText] = useState("");
  const [interestInputError, setInterestInputError] = useState(false);
  const [desiredIncome, setDesiredIncome] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [rateType, setRateType] = useState<RateType>(cdi > 0 ? "CDI" : "M");
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);

  const profitInputs: ProfitInputs = {
    interestRate,
    desiredIncome,
    rateType,
  };

  const checkIncomeError = (desiredIncome_: number) => {
    if (desiredIncome_ <= 0) {
      setDesiredIncomeError(true);
      setDesiredIncomeHelperText("O valor deve ser maior que zero");
      setButtonEnabled(false);
    } else {
      setDesiredIncomeError(false);
      setDesiredIncomeHelperText("");
      if (interestRate > 0 && desiredIncome_ > 0) {
        setButtonEnabled(true);
      }
    }
  };

  const checkInterestError = (interestRate_: number) => {
    if (interestRate_ <= 0) {
      setInterestInputError(true);
      setInterestInputHelperText("A taxa de juros deve ser maior que zero");
      setButtonEnabled(false);
    } else {
      setInterestInputError(false);
      setInterestInputHelperText("");
      if (desiredIncome > 0 && interestRate_ > 0) {
        setButtonEnabled(true);
      }
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
          name="desired-income"
          label="Renda Mensal Desejada"
          required
          error={desiredIncomeError}
          helperText={desiredIncomeHelperText}
          onBlur={() => {
            checkIncomeError(desiredIncome);
          }}
          onChange={(value) => {
            setDesiredIncome(value);
            checkIncomeError(value);
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <NumberButtonSelectInput
          name="interest-rate"
          label="Taxa de Juros"
          showButtons={false}
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
            checkInterestError(value);
          }}
          onBlur={() => {
            checkInterestError(interestRate);
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <RegularButton
          fullWidth
          disabled={!buttonEnabled}
          onClick={() => {
            console.log(JSON.parse(JSON.stringify(profitInputs)));
            const outputs = calculateProfit(profitInputs, cdi);
            if (onSubmit) onSubmit(outputs);
          }}
        >
          Calcular
        </RegularButton>
      </Grid>
    </Grid>
  );
};

export default ProfitForm;
