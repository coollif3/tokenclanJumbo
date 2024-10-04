import Chart from "@app/_components/charts/apex/Chart";
import { getExchangeTvevFor } from "@app/_services/exchange";

export default async function TvevChart({ slug, config }) {
  const tvevData = await getExchangeTvevFor(slug, 30);
  return <Chart series={tvevData} config={config} />;
}
