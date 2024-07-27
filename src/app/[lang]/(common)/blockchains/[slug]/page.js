import { Container, Grid, Typography } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getBlockchainTvlForSlug,
  getBlockchainTvlChngForSlug,
  getBlockchainCoinMktcapForSlug,
  getBlockchainCoinMktcapChngForSlug,
  getBlockchainRatioForSlug,
  getBlockchainRatioChngForSlug,
} from "@app/_services/blockchain";
import ExchangeCharts from "@app/_components/charts/apex/ExchangeCharts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

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
      <Grid container spacing={3.75}>
        <Grid item xs={12}>
          <Typography variant="h2">Blockchain TVL USD</Typography>
        </Grid>
        <Grid item xs={3}>
          <CurrentMarketCard
            subheader={"Today's Volume USD"}
            value={tvlChng.usd}
          />
        </Grid>
        <Grid item xs={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(tvlChng.one_day_chng)}
            period={"day"}
          />
        </Grid>
        <Grid item xs={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(tvlChng.seven_day_chng)}
            period={"week"}
          />
        </Grid>
        <Grid item xs={3}>
          <PercentChngCard
            title={`30 Day Change`}
            value={parseFloat(tvlChng.thirty_day_chng)}
            period={"month"}
          />
        </Grid>
        <Grid item xs={12}>
          <ExchangeCharts series={tvlData} config={tvlChartConfig} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">Market Cap (USD)</Typography>
        </Grid>

        <Grid item xs={3}>
          <CurrentMarketCard
            subheader={"Today's Market Cap USD"}
            value={mktcapChng.market_cap}
          />
        </Grid>
        <Grid item xs={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(mktcapChng.one_day_chng)}
            period={"day"}
          />
        </Grid>
        <Grid item xs={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(mktcapChng.seven_day_chng)}
            period={"week"}
          />
        </Grid>
        <Grid item xs={3}>
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
          <Typography variant="h2">MarketCap/TVL Ratio</Typography>
        </Grid>
        <Grid item xs={3}>
          <CurrentMarketCard
            subheader={"Today's Ratio"}
            value={ratioChng.ratio}
          />
        </Grid>
        <Grid item xs={3}>
          <PercentChngCard
            title={`24hr Change`}
            value={parseFloat(ratioChng.one_day_chng)}
            period={"day"}
          />
        </Grid>
        <Grid item xs={3}>
          <PercentChngCard
            title={`7 Day Change`}
            value={parseFloat(ratioChng.seven_day_chng)}
            period={"week"}
          />
        </Grid>
        <Grid item xs={3}>
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
