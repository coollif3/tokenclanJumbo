import BlockchainDataTable from "@app/_components/widgets/BlockchainTableListing/BlockchainDataTable";
import {
  getBlockchainMktOverview,
  getBlockchains,
} from "@app/_services/blockchain";
import { Container, Grid } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import GlobalCharts from "@app/_components/charts/apex/GlobalCharts";

const chartConfig = {
  chartTitle: "Total Blockchain TVL",
  tooltipSeries: "Total TVL",
  yaxisTitle: "TVL in USD (Billion)",
};

const BlockchainsPage = async () => {
  const listingRows = await getBlockchains();
  const chartSeries = await getBlockchainMktOverview();

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
          <GlobalCharts series={chartSeries} config={chartConfig} />
        </Grid>
        <Grid item xs={12}>
          <BlockchainDataTable rows={listingRows} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlockchainsPage;
