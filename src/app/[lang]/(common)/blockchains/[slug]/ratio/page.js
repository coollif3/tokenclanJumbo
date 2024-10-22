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
  getBlockchainRatioForSlug,
  getBlockchainNameForSlug,
  getBlockchainRatioChngForSlug,
  getBlockchains,
} from "@app/_services/blockchain";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";
import { Suspense, lazy } from "react";

const DataTimeframeChart = lazy(
  () => import("@app/_components/charts/apex/DataTimeframeChart")
);

import BlockchainSubmenu from "@app/_components/_core/BlockchainSubmenu";
import BlockChainSlugData from "@app/_components/_core/BlockChainSlugData";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const blockchain = await getBlockchainNameForSlug(slug);

  return {
    title: `${blockchain.name} Blockchain MarketCap/TVL Ratio | TokenClan`,
    description: `${blockchain.name} Ratio data history with charting values up to 12 months.`,
  };
}

export async function generateStaticParams() {
  const rows = await getBlockchains();
  return rows.map((row) => ({ slug: row.slug }));
}

export default async function SlugRatioPage({ params }) {
  const slug = params.slug;

  const blockchain = await getBlockchainNameForSlug(slug);
  const ratioChng = await getBlockchainRatioChngForSlug(slug);
  const listingRows = await getBlockchains();

  const chartConfig = {
    chartTitle: "MarketCap/TVL Ratio",
    tooltipSeries: `${blockchain.name}`,
    yaxisTitle: "Ratio",
    yaxisFormatter: "THOUSAND_SEPARATOR",
    yaxisTooltipFormatterLabel: "RATIO",
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
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3">{`${blockchain.name} MarketCap/TVL Ratio`}</Typography>
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
              {blockchain.name}
            </Link>
            <Typography color="text.primary">Ratio</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={1.2}>
        <Grid item xs={12}>
          <BlockchainSubmenu slug={slug} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CurrentMarketCard
            subheader={"Today's Ratio"}
            value={ratioChng.ratio}
            prefixUnit={"$"}
            roundedDigit={0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(ratioChng.one_day_chng)}
            period={"day"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(ratioChng.seven_day_chng)}
            period={"week"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PercentChngCard
            title={`30 Day Change`}
            value={parseFloat(ratioChng.thirty_day_chng)}
            period={"month"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={12}>
          <BlockChainSlugData slugData={listingRows} />
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={<CircularProgress />}>
            <DataTimeframeChart
              slug={slug}
              dataFunc={getBlockchainRatioForSlug}
              chartConfig={chartConfig}
            />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}
