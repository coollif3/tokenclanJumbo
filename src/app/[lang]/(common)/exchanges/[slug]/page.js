import { Container, Grid, Typography } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getExchangeVolumeFor,
  getExchangeVolumeChngFor,
  getExchangeMktcapFor,
  getExchangeMktcapChngFor,
  getExchangeTvevFor,
  getExchangeTvevChngFor,
} from "@app/_services/exchange";
import ExchangeCharts from "@app/_components/charts/apex/ExchangeCharts";
import PercentChngCard from "../../../../_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

const volumeChartConfig = {
  chartTitle: "Exchange Volume USD",
  tooltipSeries: "Volume",
  yaxisTitle: "24hr Volume USD (Billions)",
};

const marketcapChartConfig = {
  chartTitle: "Market Cap",
  tooltipSeries: "Market Cap",
  yaxisTitle: "USD",
};

const tvevChartConfig = {
  chartTitle: "TVEV",
  tooltipSeries: "Tvev Ratio",
  yaxisTitle: "Ratio",
};

export default async function ExchangeDetailedPage({ params }) {
  const slug = params.slug;
  const volData = await getExchangeVolumeFor(slug, 30);
  const volChng = await getExchangeVolumeChngFor(slug);

  const mktcapData = await getExchangeMktcapFor(slug, 30);
  const mktcapChng = await getExchangeMktcapChngFor(slug);

  const tvevData = await getExchangeTvevFor(slug, 30);
  const tvevChng = await getExchangeTvevChngFor(slug);

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
            <ExchangeCharts series={volData} config={volumeChartConfig} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h2">Market Cap (USD)</Typography>
          </Grid>

          <Grid item xs={3}>
            <CurrentMarketCard
              subheader={"Today's Market Cap USD"}
              value={mktcapChng.market_cap}
            />
          </Grid>
          <Grid item xs={3}>
            <PercentChngCard
              title={`24hr Change`}
              value={parseFloat(mktcapChng.one_day_chng)}
              period={"day"}
            />
          </Grid>
          <Grid item xs={3}>
            <PercentChngCard
              title={`7 Day Change`}
              value={parseFloat(mktcapChng.seven_day_chng)}
              period={"week"}
            />
          </Grid>
          <Grid item xs={3}>
            <PercentChngCard
              title={`30 Day Change`}
              value={parseFloat(mktcapChng.thirty_day_chng)}
              period={"month"}
            />
          </Grid>

          <Grid item xs={12}>
            <ExchangeCharts series={mktcapData} config={marketcapChartConfig} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h2">TVEV Ratio</Typography>
          </Grid>
          <Grid item xs={3}>
            <CurrentMarketCard
              subheader={"Today's Ratio"}
              value={tvevChng.ratio}
            />
          </Grid>
          <Grid item xs={3}>
            <PercentChngCard
              title={`24hr Change`}
              value={parseFloat(tvevChng.one_day_chng)}
              period={"day"}
            />
          </Grid>
          <Grid item xs={3}>
            <PercentChngCard
              title={`7 Day Change`}
              value={parseFloat(tvevChng.seven_day_chng)}
              period={"week"}
            />
          </Grid>
          <Grid item xs={3}>
            <PercentChngCard
              title={`30 Day Change`}
              value={parseFloat(tvevChng.thirty_day_chng)}
              period={"month"}
            />
          </Grid>

          <Grid item xs={12}>
            <ExchangeCharts series={tvevData} config={tvevChartConfig} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
