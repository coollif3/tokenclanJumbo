import {
  getBlockchains,
  getBlockchainNameForSlug,
  getBlockchainTvlChngForSlug,
  getBlockchainTvlForSlug,
} from "@app/_services/blockchain";
import {
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  CircularProgress,
} from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";
import { Suspense } from "react";
import DataChart from "@app/_components/charts/apex/DataChart";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const coin = await getBlockchainNameForSlug(slug);

  return {
    title: `${coin.name} Blockchain TVL | TokenClan`,
    description: `${coin.name} TVL data history on chart.`,
  };
}

export async function generateStaticParams() {
  const rows = await getBlockchains();
  return rows.map((row) => ({ slug: row.slug }));
}

const chartConfig = {
  chartTitle: "TVL",
  tooltipSeries: "TVL",
  yaxisTitle: "USD",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

export default async function SlugTvlPage({ params }) {
  const slug = params.slug;
  const coin = await getBlockchainNameForSlug(slug);
  const tvlChng = await getBlockchainTvlChngForSlug(slug);
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
      <Grid container spacing={3.75} sx={{ my: 3 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h3">{`${coin.name} TVL`}</Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ marginLeft: "auto" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/blockchains">
              Blockchains
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href={`/blockchains/${slug}`}
            >
              {coin.name}
            </Link>
            <Typography color="text.primary">TVL</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={3.75}>
        <Grid item xs={12} sm={6} md={3}>
          <CurrentMarketCard
            subheader={"Today's TVL USD"}
            value={tvlChng.usd}
            prefixUnit={"$"}
            roundedDigit={0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(tvlChng.one_day_chng)}
            period={"day"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(tvlChng.seven_day_chng)}
            period={"week"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`30 Day Change`}
            value={parseFloat(tvlChng.thirty_day_chng)}
            period={"month"}
            unit={"%"}
          />
        </Grid>
        <Suspense fallback={<CircularProgress />}>
          <DataChart
            slug={slug}
            dataFunc={getBlockchainTvlForSlug}
            chartConfig={chartConfig}
          />
        </Suspense>
      </Grid>
    </Container>
  );
}
