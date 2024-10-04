import { Container, Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { getExchangeNameFor, getExchanges } from "@app/_services/exchange";
import { getCoinNameFromExchangeSlug } from "@app/_services/coin";
import styles from "./styles.module.css";
import Volume from "@app/_components/charts/apex/exchangeListing/Volume";
import Marketcap from "@app/_components/charts/apex/exchangeListing/Marketcap";
import ProfileAccordion from "@app/_components/charts/apex/exchangeListing/ProfileAccordion";
import Tvev from "@app/_components/charts/apex/exchangeListing/Tvev";

export async function generateStaticParams() {
  const rows = await getExchanges();
  return rows.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params, searchParams }) {
  const slug = params.slug;
  const exchange = await getExchangeNameFor(slug);

  return {
    title: `${exchange.name} Data on Market Cap, Exchange Volume and TVEV Ratio `,
    description: `TVEV ratio offers a way to value crypto exchange tokens like ${exchange.name}`,
  };
}

const volumeChartConfig = {
  chartTitle: "Exchange Volume BTC",
  tooltipSeries: "Volume",
  yaxisTitle: "24hr Volume BTC",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "BITCOIN",
};

const marketcapChartConfig = {
  chartTitle: "Market Cap",
  tooltipSeries: "Market Cap",
  yaxisTitle: "USD",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "DOLLAR",
};

const tvevChartConfig = {
  chartTitle: "TVEV",
  tooltipSeries: "Tvev Ratio",
  yaxisTitle: "Ratio",
  yaxisFormatter: "THOUSAND_SEPARATOR",
  yaxisTooltipFormatterLabel: "RATIO",
};

export default async function ExchangeDetailedPage({ params }) {
  const slug = params.slug;
  const exchange = await getExchangeNameFor(slug);
  const coin = await getCoinNameFromExchangeSlug(slug);

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
        className={styles.tokenclan}
      >
        <Grid container spacing={3.75} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3">
              {`${exchange.name} Exchange Data `}
            </Typography>
            <Typography variant="h5">
              (Exchange Coin Profile:{" "}
              <Link href={`/coins/${coin.slug}`} underline="none">
                {coin.symbol}{" "}
              </Link>
              )
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ marginLeft: "auto" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/exchanges">
                Exchanges
              </Link>
              <Typography color="text.primary">{exchange.name}</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container spacing={3.75}>
          <Grid item xs={12}>
            <ProfileAccordion slug={slug} />
          </Grid>
          <Volume slug={slug} config={volumeChartConfig} />

          <Grid item xs={12} mt={5}>
            <Typography variant="h3">{`${exchange.name} Market Cap (USD)`}</Typography>
          </Grid>
          <Marketcap slug={slug} config={marketcapChartConfig} />

          <Grid item xs={12} mt={5}>
            <Typography variant="h3">{`${exchange.name} TVEV Ratio`}</Typography>
          </Grid>
          <Tvev slug={slug} config={tvevChartConfig} />
        </Grid>
      </Container>
    </>
  );
}
