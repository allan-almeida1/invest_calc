import { Grid } from "@mui/material";
import CurrencyInput from "../inputs/CurrencyInput";
import NumberButtonSelectInput from "../inputs/NumberWithButtonsAndSelectInput";
import RegularButton from "../buttons/RegularButton";

interface InvestmentFormProps {
  onSubmit?: () => void;
  cdi: number;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ onSubmit, cdi }) => {
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
            console.log(value);
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <CurrencyInput
          name="monthly-contribution"
          label="Aporte Mensal"
          onChange={(value: number) => {
            console.log(value);
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
            console.log(value, selected);
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <NumberButtonSelectInput
          name="interest-rate"
          label="Taxa de Juros"
          showButtons={false}
          selectOptions={interestRateOptions}
          onChange={(value, selected) => {
            console.log(value, selected);
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <RegularButton fullWidth>Calcular</RegularButton>
      </Grid>
    </Grid>
  );
};

export default InvestmentForm;
