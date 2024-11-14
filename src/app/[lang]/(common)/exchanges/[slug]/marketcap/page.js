import { Suspense, lazy } from "react";
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
  getExchangeMktcapFor,
  getExchangeMktcapChngFor,
  getExchangeNameFor,
  getExchanges,
} from "@app/_services/exchange";
import { getCoinSlugUsingExchngSlug } from "@app/_services/coin";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

const DataTimeframeChart = lazy(
  () => import("@app/_components/charts/apex/DataTimeframeChart")
);

import ExchangeSubmenu from "@app/_components/_core/ExchangeSubmenu";
import CompareTimeSeriesBox from "@app/_components/_core/CompareTimeSeriesBox";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const exchange = await getExchangeNameFor(slug);

  return {
    title: `${exchange.name} Exchange Marketcap | TokenClan`,
    description: `${exchange.name} exchange marketcap usd data history with charting values up to 12 months.`,
  };
}

export async function generateStaticParams() {
  const rows = await getExchanges();
  return rows.map((row) => ({ slug: row.slug }));
}

export default async function SlugMktcapPage({ params }) {
  const slug = params.slug;
  const coin = await getCoinSlugUsingExchngSlug(slug);
  const exchange = await getExchangeNameFor(slug);
  const mktcapChng = await getExchangeMktcapChngFor(slug);
  const listingRows = await getExchanges();

  const chartConfig = {
    chartTitle: "Exchange Marketcap",
    tooltipSeries: `${exchange.name}`,
    yaxisTitle: "USD",
    yaxisFormatter: "THOUSAND_SEPARATOR",
    yaxisTooltipFormatterLabel: "DOLLAR",
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
          <Typography variant="h3">{`${exchange.name} Marketcap`}</Typography>
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
            <Typography color="text.primary">Marketcap</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={3.75}>
        <Grid item xs={12} sm={6} md={3}>
          <CurrentMarketCard
            subheader={"Today's Marketcap"}
            value={mktcapChng.market_cap}
            prefixUnit={"$"}
            roundedDigit={0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(mktcapChng.one_day_chng)}
            period={"day"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(mktcapChng.seven_day_chng)}
            period={"week"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`30 Day Change`}
            value={parseFloat(mktcapChng.thirty_day_chng)}
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
              dataFunc={getExchangeMktcapFor}
              chartConfig={chartConfig}
              chartType="exchange"
            />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}
