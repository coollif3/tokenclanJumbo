import { Grid } from "@mui/material";
import TvlStats from "./TvlStats";
import Chart from "@app/_components/charts/apex/Chart";
import { getBlockchainTvlForSlug } from "@app/_services/blockchain";

const tvlChartConfig = {
  chartTitle: "Blockchain TVL",
  tooltipSeries: "TVL",
  yaxisTitle: "USD",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

export default async function Tvl({ slug }) {
  const tvlData = await getBlockchainTvlForSlug(slug, 30);
  return (
    <>
      <TvlStats slug={slug} />
      <Grid item xs={12}>
        <Chart series={tvlData} config={tvlChartConfig} />
      </Grid>
    </>
  );
}
