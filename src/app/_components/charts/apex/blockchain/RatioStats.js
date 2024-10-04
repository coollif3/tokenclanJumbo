import { Grid } from "@mui/material";
import { getBlockchainRatioChngForSlug } from "@app/_services/blockchain";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

export default async function RatioStats({ slug }) {
  const ratioChng = await getBlockchainRatioChngForSlug(slug);
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CurrentMarketCard
          subheader={"Today's Ratio"}
          value={ratioChng.ratio}
          prefixUnit={""}
          roundedDigit={2}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(ratioChng.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(ratioChng.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(ratioChng.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}
