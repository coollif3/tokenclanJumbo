import { Grid2 as Grid } from "@mui/material";
import MarketcapStats from "./MarketcapStats";
import Chart from "@app/_components/charts/apex/Chart";
import { getBlockchainCoinMktcapForSlug } from "@app/_services/blockchain";

const mktcapChartConfig = {
  chartTitle: "Market Cap USD",
  tooltipSeries: "MarketCap",
  yaxisTitle: "USD",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

export default async function Marketcap({ slug }) {
  const mktcapData = await getBlockchainCoinMktcapForSlug(slug, 30);
  return (
    <>
      <MarketcapStats slug={slug} />
      <Grid size={12}>
        <Chart series={mktcapData} config={mktcapChartConfig} />
      </Grid>
    </>
  );
}
