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

import { formatToCurrency } from "../../util/Util";

interface DataItem {
  label: string;
  value: number;
}
interface InvestmentResultsTableProps {
  data: DataItem[];
}

const InvestmentResultsTable: React.FC<InvestmentResultsTableProps> = ({
  data,
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
              {data.map((value, index) => {
                return (
                  <TableRow key={value.label.replace(" ", "-").toLowerCase()}>
                    <TableCell sx={{ fontWeight: 700 }}>
                      {value.label}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize:
                          index === data.length - 1 ? "large" : "medium",
                        fontWeight: index === data.length - 1 ? 700 : 500,
                      }}
                    >
                      {formatToCurrency(value.value)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default InvestmentResultsTable;
