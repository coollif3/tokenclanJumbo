import Chart from "@app/_components/charts/apex/Chart";
import { getExchangeMktcapFor } from "@app/_services/exchange";

export default async function MarketcapChart({ slug, config }) {
  const mktcapData = await getExchangeMktcapFor(slug, 30);
  return <Chart series={mktcapData} config={config} />;
}
