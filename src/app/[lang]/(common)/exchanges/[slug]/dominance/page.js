import { lazy, Suspense } from "react";
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
  getExchangeCoinDominanceForSlug,
  getExchangeNameFor,
  getExchanges,
} from "@app/_services/exchange";
import { getCoinNameFromExchangeSlug } from "@app/_services/coin";

const DataTimeframeChart = lazy(
  () => import("@app/_components/charts/apex/DataTimeframeChart")
);

import ExchangeSubmenu from "@app/_components/_core/ExchangeSubmenu";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const exchange = await getExchangeNameFor(slug);
  return {
    title: `${exchange.name} Exchange Volume Dominance | TokenClan`,
    description: `${exchange.name} offchain transacted volume dominance data history with charting values up to 12 months.`,
  };
}

export async function generateStaticParams() {
  const rows = await getExchanges();
  return rows.map((row) => ({ slug: row.slug }));
}

const chartConfig = {
  chartTitle: "Dominance",
  tooltipSeries: "Dominance",
  yaxisTitle: "%",
  yaxisFormatter: "",
  yaxisTooltipFormatterLabel: "PERCENTAGE",
};

export default async function SlugDominancePage({ params }) {
  const slug = params.slug;
  const coin = await getCoinNameFromExchangeSlug(slug);
  const exchange = await getExchangeNameFor(slug);

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
          <Typography variant="h3">{`${exchange.name} Volume Dominance (Offchain)`}</Typography>
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
            <Typography color="text.primary">Dominance</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={3.75}>
        <Grid item xs={12}>
          <Suspense fallback={<CircularProgress />}>
            <DataTimeframeChart
              slug={slug}
              chartConfig={chartConfig}
              dataFunc={getExchangeCoinDominanceForSlug}
            />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}
