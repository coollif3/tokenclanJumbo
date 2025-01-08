import { Grid2 as Grid } from "@mui/material";
import { getBlockchainTvlChngForSlug } from "@app/_services/blockchain";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

export default async function TvlStats({ slug }) {
  const tvlChng = await getBlockchainTvlChngForSlug(slug);
  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CurrentMarketCard
          subheader={"Today's TVL USD"}
          value={tvlChng.usd}
          prefixUnit={"$"}
          roundedDigit={0}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(tvlChng.one_day_chng)}
          period={"day"}
          unit={"%"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(tvlChng.seven_day_chng)}
          period={"week"}
          unit={"%"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(tvlChng.thirty_day_chng)}
          period={"month"}
          unit={"%"}
        />
      </Grid>
    </>
  );
}
