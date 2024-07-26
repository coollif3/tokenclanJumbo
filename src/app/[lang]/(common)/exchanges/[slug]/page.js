import { Container, Grid, Typography } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getExchangeVolumeFor,
  getExchangeVolumeChngFor,
} from "@app/_services/exchanges";
import ExchangeCharts from "@app/_components/charts/apex/ExchangeCharts";
import PercentChngCard from "../../../../_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

const chartConfig = {
  chartTitle: "Exchange Volume USD",
  tooltipSeries: "Volume",
  yaxisTitle: "24hr Volume USD (Billions)",
};

export default async function ExchangeDetailedPage({ params }) {
  const slug = params.slug;
  const volData = await getExchangeVolumeFor(slug, 30);
  const volChng = await getExchangeVolumeChngFor(slug);
  return (
    <>
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
            <Typography variant="h2">Exchange Volume USD</Typography>
          </Grid>

          <Grid item xs={3}>
            <CurrentMarketCard
              subheader={"Today's Volume USD"}
              value={volChng.vol_24hr_normalized}
            />
          </Grid>
          <Grid item xs={3}>
            <PercentChngCard
              title={`24hr Change`}
              value={parseFloat(volChng.one_day_chng)}
              period={"day"}
            />
          </Grid>
          <Grid item xs={3}>
            <PercentChngCard
              title={`7 Day Change`}
              value={parseFloat(volChng.seven_day_chng)}
              period={"week"}
            />
          </Grid>
          <Grid item xs={3}>
            <PercentChngCard
              title={`30 Day Change`}
              value={parseFloat(volChng.thirty_day_chng)}
              period={"month"}
            />
          </Grid>

          <Grid item xs={12}>
            <ExchangeCharts series={volData} config={chartConfig} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h2">Market Cap (USD)</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h2">TVEV Ratio</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
