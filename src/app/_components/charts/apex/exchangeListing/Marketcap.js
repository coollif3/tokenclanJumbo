import { Grid } from "@mui/material";
import MarketcapChart from "./MarketcapChart";
import MarketcapStats from "./MarketcapStats";

export default function Marketcap({ slug, config }) {
  return (
    <>
      <MarketcapStats slug={slug} />
      <Grid item xs={12}>
        <MarketcapChart slug={slug} config={config} />
      </Grid>
    </>
  );
}
