import { Grid2 as Grid } from "@mui/material";
import TvevStats from "./TvevStats";
import Chart from "@app/_components/charts/apex/Chart";
import { getExchangeTvevFor } from "@app/_services/exchange";

const tvevChartConfig = {
  chartTitle: "TVEV",
  tooltipSeries: "Tvev Ratio",
  yaxisTitle: "Ratio",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "RATIO",
};

export default async function Tvev({ slug }) {
  const tvevData = await getExchangeTvevFor(slug, 30);
  return (
    <>
      <TvevStats slug={slug} />
      <Grid size={12}>
        <Chart series={tvevData} config={tvevChartConfig} />
      </Grid>
    </>
  );
}
