import { Grid2 as Grid } from "@mui/material";
import { getExchangeTvevChngFor } from "@app/_services/exchange";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

export default async function TvevStats({ slug }) {
  const tvevChng = await getExchangeTvevChngFor(slug);
  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CurrentMarketCard
          subheader={"Today's Ratio"}
          value={tvevChng.ratio}
          prefixUnit=""
          roundedDigit={2}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(tvevChng.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(tvevChng.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(tvevChng.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}
