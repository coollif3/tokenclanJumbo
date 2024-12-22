import { Grid } from "@mui/material";
import PriceStats from "./PriceStats";
import Chart from "@app/_components/charts/apex/Chart";
import { getCoinPriceForSlug } from "@app/_services/coin";

const priceChartConfig = {
  chartTitle: "Coin Price",
  tooltipSeries: "Price",
  yaxisTitle: "USD",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

export default async function Price({ slug }) {
  const priceData = await getCoinPriceForSlug(slug, 30);
  return (
    <>
      <PriceStats slug={slug} />
      <Grid item xs={12}>
        <Chart series={priceData} config={priceChartConfig} />
      </Grid>
    </>
  );
}
