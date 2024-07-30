import {
  getExchanges,
  getVolumeMktOverview,
  getVolumeMktOverviewChng,
} from "@app/_services/exchange";
import ExchangeDataTable from "@app/_components/widgets/ExchangeTableListing/ExchangeDataTable";
import GlobalCharts from "@app/_components/charts/apex/GlobalCharts";
import { Container, Grid, Typography } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

const chartConfig = {
  chartTitle: "Total Volume 24hr",
  tooltipSeries: "Volume 24hr",
  yaxisTitle: "24hr Volume USD (Billions)",
};

export const metadata = {
  title: "Crypto Exchange TVEV Data",
  description:
    "Token value to exchange volume (TVEV) ratio offers a way to value crypto exchange coins.",
};

const ExchangesPage = async () => {
  const results = await getExchanges();
  const chartSeries = await getVolumeMktOverview();
  const chngData = await getVolumeMktOverviewChng();

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
          <Typography variant="h2">Global Volume</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <CurrentMarketCard
            subheader={"Today's Volume USD"}
            value={chngData.totalvolume_usd}
            prefixUnit="$"
            roundedDigit={0}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(chngData.one_day_chng)}
            period={"day"}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(chngData.seven_day_chng)}
            period={"week"}
          />
        </Grid>
        <Grid item xs={3}>
          <PercentChngCard
            title={`30 Day Change`}
            value={parseFloat(chngData.thirty_day_chng)}
            period={"month"}
          />
        </Grid>
        <Grid item xs={12}>
          <GlobalCharts series={chartSeries} config={chartConfig} />
        </Grid>
        <Grid item xs={12}>
          <ExchangeDataTable rows={results} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExchangesPage;
