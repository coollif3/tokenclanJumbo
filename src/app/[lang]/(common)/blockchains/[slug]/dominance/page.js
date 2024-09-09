import { Container, Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getBlockchainDomForSlug,
  getBlockchainNameForSlug,
} from "@app/_services/blockchain";
import GlobalCharts from "@app/_components/charts/apex/GlobalCharts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const coin = await getBlockchainNameForSlug(slug);

  return {
    title: `${coin.name} Blockchain TVL Dominance | TokenClan`,
    description: `${coin.name} Dominance data history on chart.`,
  };
}

// export async function generateStaticParams() {
//   const rows = await getBlockchains();
//   return rows.map((row) => ({ slug: row.slug }));
// }

const dominanceChartConfig = {
  chartTitle: "Dominance",
  tooltipSeries: "Dominance",
  yaxisTitle: "%",
  yaxisFormatter: "",
  yaxisTooltipFormatterLabel: "PERCENTAGE",
};

export default async function SlugDominancePage({ params }) {
  const slug = params.slug;

  const coin = await getBlockchainNameForSlug(slug);
  const dominanceData = await getBlockchainDomForSlug(slug, 30);

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
          <GlobalCharts series={dominanceData} config={dominanceChartConfig} />
        </Grid>
      </Grid>
    </Container>
  );
}
