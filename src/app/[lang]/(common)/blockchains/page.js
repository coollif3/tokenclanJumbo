import { lazy, Suspense } from "react";
import {
  getBlockchainMktOverviewChng,
  getBlockchainMktOverview,
  getBlockchains,
} from "@app/_services/blockchain";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

const BlockchainDataTable = lazy(
  () =>
    import(
      "@app/_components/widgets/BlockchainTableListing/BlockchainDataTable"
    )
);

const Chart = lazy(() => import("@app/_components/charts/apex/Chart"));

export const metadata = {
  title: "Blockchain Market Cap / Total Value Lock (TVL) Data",
  description:
    "Explore the latest trends and get insights into blockchains where crypto investors park their digital assets.",
};

const chartConfig = {
  chartTitle: "Total Blockchain TVL",
  tooltipSeries: "Total TVL",
  yaxisTitle: "TVL in USD (Billion)",
  yaxisFormatter: "BILLION_UNIT",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

const BlockchainsPage = async () => {
  const chngData = await getBlockchainMktOverviewChng();
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
          <Typography variant="h3">Blockchain TVL</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CurrentMarketCard
            subheader={"Today's TVL USD"}
            value={chngData.all_total_usd}
            prefixUnit="$"
            roundedDigit={0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(chngData.one_day_chng)}
            period={"day"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(chngData.seven_day_chng)}
            period={"week"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`30 Day Change`}
            value={parseFloat(chngData.thirty_day_chng)}
            period={"month"}
          />
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={<CircularProgress />}>
            <Chart series={chartSeries} config={chartConfig} />
          </Suspense>
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={<CircularProgress />}>
            <BlockchainDataTable rows={listingRows} />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlockchainsPage;
