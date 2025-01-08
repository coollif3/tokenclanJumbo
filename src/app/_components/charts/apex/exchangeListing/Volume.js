import { Grid2 as Grid } from "@mui/material";
import VolumeStats from "./VolumeStats";
import Chart from "@app/_components/charts/apex/Chart";
import { getExchangeVolumeFor } from "@app/_services/exchange";

const volumeChartConfig = {
  chartTitle: "Exchange Volume BTC",
  tooltipSeries: "Volume",
  yaxisTitle: "24hr Volume BTC",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "BITCOIN",
};

export default async function Volume({ slug }) {
  const volData = await getExchangeVolumeFor(slug, 30);
  return (
    <>
      <VolumeStats slug={slug} />
      <Grid size={12}>
        <Chart series={volData} config={volumeChartConfig} />
      </Grid>
    </>
  );
}
