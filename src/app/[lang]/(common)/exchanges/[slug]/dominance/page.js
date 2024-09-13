import { Container, Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getExchangeCoinDominanceForSlug,
  getExchangeNameFor,
  getExchanges,
} from "@app/_services/exchange";
import Chart from "@app/_components/charts/apex/Chart";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const exchange = await getExchangeNameFor(slug);
  return {
    title: `${exchange.name} Exchange Volume Dominance | TokenClan`,
    description: `${exchange.name} Exchange Dominance data history on chart.`,
  };
}

export async function generateStaticParams() {
  const rows = await getExchanges();
  return rows.map((row) => ({ slug: row.slug }));
}

const dominanceChartConfig = {
  chartTitle: "Dominance",
  tooltipSeries: "Dominance",
  yaxisTitle: "%",
  yaxisFormatter: "",
  yaxisTooltipFormatterLabel: "PERCENTAGE",
};

export default async function SlugDominancePage({ params }) {
  const slug = params.slug;

  const exchange = await getExchangeNameFor(slug);
  const dominanceData = await getExchangeCoinDominanceForSlug(slug, 30);

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
          <Typography variant="h3">{`${exchange.name} Dominance`}</Typography>
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
          <Chart series={dominanceData} config={dominanceChartConfig} />
        </Grid>
      </Grid>
    </Container>
  );
}
