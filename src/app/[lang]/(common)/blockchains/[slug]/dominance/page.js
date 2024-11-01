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
  getBlockchainDomForSlug,
  getBlockchainNameForSlug,
  getBlockchains,
} from "@app/_services/blockchain";
import { Suspense, lazy } from "react";
import BlockchainSubmenu from "@app/_components/_core/BlockchainSubmenu";

const DataTimeframeChart = lazy(
  () => import("@app/_components/charts/apex/DataTimeframeChart")
);

import CompareTimeSeriesBox from "@app/_components/_core/CompareTimeSeriesBox";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const blockchain = await getBlockchainNameForSlug(slug);

  return {
    title: `${blockchain.name} Blockchain TVL Dominance | TokenClan`,
    description: `${blockchain.name} Dominance data history with charting values up to 12 months.`,
  };
}

export async function generateStaticParams() {
  const rows = await getBlockchains();
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
  const blockchain = await getBlockchainNameForSlug(slug);
  const listingRows = await getBlockchains();

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
          <Typography variant="h3">{`${blockchain.name} TVL Dominance`}</Typography>
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
            <Typography color="text.primary">Dominance</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <BlockchainSubmenu slug={slug} />
        </Grid>
        <Grid item xs={12}>
          <CompareTimeSeriesBox slugData={listingRows} />
        </Grid>
      </Grid>

      <Grid container spacing={3.75}>
        <Grid item xs={12}>
          <Suspense fallback={<CircularProgress />}>
            <DataTimeframeChart
              slug={slug}
              dataFunc={getBlockchainDomForSlug}
              chartConfig={chartConfig}
            />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}
