import Chart from "@app/_components/charts/apex/Chart";
import { getExchangeVolumeFor } from "@app/_services/exchange";

export default async function VolumeChart({ slug, config }) {
  const volData = await getExchangeVolumeFor(slug, 30);
  return <Chart series={volData} config={config} />;
}
