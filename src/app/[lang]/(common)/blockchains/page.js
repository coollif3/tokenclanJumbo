import DataTable from "@app/_components/widgets/BlockchainTableListing/DataTable";
import {
  blockchainMktOverview,
  listBlockchains,
} from "@app/_services/blockchain";
import { Container, Grid } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import GlobalCharts from "@app/_components/charts/apex/GlobalCharts";
import { formatToTimestampArray } from "@app/_utilities/helpers";

const BlockchainsPage = async () => {
  const listingRows = await listBlockchains();
  const chartSeries = await blockchainMktOverview();
  const formattedSeries = formatToTimestampArray(chartSeries);

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Grid container spacing={3.75}>
        <Grid item xs={12}>
          <GlobalCharts series={formattedSeries} />
        </Grid>
        <Grid item xs={12}>
          <DataTable rows={listingRows} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlockchainsPage;
