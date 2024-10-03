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
  getCoinProfileFor,
  getCoinNameFor,
  getAllCoinSlug,
} from "@app/_services/coin";

import { splitIntoParagraphs } from "@app/_utilities/helpers";

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

// accordion component function is used to display the Coin Profile details
async function DisplayCoinProfile(slug) {
  const coinProfile = await getCoinProfileFor(slug);
  // console.log("coinProfile: ", coinProfile);

  // mapping of the key names to display names
  const keyNameMapping = {
    symbol: "Symbol",
    coin_profile_name: "Coin Name",
    description: `About ${coinProfile.coin_profile_name}`,
    homepage: "Homepage URL",
    subreddit_url: "Reddit",
  };

  return (
    <>
      <Grid container spacing={2}>
        {Object.keys(coinProfile).map((key) => {
          let displayKey = keyNameMapping[key] || key;
          let value = coinProfile[key] || "N.A";

          return (
            <Grid
              item
              xs={12}
              sm={
                displayKey === `About ${coinProfile.coin_profile_name}` &&
                value !== "N.A"
                  ? 12
                  : 6
              }
              md={
                displayKey === `About ${coinProfile.coin_profile_name}` &&
                value !== "N.A"
                  ? 12
                  : 4
              }
              key={key}
            >
              <Card
                elevation={3}
                sx={{ border: "1px solid #ddd", p: 1, mb: 1 }}
              >
                <CardContent>
                  <Typography variant="h6">{displayKey}</Typography>
                  {key === "description" && value !== "N.A" ? (
                    splitIntoParagraphs(value).map((paragraph, index) => (
                      <Typography variant="body1" paragraph key={index}>
                        {paragraph}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body1">
                      {["homepage", "subreddit_url"].includes(key) &&
                      value !== "N.A" ? (
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
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
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
      >
        <Grid container spacing={3.75} sx={{ my: 3 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h3">{`${coin.name} Coin Profile`}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ marginLeft: "auto" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/coins">
                Coins
              </Link>
              <Typography color="text.primary">{coin.name}</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container spacing={3.75}>
          <Grid item xs={12}>
            {await DisplayCoinProfile(slug)}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
