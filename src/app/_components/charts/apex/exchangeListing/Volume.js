import { Grid } from "@mui/material";
import VolumeChart from "./VolumeChart";
import VolumeStats from "./VolumeStats";

export default function Volume({ slug, config }) {
  return (
    <>
      <VolumeStats slug={slug} />
      <Grid item xs={12}>
        <VolumeChart slug={slug} config={config} />
      </Grid>
    </>
  );
}
