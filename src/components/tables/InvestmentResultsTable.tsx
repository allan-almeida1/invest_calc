import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { InvestmentOutputs } from "../../types/Types";
import { formatToCurrency } from "../../util/Util";

interface InvestmentResultsTableProps {
  results: InvestmentOutputs;
}

const InvestmentResultsTable: React.FC<InvestmentResultsTableProps> = ({
  results,
}) => {
  return (
    <Grid container marginTop={2} marginBottom={3} spacing={2}>
      <Grid item xs={12}>
        <Typography fontSize="x-large">Resultados</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="investment-results-table">
            <TableBody>
              <TableRow key="total-investment">
                <TableCell sx={{ fontWeight: 700 }}>Total Investido</TableCell>
                <TableCell sx={{ fontSize: "medium" }}>
                  {formatToCurrency(results.totalInvestment)}
                </TableCell>
              </TableRow>
              <TableRow key="total-interest">
                <TableCell sx={{ fontWeight: 700 }}>
                  Total ganho em juros
                </TableCell>
                <TableCell sx={{ fontSize: "medium" }}>
                  {formatToCurrency(results.totalInterest)}
                </TableCell>
              </TableRow>
              <TableRow key="final-amount">
                <TableCell sx={{ fontWeight: 700 }}>Valor Final</TableCell>
                <TableCell sx={{ fontSize: "large", fontWeight: 700 }}>
                  {formatToCurrency(results.finalAmount)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default InvestmentResultsTable;
