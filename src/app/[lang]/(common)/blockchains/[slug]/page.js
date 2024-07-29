import { Container, Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getBlockchainTvlForSlug,
  getBlockchainTvlChngForSlug,
  getBlockchainCoinMktcapForSlug,
  getBlockchainCoinMktcapChngForSlug,
  getBlockchainRatioForSlug,
  getBlockchainRatioChngForSlug,
  getBlockchainNameForSlug,
} from "@app/_services/blockchain";
import ExchangeCharts from "@app/_components/charts/apex/ExchangeCharts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const coin = await getBlockchainNameForSlug(slug);

  return {
    title: `${coin.name} Data on Market Cap, TVL and MCap/TVL Ratio `,
    description: `MCap/TVL ratio offers a way to value blockchain tokens like ${coin.name}`,
  };
}

// export async function generateStaticParams() {
//   const rows = await getBlockchains();
//   return rows.map((row) => ({ slug: row.slug }));
// }

const tvlChartConfig = {
  chartTitle: "Blockchain TVL",
  tooltipSeries: "TVL",
  yaxisTitle: "USD",
};
const mktcapChartConfig = {
  chartTitle: "Market Cap USD",
  tooltipSeries: "MarketCap",
  yaxisTitle: "USD",
};
const ratioChartConfig = {
  chartTitle: "Mktcap/Tvl",
  tooltipSeries: "MarketCap/TVL",
  yaxisTitle: "Ratio",
};

export default async function BlockchainDetailedPage({ params }) {
  const slug = params.slug;

  const coin = await getBlockchainNameForSlug(slug);
  const tvlData = await getBlockchainTvlForSlug(slug, 30);
  const tvlChng = await getBlockchainTvlChngForSlug(slug);

  const mktcapData = await getBlockchainCoinMktcapForSlug(slug, 30);
  const mktcapChng = await getBlockchainCoinMktcapChngForSlug(slug);

  const ratioData = await getBlockchainRatioForSlug(slug, 30);
  const ratioChng = await getBlockchainRatioChngForSlug(slug);

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
          <Typography variant="h2">{`${coin.name} Blockchain TVL USD`}</Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ marginLeft: "auto" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/blockchains">
              Blockchains
            </Link>
            <Typography color="text.primary">{coin.name}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={3.75}>
        <Grid item xs={6} sm={3}>
          <CurrentMarketCard
            subheader={"Today's TVL USD"}
            value={tvlChng.usd}
            prefixUnit={"$"}
            roundedDigit={0}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(tvlChng.one_day_chng)}
            period={"day"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(tvlChng.seven_day_chng)}
            period={"week"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <PercentChngCard
            title={`30 Day Change`}
            value={parseFloat(tvlChng.thirty_day_chng)}
            period={"month"}
            unit={"%"}
          />
        </Grid>
        <Grid item xs={12}>
          <ExchangeCharts series={tvlData} config={tvlChartConfig} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">{`${coin.name} Market Cap (USD)`}</Typography>
        </Grid>

        <Grid item xs={6} sm={3}>
          <CurrentMarketCard
            subheader={"Today's Market Cap USD"}
            value={mktcapChng.market_cap}
            prefixUnit={"$"}
            roundedDigit={0}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(mktcapChng.one_day_chng)}
            period={"day"}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(mktcapChng.seven_day_chng)}
            period={"week"}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <PercentChngCard
            title={`30 Day Change`}
            value={parseFloat(mktcapChng.thirty_day_chng)}
            period={"month"}
          />
        </Grid>

        <Grid item xs={12}>
          <ExchangeCharts series={mktcapData} config={mktcapChartConfig} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">{`${coin.name} MarketCap/TVL Ratio`}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <CurrentMarketCard
            subheader={"Today's Ratio"}
            value={ratioChng.ratio}
            prefixUnit={""}
            roundedDigit={2}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(ratioChng.one_day_chng)}
            period={"day"}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(ratioChng.seven_day_chng)}
            period={"week"}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <PercentChngCard
            title={`30 Day Change`}
            value={parseFloat(ratioChng.thirty_day_chng)}
            period={"month"}
          />
        </Grid>

        <Grid item xs={12}>
          <ExchangeCharts series={ratioData} config={ratioChartConfig} />
        </Grid>
      </Grid>
    </Container>
  );
}
