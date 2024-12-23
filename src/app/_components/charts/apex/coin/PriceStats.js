import { Grid } from "@mui/material";
import { getCoinPriceChngForSlug } from "@app/_services/coin";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

export default async function PriceStats({ slug }) {
  const coinData = await getCoinPriceChngForSlug(slug);
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CurrentMarketCard
          subheader={"Today's Price USD"}
          value={coinData.price}
          prefixUnit={"$"}
          roundedDigit={0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(coinData.one_day_chng)}
          period={"day"}
          unit={"%"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(coinData.seven_day_chng)}
          period={"week"}
          unit={"%"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(coinData.thirty_day_chng)}
          period={"month"}
          unit={"%"}
        />
      </Grid>
    </>
  );
}
