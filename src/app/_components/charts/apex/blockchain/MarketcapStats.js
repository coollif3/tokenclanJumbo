import { Grid } from "@mui/material";
import { getBlockchainCoinMktcapChngForSlug } from "@app/_services/blockchain";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";

export default async function MarketcapStats({ slug }) {
  const mktcapChng = await getBlockchainCoinMktcapChngForSlug(slug);
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CurrentMarketCard
          subheader={"Today's Market Cap USD"}
          value={mktcapChng.market_cap}
          prefixUnit={"$"}
          roundedDigit={0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(mktcapChng.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(mktcapChng.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(mktcapChng.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}
