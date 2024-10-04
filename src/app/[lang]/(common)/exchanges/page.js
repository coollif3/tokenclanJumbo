import React, { Suspense, lazy } from "react";
import {
  getExchanges,
  getVolumeMktOverview,
  getVolumeMktOverviewChng,
} from "@app/_services/exchange";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

const ExchangeDataTable = lazy(
  () =>
    import("@app/_components/widgets/ExchangeTableListing/ExchangeDataTable")
);

const Chart = lazy(() => import("@app/_components/charts/apex/Chart"));

export const metadata = {
  title: "Crypto Exchange TVEV Data",
  description:
    "Token value to exchange volume (TVEV) ratio offers a way to value crypto exchange coins.",
};

const chartConfig = {
  chartTitle: "Total Volume 24hr",
  tooltipSeries: "Volume 24hr",
  yaxisTitle: "24hr Volume USD (Billions)",
  yaxisFormatter: "BILLION_UNIT",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

const ExchangesPage = async () => {
  const results = await getExchanges();
  const chngData = await getVolumeMktOverviewChng();
  const chartSeries = await getVolumeMktOverview();
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
          <Typography variant="h3">Global Volume</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CurrentMarketCard
            subheader={"Today's Volume USD"}
            value={chngData.totalvolume_usd}
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
            <ExchangeDataTable rows={results} />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExchangesPage;
