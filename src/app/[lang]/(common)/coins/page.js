import { lazy, Suspense } from "react";
import { getCoinData } from "@app/_services/coin";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";

const CoinDataTable = lazy(
  () =>
    import(
      "@app/_components/widgets/CoinTableListing/CoinDataTable"
    )
);

export const metadata = {
  title: "Coins List Table | TokenClan",
  description:
    "Here is a list of coins data available on Tokenclan coin listing page.",
};

const CoinsPage = async () => {
  const listingRows = await getCoinData();
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Grid container spacing={3.75}>
        <Grid item xs={12}>
          <Typography variant="h3">Coin List</Typography>
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={<CircularProgress />}>
            <CoinDataTable rows={listingRows} />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CoinsPage;
