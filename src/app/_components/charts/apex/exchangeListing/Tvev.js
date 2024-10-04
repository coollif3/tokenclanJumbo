import { Grid } from "@mui/material";
import TvevChart from "./TvevChart";
import TvevStats from "./TvevStats";

const tvevChartConfig = {
  chartTitle: "TVEV",
  tooltipSeries: "Tvev Ratio",
  yaxisTitle: "Ratio",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "RATIO",
};

export default function Tvev({ slug }) {
  return (
    <>
      <TvevStats slug={slug} />
      <Grid item xs={12}>
        <TvevChart slug={slug} config={tvevChartConfig} />
      </Grid>
    </>
  );
}
