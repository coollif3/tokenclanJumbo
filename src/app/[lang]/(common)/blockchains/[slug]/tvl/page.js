import {
  getBlockchains,
  getBlockchainNameForSlug,
  getBlockchainTvlChngForSlug,
  getBlockchainTvlForSlug,
} from "@app/_services/blockchain";
import {
  Container,
  Grid2 as Grid,
  Typography,
  Breadcrumbs,
  Link,
  CircularProgress,
} from "@mui/material";
import { getCoinSlugUsingBlkChainSlug } from "@app/_services/coin";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";
import { Suspense, lazy } from "react";

const DataTimeframeChart = lazy(
  () => import("@app/_components/charts/apex/DataTimeframeChart")
);

import CompareTimeSeriesBox from "@app/_components/_core/CompareTimeSeriesBox";

import BlockchainSubmenu from "@app/_components/_core/BlockchainSubmenu";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const blockchain = await getBlockchainNameForSlug(slug);

  return {
    title: `${blockchain.name} Blockchain TVL | TokenClan`,
    description: `${blockchain.name} TVL in usd data history with charting values up to 12 months.`,
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
  const blockchain = await getBlockchainNameForSlug(slug);
  const tvlChng = await getBlockchainTvlChngForSlug(slug);
  const listingRows = await getBlockchains();
  const coin = await getCoinSlugUsingBlkChainSlug(slug);

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
      <Grid container>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="h3">{`${blockchain.name} TVL`}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }} sx={{ marginLeft: "auto" }}>
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
              {blockchain.name}
            </Link>
            <Typography color="text.primary">TVL</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={1.2}>
        <Grid size={12}>
          <BlockchainSubmenu slug={slug} coinSlug={coin.slug} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CurrentMarketCard
            subheader={"Today's TVL USD"}
            value={tvlChng.usd}
            prefixUnit={"$"}
            roundedDigit={0}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(tvlChng.one_day_chng)}
            period={"day"}
            unit={"%"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(tvlChng.seven_day_chng)}
            period={"week"}
            unit={"%"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <PercentChngCard
            title={`30 Day Change`}
            value={parseFloat(tvlChng.thirty_day_chng)}
            period={"month"}
            unit={"%"}
          />
        </Grid>
        <Grid size={12}>
          <CompareTimeSeriesBox slugData={listingRows} boxType="blockchain" />
        </Grid>
        <Grid size={12}>
          <Suspense fallback={<CircularProgress />}>
            <DataTimeframeChart
              slug={slug}
              dataFunc={getBlockchainTvlForSlug}
              chartConfig={chartConfig}
              chartType={"blockchain"}
            />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}
