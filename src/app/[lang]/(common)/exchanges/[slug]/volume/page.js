import {
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  CircularProgress,
} from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getExchangeVolumeFor,
  getExchangeVolumeChngFor,
  getExchangeNameFor,
  getExchanges,
} from "@app/_services/exchange";
import { getCoinSlugUsingExchngSlug } from "@app/_services/coin";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";
import { Suspense, lazy } from "react";
import ExchangeSubmenu from "@app/_components/_core/ExchangeSubmenu";
import CompareTimeSeriesBox from "@app/_components/_core/CompareTimeSeriesBox";

const DataTimeframeChart = lazy(
  () => import("@app/_components/charts/apex/DataTimeframeChart")
);

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const exchange = await getExchangeNameFor(slug);

  return {
    title: `${exchange.name} Transacted Volume | TokenClan`,
    description: `${exchange.name} offchain transacted volume in Btc data history with charting values up to 12 months.`,
  };
}

export async function generateStaticParams() {
  const rows = await getExchanges();
  return rows.map((row) => ({ slug: row.slug }));
}

export default async function SlugVolumePage({ params }) {
  const slug = params.slug;
  const coin = await getCoinSlugUsingExchngSlug(slug);
  const exchange = await getExchangeNameFor(slug);
  const volumeChng = await getExchangeVolumeChngFor(slug);
  const listingRows = await getExchanges();

  const chartConfig = {
    chartTitle: "Exchange Volume BTC",
    tooltipSeries: `${exchange.name}`,
    yaxisTitle: "24hr Volume",
    yaxisFormatter: "THOUSAND_SEPARATOR",
    yaxisTooltipFormatterLabel: "BITCOIN",
  };
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
      <Grid container spacing={3.75} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3">{`${exchange.name} Exchange Volume`}</Typography>
          <ExchangeSubmenu slug={slug} coinSlug={coin.slug} />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ marginLeft: "auto" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/exchanges">
              Exchanges
            </Link>
            <Link underline="hover" color="inherit" href={`/exchanges/${slug}`}>
              {exchange.name}
            </Link>
            <Typography color="text.primary">Ratio</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={3.75}>
        <Grid item xs={12} sm={6} md={3}>
          <CurrentMarketCard
            subheader={"Today's Volume BTC"}
            value={volumeChng.vol_24hr_normalized}
            prefixUnit={""}
            roundedDigit={0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(volumeChng.one_day_chng)}
            period={"day"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(volumeChng.seven_day_chng)}
            period={"week"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`30 Day Change`}
            value={parseFloat(volumeChng.thirty_day_chng)}
            period={"month"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={12}>
          <CompareTimeSeriesBox slugData={listingRows} boxType="exchange" />
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={<CircularProgress />}>
            <DataTimeframeChart
              slug={slug}
              dataFunc={getExchangeVolumeFor}
              chartConfig={chartConfig}
              chartType="exchange"
            />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}
