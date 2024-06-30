import { Box, CircularProgress, Container, Typography } from "@mui/material";
import Layout from "../components/layout/Layout";
import InvestmentForm from "../components/forms/InvestmentForm";
import FetchCDI from "../api/FetchCDI";
import { parseCDI, rateDay2Month } from "../util/Util";
import { ThemeProvider } from "@emotion/react";
import theme from "../ui/theme";

export default function Investment() {
  const { data, loading, error } = FetchCDI();
  const cdi = parseCDI(data?.valor);
  const cdiMonthly = rateDay2Month(cdi);
  console.log(cdiMonthly);
  return (
    <Layout>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography fontFamily="Roboto" fontSize="40px" fontWeight="100">
            Investimento em Renda Fixa
          </Typography>
          {loading ? (
            <ThemeProvider theme={theme}>
              <Box
                display="flex"
                height={200}
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress />
              </Box>
            </ThemeProvider>
          ) : (
            <InvestmentForm cdi={cdiMonthly} />
          )}
          <InvestmentForm cdi={0} />
          <InvestmentForm cdi={0} />
        </Box>
      </Container>
    </Layout>
  );
}
