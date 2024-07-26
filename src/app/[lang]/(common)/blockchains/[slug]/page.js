import { Container, Grid, Typography } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getBlockchainTvlForSlug,
  getBlockchainTvlChngForSlug,
} from "@app/_services/blockchain";
import ExchangeCharts from "@app/_components/charts/apex/ExchangeCharts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

const tvlChartConfig = {
  chartTitle: "Blockchain TVL",
  tooltipSeries: "TVL",
  yaxisTitle: "USD",
};

export default async function BlockchainDetailedPage({ params }) {
  const slug = params.slug;
  const tvlData = await getBlockchainTvlForSlug(slug, 30);
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
      </Grid>
    </Container>
  );
}
