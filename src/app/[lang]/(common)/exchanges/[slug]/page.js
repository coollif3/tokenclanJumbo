import { Container, Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getExchangeVolumeFor,
  getExchangeVolumeChngFor,
  getExchangeMktcapFor,
  getExchangeMktcapChngFor,
  getExchangeTvevFor,
  getExchangeTvevChngFor,
  getExchangeNameFor,
  getExchanges,
} from "@app/_services/exchange";
import ExchangeCharts from "@app/_components/charts/apex/ExchangeCharts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

// export async function generateStaticParams() {
//   const rows = await getExchanges();
//   return rows.map((row) => ({ slug: row.slug }));
// }

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const coin = await getExchangeNameFor(slug);

  return {
    title: `${coin.name} Data on Market Cap, Exchange Volume and TVEV Ratio `,
    description: `TVEV ratio offers a way to value crypto exchange tokens like ${coin.name}`,
  };
}

async function DisplayVolumeChart(slug) {
  const volData = await getExchangeVolumeFor(slug, 30);
  const volumeChartConfig = {
    chartTitle: "Exchange Volume USD",
    tooltipSeries: "Volume",
    yaxisTitle: "24hr Volume USD (Billions)",
  };
  return <ExchangeCharts series={volData} config={volumeChartConfig} />;
}

async function DisplayVolumeStats(slug) {
  const volChng = await getExchangeVolumeChngFor(slug);

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CurrentMarketCard
          subheader={"Today's Volume USD"}
          value={volChng.vol_24hr_normalized}
          prefixUnit="$"
          roundedDigit={0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(volChng.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(volChng.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(volChng.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}

async function DisplayMktcapFor(slug) {
  const mktcapData = await getExchangeMktcapFor(slug, 30);
  const marketcapChartConfig = {
    chartTitle: "Market Cap",
    tooltipSeries: "Market Cap",
    yaxisTitle: "USD",
  };

  return <ExchangeCharts series={mktcapData} config={marketcapChartConfig} />;
}

async function DisplayMktcapStatsFor(slug) {
  const mktcapChng = await getExchangeMktcapChngFor(slug);

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CurrentMarketCard
          subheader={"Today's Market Cap USD"}
          value={mktcapChng.market_cap}
          prefixUnit="$"
          roundedDigit={0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(mktcapChng.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(mktcapChng.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(mktcapChng.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}

async function DisplayTvevRatioChartFor(slug) {
  const tvevChartConfig = {
    chartTitle: "TVEV",
    tooltipSeries: "Tvev Ratio",
    yaxisTitle: "Ratio",
  };
  const tvevData = await getExchangeTvevFor(slug, 30);

  return <ExchangeCharts series={tvevData} config={tvevChartConfig} />;
}

async function DisplayTvevStats(slug) {
  const tvevChng = await getExchangeTvevChngFor(slug);

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CurrentMarketCard
          subheader={"Today's Ratio"}
          value={tvevChng.ratio}
          prefixUnit=""
          roundedDigit={2}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(tvevChng.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(tvevChng.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(tvevChng.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}

export default async function ExchangeDetailedPage({ params }) {
  const slug = params.slug;
  const coin = await getExchangeNameFor(slug);

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
        <Grid container spacing={3.75} sx={{ my: 3 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h2">{`${coin.name} Exchange Volume USD`}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ marginLeft: "auto" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/exchanges">
                Exchanges
              </Link>
              <Typography color="text.primary">{coin.name}</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container spacing={3.75}>
          {await DisplayVolumeStats(slug)}
          <Grid item xs={12}>
            {await DisplayVolumeChart(slug)}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h2">{`${coin.name} Market Cap (USD)`}</Typography>
          </Grid>
          {await DisplayMktcapStatsFor(slug)}
          <Grid item xs={12}>
            {await DisplayMktcapFor(slug)}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h2">{`${coin.name} TVEV Ratio`}</Typography>
          </Grid>
          {await DisplayTvevStats(slug)}
          <Grid item xs={12}>
            {await DisplayTvevRatioChartFor(slug)}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
