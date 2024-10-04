import { getCoinProfileFor } from "@app/_services/coin";
import { splitIntoParagraphs } from "@app/_utilities/helpers";
import { Grid, Typography, Link, Card, CardContent } from "@mui/material";

// accordion component function is used to display the Coin Profile details
export default async function CoinProfilePage({ slug }) {
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
