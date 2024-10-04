import { lazy, Suspense } from "react";
import {
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  CircularProgress,
} from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { getCoinNameFor, getAllCoinSlug } from "@app/_services/coin";

import classes from "./styles.module.css";

const CoinProfileAccordion = lazy(
  () => import("@app/_components/widgets/CoinProfileAccordion")
);

export async function generateStaticParams() {
  const rows = await getAllCoinSlug();
  return rows.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const coin = await getCoinNameFor(slug);

  return {
    title: `${coin.name} Profile`,
    description: `Details on ${coin.name} including socials and urls`,
  };
}

export default async function CoinProfilePage({ params }) {
  const slug = params.slug;
  const coin = await getCoinNameFor(slug);

  return (
    <>
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
        className={classes.tokenclan}
      >
        <Grid container spacing={3.75} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h3">{`${coin.name} Coin Profile`}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ marginLeft: "auto" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/#">
                Coins
              </Link>
              <Typography color="text.primary">{coin.name}</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container spacing={3.75}>
          <Grid item xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <CoinProfileAccordion slug={slug} />
            </Suspense>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
