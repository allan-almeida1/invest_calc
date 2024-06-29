import { House, Savings } from "@mui/icons-material";
import IconButton from "../components/buttons/IconButton";
import Layout from "../components/layout/Layout";

export default function Home() {
  return (
    <Layout isHome alignItems="center" justifyContent="center">
      <IconButton href="/financing" icon={House} text="Financiamento" />
      <IconButton href="/investment" icon={Savings} text="Investimento" />
    </Layout>
  );
}
