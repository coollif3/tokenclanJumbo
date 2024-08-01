import BlockchainDataTable from "@app/_components/widgets/BlockchainTableListing/BlockchainDataTable";
import {
  getBlockchainMktOverviewChng,
  getBlockchainMktOverview,
  getBlockchains,
} from "@app/_services/blockchain";
import { Container, Grid, Typography } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import GlobalCharts from "@app/_components/charts/apex/GlobalCharts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";
import { Suspense } from "react";

const chartConfig = {
  chartTitle: "Total Blockchain TVL",
  tooltipSeries: "Total TVL",
  yaxisTitle: "TVL in USD (Billion)",
};

export const metadata = {
  title: "Blockchain Market Cap / Total Value Lock (TVL) Data",
  description:
    "Explore the latest trends and get insights into blockchains where crypto investors park their digital assets.",
};

async function DisplayBlockchainTable() {
  const listingRows = await getBlockchains();
  return <BlockchainDataTable rows={listingRows} />;
}

async function DisplayTVLChart() {
  const chartSeries = await getBlockchainMktOverview();
  return <GlobalCharts series={chartSeries} config={chartConfig} />;
}

async function DisplayBlockchainCards() {
  const chngData = await getBlockchainMktOverviewChng();
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CurrentMarketCard
          subheader={"Today's TVL USD"}
          value={chngData.all_total_usd}
          prefixUnit="$"
          roundedDigit={0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(chngData.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(chngData.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(chngData.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}

const BlockchainsPage = async () => {
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
          <Typography variant="h2">Blockchain TVL</Typography>
        </Grid>
        <Suspense fallback={<p>Loading Market Stats...</p>}>
          <DisplayBlockchainCards />
        </Suspense>
        <Grid item xs={12}>
          <Suspense fallback={<p>Loading charts...</p>}>
            <DisplayTVLChart />
          </Suspense>
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={<p>Loading Blockchain Table...</p>}>
            <DisplayBlockchainTable />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlockchainsPage;
