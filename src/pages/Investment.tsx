import {
  Box,
  Card,
  CardContent,
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
import { InvestmentOutputs, ProfitOutputs } from "../types/Types";
import { Refresh } from "@mui/icons-material";
import FormTab from "../components/tabs/FormTab";
import ProfitForm from "../components/forms/ProfitForm";

export default function Investment() {
  const tabs = ["poupar", "viver de renda"];
  const { data, loading } = FetchCDI();
  const cdi = parseCDI(data?.valor);
  const cdiMonthly = rateDay2Month(cdi);
  const [tab, setTab] = useState(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [investmentResults, setInvestmentResults] = useState<InvestmentOutputs>(
    {
      finalAmount: 0,
      totalInterest: 0,
      totalInvestment: 0,
    }
  );
  const [profitOutputs, setProfitOutputs] = useState<ProfitOutputs>({
    necessaryAmount: 0,
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
                  setInvestmentResults({
                    finalAmount: 0,
                    totalInterest: 0,
                    totalInvestment: 0,
                  });
                  setResetForm(true);
                  setInterval(() => {
                    setResetForm(false);
                  }, 5);
                  window.location.reload();
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
            <Card>
              <CardContent>
                <FormTab
                  tabNames={tabs}
                  onChange={(selectedTab) => {
                    setTab(selectedTab);
                  }}
                />
                {tab === 0 ? (
                  <InvestmentForm
                    reset={resetForm}
                    onSubmit={(output) => {
                      setInvestmentResults(output);
                      setShowResults(true);
                    }}
                    cdi={cdiMonthly}
                  />
                ) : (
                  <ProfitForm
                    cdi={cdiMonthly}
                    onSubmit={(values) => {
                      setProfitOutputs(values);
                      console.log(values);
                    }}
                  />
                )}
              </CardContent>
            </Card>
          )}

          {showResults ? (
            <InvestmentResultsTable results={investmentResults} />
          ) : (
            // TODO: Check lifting state x State Management solution
            // @See: https://stackoverflow.com/questions/75988949/how-to-keep-childrens-state-while-change-the-parent-component-tree-structure
            ""
          )}
        </Box>
      </Container>
    </Layout>
  );
}
