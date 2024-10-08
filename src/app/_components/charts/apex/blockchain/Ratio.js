import { Grid } from "@mui/material";
import RatioStats from "./RatioStats";
import Chart from "@app/_components/charts/apex/Chart";
import { getBlockchainRatioForSlug } from "@app/_services/blockchain";

const ratioChartConfig = {
  chartTitle: "Mktcap/Tvl",
  tooltipSeries: "MarketCap/TVL",
  yaxisTitle: "Ratio",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "RATIO",
};

export default async function Ratio({ slug }) {
  const ratioData = await getBlockchainRatioForSlug(slug, 30);
  return (
    <>
      <RatioStats slug={slug} />
      <Grid item xs={12}>
        <Chart series={ratioData} config={ratioChartConfig} />
      </Grid>
    </>
  );
}
