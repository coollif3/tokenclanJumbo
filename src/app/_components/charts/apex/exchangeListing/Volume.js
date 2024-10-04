import { Grid } from "@mui/material";
import VolumeChart from "./VolumeChart";
import VolumeStats from "./VolumeStats";

const volumeChartConfig = {
  chartTitle: "Exchange Volume BTC",
  tooltipSeries: "Volume",
  yaxisTitle: "24hr Volume BTC",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "BITCOIN",
};

export default function Volume({ slug }) {
  return (
    <>
      <VolumeStats slug={slug} />
      <Grid item xs={12}>
        <VolumeChart slug={slug} config={volumeChartConfig} />
      </Grid>
    </>
  );
}
