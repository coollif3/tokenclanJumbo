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
import { getCoinNameFor, getCommonCoinSlug, getCoinSlug } from "@app/_services/coin";

// import CoinSubmenu from "@app/_components/_core/CoinSubmenu";

import classes from "./styles.module.css";

// chart component for coin price
const CoinPrice = lazy(
  () => import("@app/_components/charts/apex/coin/Price")
);

const CoinProfileAccordion = lazy(
  () => import("@app/_components/widgets/CoinProfileAccordion")
);

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const coin = await getCoinNameFor(slug);
  // console.log("slug: ", slug);
  // console.log("coin: ", coin);

  let title, description;

  if (coin) {
    title = `${coin.name} Coin Profile | TokenClan`;
    description = `Details on ${coin.name} including socials and urls`;
  } else {
    title = `Coin Profile | TokenClan`;
    description = `Details including socials and urls`;
  }

  return {
    title,
    description,
  };
}

export async function generateStaticParams() {
  const rows = await getCoinSlug();
  // console.log("rows: ", rows);

  const results = rows
    .filter((row) => row.slug !== null) // Filter out rows where coin_slug is null
    .map((row) => {
      let slug = row.slug; // Use coin slug
      return { slug };
    });

  // console.log("results: ", results);
  return results;
}

export default async function CoinProfilePage({ params, searchParams }) {
  const slug = params.slug;
  const coin = await getCoinNameFor(slug);
  const { route } = searchParams;
  // console.log("param: ", params);
  // console.log("slug: ", slug);
  // console.log(searchParams);

  let name;

  if (coin) {
    name = coin.name;
  } else {
    name = "Crypto";
  }

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
            <Typography variant="h3">{`${name}`}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ marginLeft: "auto" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/coins">
                Coins
              </Link>
              <Typography color="text.primary">{`${name}`}</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container spacing={3.75}>
          <Suspense fallback={<CircularProgress />}>
            <CoinPrice slug={slug} />
          </Suspense>
          <Grid item xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <CoinProfileAccordion slug={slug} route={route} />
            </Suspense>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}