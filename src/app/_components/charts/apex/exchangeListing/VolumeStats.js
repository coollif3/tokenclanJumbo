import { Grid } from "@mui/material";
import { getExchangeVolumeChngFor } from "@app/_services/exchange";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

export default async function VolumeStats({ slug }) {
  const volChng = await getExchangeVolumeChngFor(slug, 30);
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CurrentMarketCard
          subheader={"Today's Volume BTC"}
          value={volChng.vol_24hr_normalized}
          prefixUnit=""
          roundedDigit={0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(volChng.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(volChng.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(volChng.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}
