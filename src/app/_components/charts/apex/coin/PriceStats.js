import { Grid2 as Grid } from "@mui/material";
import { getCoinPriceChngForSlug } from "@app/_services/coin";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

export default async function PriceStats({ slug }) {
  const coinPriceChng = await getCoinPriceChngForSlug(slug);
  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CurrentMarketCard
          subheader={"Today's Price USD"}
          value={coinPriceChng.price}
          prefixUnit={"$"}
          roundedDigit={2}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(coinPriceChng.one_day_chng)}
          period={"day"}
          unit={"%"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(coinPriceChng.seven_day_chng)}
          period={"week"}
          unit={"%"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(coinPriceChng.thirty_day_chng)}
          period={"month"}
          unit={"%"}
        />
      </Grid>
    </>
  );
}
