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
import DataChart from "@app/_components/charts/apex/DataChart";
import { Suspense } from "react";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const coin = await getBlockchainNameForSlug(slug);

  return {
    title: `${coin.name} Blockchain TVL Dominance | TokenClan`,
    description: `${coin.name} Dominance data history on chart.`,
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

  const coin = await getBlockchainNameForSlug(slug);
  // const dominanceData = await getBlockchainDomForSlug(slug, 30);

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
          <Typography variant="h3">{`${coin.name} Dominance`}</Typography>
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
            <Typography color="text.primary">Dominance</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={3.75}>
        <Grid item xs={12}>
          <Suspense fallback={<CircularProgress />}>
            <DataChart
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
