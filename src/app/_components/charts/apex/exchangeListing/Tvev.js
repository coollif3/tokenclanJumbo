import { Grid } from "@mui/material";
import TvevChart from "./TvevChart";
import TvevStats from "./TvevStats";

export default function Tvev({ slug, config }) {
  return (
    <>
      <TvevStats slug={slug} />
      <Grid item xs={12}>
        <TvevChart slug={slug} config={config} />
      </Grid>
    </>
  );
}
