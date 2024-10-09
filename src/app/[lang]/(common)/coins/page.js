import { lazy, Suspense } from "react";
import { getBlockchains } from "@app/_services/blockchain";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";

const BlockchainDataTable = lazy(
  () =>
    import(
      "@app/_components/widgets/BlockchainTableListing/BlockchainDataTable"
    )
);

export const metadata = {
  title: "Coins List Table | TokenClan",
  description:
    "Here is a list of coins data available on Tokenclan coin listing page.",
};

const CoinsPage = async () => {
  const listingRows = await getBlockchains();
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
            <BlockchainDataTable rows={listingRows} />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CoinsPage;
