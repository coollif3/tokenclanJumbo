import { Typography } from "@mui/material";
import { listExchanges } from "../../../_services/exchanges";
import ExchangeDataTable from "../../../_components/widgets/ExchangeTableListing/ExchangeDataTable";

const ExchangesPage = async () => {
  const results = await listExchanges();
  return (
    <main>
      <Typography variant="h1">Hello Exchanges Page!</Typography>
      <ExchangeDataTable rows={results} />
    </main>
  );
};

export default ExchangesPage;
