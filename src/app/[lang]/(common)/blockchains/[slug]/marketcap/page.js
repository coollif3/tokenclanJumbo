import { Container, Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getBlockchainCoinMktcapForSlug,
  getBlockchainNameForSlug,
  getBlockchainCoinMktcapChngForSlug,
  getBlockchains,
} from "@app/_services/blockchain";
import GlobalCharts from "@app/_components/charts/apex/GlobalCharts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const coin = await getBlockchainNameForSlug(slug);

  return {
    title: `${coin.name} Blockchain Marketcap | TokenClan`,
    description: `${coin.name} Marketcap data history on chart.`,
  };
}

export async function generateStaticParams() {
  const rows = await getBlockchains();
  return rows.map((row) => ({ slug: row.slug }));
}

const mktcapChartConfig = {
  chartTitle: "Marketcap",
  tooltipSeries: "Marketcap",
  yaxisTitle: "USD",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

export default async function SlugMktcapPage({ params }) {
  const slug = params.slug;

  const coin = await getBlockchainNameForSlug(slug);
  const mktcapData = await getBlockchainCoinMktcapForSlug(slug, 30);
  const mktcapChng = await getBlockchainCoinMktcapChngForSlug(slug);

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
          <Typography variant="h3">{`${coin.name} Marketcap`}</Typography>
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
          <GlobalCharts series={mktcapData} config={mktcapChartConfig} />
        </Grid>
      </Grid>
    </Container>
  );
}
