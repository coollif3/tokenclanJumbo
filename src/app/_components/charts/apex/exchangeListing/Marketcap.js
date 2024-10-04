import { Grid } from "@mui/material";
import MarketcapStats from "./MarketcapStats";
import Chart from "@app/_components/charts/apex/Chart";
import { getExchangeMktcapFor } from "@app/_services/exchange";

const marketcapChartConfig = {
  chartTitle: "Market Cap",
  tooltipSeries: "Market Cap",
  yaxisTitle: "USD",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

export default async function Marketcap({ slug }) {
  const mktcapData = await getExchangeMktcapFor(slug, 30);
  return (
    <>
      <MarketcapStats slug={slug} />
      <Grid item xs={12}>
        <Chart series={mktcapData} config={marketcapChartConfig} />
      </Grid>
    </>
  );
}
