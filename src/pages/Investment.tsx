import { Box, Container, Grid, Typography } from "@mui/material";
import Layout from "../components/layout/Layout";
import CurrencyInput from "../components/inputs/CurrencyInput";
import NumberButtonSelectInput from "../components/inputs/NumberWithButtonsAndSelectInput";

export default function Investment() {
  return (
    <Layout>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography fontFamily="Roboto" fontSize="40px" fontWeight="100">
            Investimento em Renda Fixa
          </Typography>
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

            <Grid item xs={12} md={4}>
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
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
}
