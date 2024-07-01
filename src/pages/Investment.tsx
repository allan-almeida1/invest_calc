import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import Layout from "../components/layout/Layout";
import InvestmentForm from "../components/forms/InvestmentForm";
import FetchCDI from "../api/FetchCDI";
import { parseCDI, rateDay2Month } from "../util/Util";
import { ThemeProvider } from "@emotion/react";
import theme from "../ui/theme";
import { useState } from "react";
import InvestmentResultsTable from "../components/tables/InvestmentResultsTable";
import { InvestmentOutputs } from "../types/Types";
import { Refresh } from "@mui/icons-material";

export default function Investment() {
  const { data, loading } = FetchCDI();
  const cdi = parseCDI(data?.valor);
  const cdiMonthly = rateDay2Month(cdi);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<InvestmentOutputs>({
    finalAmount: 0,
    totalInterest: 0,
    totalInvestment: 0,
  });
  const [resetForm, setResetForm] = useState<boolean>(false);
  console.log(cdiMonthly);

  return (
    <Layout>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography fontFamily="Roboto" fontSize="40px" fontWeight="100">
            Investimento em Renda Fixa
          </Typography>
          <Box display="flex" justifyContent="end">
            <ThemeProvider theme={theme}>
              <IconButton
                color="primary"
                onClick={() => {
                  setShowResults(false);
                  setResults({
                    finalAmount: 0,
                    totalInterest: 0,
                    totalInvestment: 0,
                  });
                  setResetForm(true);
                  setInterval(() => {
                    setResetForm(false);
                  }, 5);
                }}
              >
                <Refresh />
              </IconButton>
            </ThemeProvider>
          </Box>
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
            <InvestmentForm
              reset={resetForm}
              onSubmit={(output) => {
                setResults(output);
                setShowResults(true);
              }}
              cdi={cdiMonthly}
            />
          )}

          {showResults ? <InvestmentResultsTable results={results} /> : ""}
        </Box>
      </Container>
    </Layout>
  );
}
