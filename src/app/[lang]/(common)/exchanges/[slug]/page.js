import {
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getExchangeVolumeFor,
  getExchangeVolumeChngFor,
  getExchangeMktcapFor,
  getExchangeMktcapChngFor,
  getExchangeTvevFor,
  getExchangeTvevChngFor,
  getExchangeNameFor,
  getExchanges,
  getExchangeProfileFor,
  getCoinNameFromExchangeSlug,
} from "@app/_services/exchange";
import GlobalCharts from "@app/_components/charts/apex/GlobalCharts";
import PercentChngCard from "@app/_components/metrics/PercentChngCard/PercentChngCard";
import CurrentMarketCard from "@app/_components/widgets/CurrentMarketCard/CurrentMarketCard";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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

async function DisplayVolumeChart(slug) {
  const volData = await getExchangeVolumeFor(slug, 30);
  const volumeChartConfig = {
    chartTitle: "Exchange Volume BTC",
    tooltipSeries: "Volume",
    yaxisTitle: "24hr Volume BTC",
    yaxisFormatter: "THOUSAND_SEPARATOR",
    yaxisTooltipFormatterLabel: "BITexchange",
  };
  return <GlobalCharts series={volData} config={volumeChartConfig} />;
}

async function DisplayVolumeStats(slug) {
  const volChng = await getExchangeVolumeChngFor(slug);

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CurrentMarketCard
          subheader={"Today's Volume BTC"}
          value={volChng.vol_24hr_normalized}
          prefixUnit=""
          roundedDigit={0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(volChng.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(volChng.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(volChng.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}

async function DisplayMktcapFor(slug) {
  const mktcapData = await getExchangeMktcapFor(slug, 30);
  const marketcapChartConfig = {
    chartTitle: "Market Cap",
    tooltipSeries: "Market Cap",
    yaxisTitle: "USD",
    yaxisFormatter: "THOUSAND_SEPARATOR",
    yaxisTooltipFormatterLabel: "DOLLAR",
  };

  return <GlobalCharts series={mktcapData} config={marketcapChartConfig} />;
}

async function DisplayMktcapStatsFor(slug) {
  const mktcapChng = await getExchangeMktcapChngFor(slug);

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CurrentMarketCard
          subheader={"Today's Market Cap BTC"}
          value={mktcapChng.market_cap}
          prefixUnit="$"
          roundedDigit={0}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(mktcapChng.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(mktcapChng.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(mktcapChng.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}

async function DisplayTvevRatioChartFor(slug) {
  const tvevChartConfig = {
    chartTitle: "TVEV",
    tooltipSeries: "Tvev Ratio",
    yaxisTitle: "Ratio",
    yaxisFormatter: "THOUSAND_SEPARATOR",
    yaxisTooltipFormatterLabel: "RATIO",
  };
  const tvevData = await getExchangeTvevFor(slug, 30);

  return <GlobalCharts series={tvevData} config={tvevChartConfig} />;
}

async function DisplayTvevStats(slug) {
  const tvevChng = await getExchangeTvevChngFor(slug);

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CurrentMarketCard
          subheader={"Today's Ratio"}
          value={tvevChng.ratio}
          prefixUnit=""
          roundedDigit={2}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`24hr Change`}
          value={parseFloat(tvevChng.one_day_chng)}
          period={"day"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`7 Day Change`}
          value={parseFloat(tvevChng.seven_day_chng)}
          period={"week"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PercentChngCard
          title={`30 Day Change`}
          value={parseFloat(tvevChng.thirty_day_chng)}
          period={"month"}
        />
      </Grid>
    </>
  );
}

// accordion component function is used to display the Exchange Profile details
async function DisplayExchangeProfile(slug) {
  const exchangeProfile = await getExchangeProfileFor(slug);
  // console.log("exchangeProfile: ", exchangeProfile);

  // mapping of the key names to display names
  const keyNameMapping = {
    exchange_name: "Exchange Name",
    year_established: "Year Established",
    description: "Description",
    exchange_profile_url: "Exchange URL",
    reddit: "Reddit",
    twitter: "Twitter",
    telegram: "Telegram",
    centralized: "Centralized Exchange",
  };

  return (
    <>
      <Accordion
        defaultExpanded
        elevation={0}
        sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
      >
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography variant="h5">Exchange Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {Object.keys(exchangeProfile).map((key) => {
              let displayKey = keyNameMapping[key] || key;
              let value = exchangeProfile[key] || "N.A";
              if (key === "centralized") {
                value = value === 1 ? "Yes" : value === 0 ? "No" : "N.A";
              }
              if (key === "twitter" && value !== "N.A") {
                value = `@${value}`;
              }
              return (
                <Grid
                  item
                  xs={12}
                  sm={displayKey === "Description" && value !== "N.A" ? 12 : 6}
                  md={displayKey === "Description" && value !== "N.A" ? 12 : 4}
                  key={key}
                >
                  <Card
                    elevation={3}
                    sx={{ border: "1px solid #ddd", p: 1, mb: 1 }}
                  >
                    <CardContent>
                      <Typography variant="h6">{displayKey}</Typography>
                      <Typography variant="body1">
                        {/* if key is 'exchange_profile_url', 'reddit', 'telegram' and value is not 'N.A', display value as a link */}
                        {[
                          "exchange_profile_url",
                          "reddit",
                          "telegram",
                        ].includes(key) && value !== "N.A" ? (
                          <Link
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {value}
                          </Link>
                        ) : (
                          value
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

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
      >
        <Grid container spacing={3.75} sx={{ my: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3">
              {`${exchange.name} Exchange Data `}
            </Typography>
            <Typography variant="h5">
              <Link href={`/coins/${coin.slug}`} underline="none">
                (Exchange Coin Profile: {coin.symbol})
              </Link>
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
            {await DisplayExchangeProfile(slug)}
          </Grid>
          {await DisplayVolumeStats(slug)}
          <Grid item xs={12}>
            {await DisplayVolumeChart(slug)}
          </Grid>

          <Grid item xs={12} mt={5}>
            <Typography variant="h3">{`${exchange.name} Market Cap (USD)`}</Typography>
          </Grid>
          {await DisplayMktcapStatsFor(slug)}
          <Grid item xs={12}>
            {await DisplayMktcapFor(slug)}
          </Grid>

          <Grid item xs={12} mt={5}>
            <Typography variant="h3">{`${exchange.name} TVEV Ratio`}</Typography>
          </Grid>
          {await DisplayTvevStats(slug)}
          <Grid item xs={12}>
            {await DisplayTvevRatioChartFor(slug)}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
