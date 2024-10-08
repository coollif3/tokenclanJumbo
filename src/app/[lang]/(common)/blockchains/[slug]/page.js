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
import styles from "./styles.module.css";
import {
  getBlockchainNameForSlug,
  getBlockchains,
} from "@app/_services/blockchain";

const Tvl = lazy(() => import("@app/_components/charts/apex/blockchain/Tvl"));
const Marketcap = lazy(
  () => import("@app/_components/charts/apex/blockchain/Marketcap")
);

const Ratio = lazy(
  () => import("@app/_components/charts/apex/blockchain/Ratio")
);

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const blockchain = await getBlockchainNameForSlug(slug);

  return {
    title: `${blockchain.name} Data on Market Cap, TVL and MCap/TVL Ratio | TokenClan`,
    description: `MCap/TVL ratio offers a way to value blockchain tokens like ${blockchain.name}`,
  };
}

export async function generateStaticParams() {
  const rows = await getBlockchains();
  return rows.map((row) => ({ slug: row.slug }));
}

export default async function BlockchainDetailedPage({ params }) {
  const slug = params.slug;
  const blockchain = await getBlockchainNameForSlug(slug);

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
      className={styles.tokenclan}
    >
      <Grid container spacing={3.75} sx={{ my: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3">{`${blockchain.name} Blockchain TVL (USD)`}</Typography>
          <Typography variant="h5">
            (Gas Coin Profile: :{" "}
            <Link href={`/coins/${slug}`} underline="none">
              {blockchain.name}{" "}
            </Link>
            )
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ marginLeft: "auto" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/blockchains">
              Blockchains
            </Link>
            <Typography color="text.primary">{blockchain.name}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={3.75}>
        <Suspense fallback={<CircularProgress />}>
          <Tvl slug={slug} />
        </Suspense>

        <Grid item xs={12} mt={5}>
          <Typography variant="h3">{`${blockchain.name} Market Cap (USD)`}</Typography>
        </Grid>

        <Suspense fallback={<CircularProgress />}>
          <Marketcap slug={slug} />
        </Suspense>
        <Grid item xs={12} mt={5}>
          <Typography variant="h3">{`${blockchain.name} MarketCap/TVL Ratio`}</Typography>
        </Grid>

        <Suspense fallback={<CircularProgress />}>
          <Ratio slug={slug} />
        </Suspense>
      </Grid>
    </Container>
  );
}
