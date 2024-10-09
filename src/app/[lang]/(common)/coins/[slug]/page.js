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
import { getCoinNameFor, getCommonCoinSlug } from "@app/_services/coin";
import { getBlockchainNameForSlug } from "@app/_services/blockchain";

import classes from "./styles.module.css";

const CoinProfileAccordion = lazy(
  () => import("@app/_components/widgets/CoinProfileAccordion")
);

export async function generateStaticParams() {
  const rows = await getCommonCoinSlug();
  // console.log("rows: ", rows);

  const results = rows
    .filter((row) => row.dcp_slug !== null || row.ecp_slug !== null) // Filter out rows where both dcp_slug and ecp_slug are null
    .map((row) => {
      let slug = row.dcp_slug || row.ecp_slug; // Use dcp_slug if available, otherwise use ecp_slug
      return { slug };
    });

  // console.log("results: ", results);
  return results;
}

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  // console.log("slug: ", slug);
  const exchange = await getCoinNameFor(slug);
  const blockchain = await getBlockchainNameForSlug(slug);

  let title, description;

  if (exchange) {
    title = `${exchange.name} Coin Profile | TokenClan`;
    description = `Details on ${exchange.name} including socials and urls`;
  } else if (blockchain) {
    title = `${blockchain.name} Coin Profile | TokenClan`;
    description = `Details on ${blockchain.name} gas token including socials and urls`;
  } else {
    title = `Coin Profile | TokenClan`;
    description = `Details including socials and urls`;
  }

  return {
    title,
    description,
  };
}

export default async function CoinProfilePage({ params, searchParams }) {
  // const param = params;
  // console.log("param: ", param);
  const slug = params.slug;
  // console.log("slug: ", slug);
  const exchange = await getCoinNameFor(slug);
  const blockchain = await getBlockchainNameForSlug(slug);
  // console.log(searchParams);
  const { route } = searchParams;

  let name;

  // console.log("exchangeName: ", exchange);
  // console.log("blockchainName: ", blockchain);

  if (exchange) {
    name = exchange.name;
  } else if (blockchain) {
    name = blockchain.name;
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
              <Link underline="hover" color="inherit" href="/#">
                Coins
              </Link>
              <Typography color="text.primary">{`${name}`}</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container spacing={3.75}>
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
