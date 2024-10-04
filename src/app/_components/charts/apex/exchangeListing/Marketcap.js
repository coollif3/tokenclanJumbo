import { Grid } from "@mui/material";
import MarketcapChart from "./MarketcapChart";
import MarketcapStats from "./MarketcapStats";

const marketcapChartConfig = {
  chartTitle: "Market Cap",
  tooltipSeries: "Market Cap",
  yaxisTitle: "USD",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

export default function Marketcap({ slug }) {
  return (
    <>
      <MarketcapStats slug={slug} />
      <Grid item xs={12}>
        <MarketcapChart slug={slug} config={marketcapChartConfig} />
      </Grid>
    </>
  );
}
