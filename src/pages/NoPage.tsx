import { Typography } from "@mui/material";
import Layout from "../components/layout/Layout";

export default function NoPage() {
  return (
    <Layout justifyContent="center" alignItems="center">
      <Typography color="#555" fontSize="larger">
        404 | Page Not Found
      </Typography>
    </Layout>
  );
}
