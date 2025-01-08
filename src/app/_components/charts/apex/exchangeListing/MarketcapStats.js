import { Grid2 as Grid } from "@mui/material";
import { getExchangeMktcapChngFor } from "@app/_services/exchange";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

export default async function MarketcapStats({ slug }) {
  const mktcapChng = await getExchangeMktcapChngFor(slug);
  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CurrentMarketCard
          subheader={"Today's Market Cap BTC"}
          value={mktcapChng.market_cap}
          prefixUnit="$"
          roundedDigit={0}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(mktcapChng.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(mktcapChng.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(mktcapChng.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}
