import {
  splitIntoParagraphs,
  capitalizeFirstLetter,
  assignValueNA,
  filterByLowestRelationId
} from "@app/_utilities/helpers";
import {
  Grid,
  Typography,
  Link,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getCoinProfileFor } from "@app/_services/coin";

// Accordion component function is used to display the Coin Profile details
export default async function CoinProfileAccordion({ slug, route }) {
  const coinProfile = await getCoinProfileFor(slug);
  // console.log("slug: ", slug);
  // console.log("coinProfile: ", coinProfile);

  let blockchainRoute = false,
    exchangeRoute = false,
    coinRoute = false;

  switch (route) {
    case "blockchain":
      blockchainRoute = true;
      break;
    case "exchange":
      exchangeRoute = true;
      break;
    case "coin":
      coinRoute = true;
      break;
    default:
      break;
  }

  const filteredProfiles = filterByLowestRelationId(coinProfile);
  // console.log("filteredProfiles: ", filteredProfiles);

  const renderAccordion = (profile, index) => {
    profile = assignValueNA(profile, ['description', 'homepage', 'subreddit']); // Assign "N.A" to empty or null values
    return (
      <Accordion
        key={profile.id}
        defaultExpanded={
          (blockchainRoute && profile.type_name === "blockchain") ||
          (exchangeRoute && profile.type_name === "exchange")
        }
        elevation={0}
        sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
      >
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography variant="h5">{capitalizeFirstLetter(profile.type_name)} Coin Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {profile.symbol && profile.symbol !== "N.A" && (
              <Grid item xs={12} sm={6}>
                <Card elevation={3} sx={{ border: "1px solid #ddd", p: 1, mb: 1 }}>
                  <CardContent>
                    <Typography variant="h6">{capitalizeFirstLetter(profile.type_name)}</Typography>
                    <Typography variant="body1">
                      {profile.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {profile.symbol && profile.symbol !== "N.A" && (
              <Grid item xs={12} sm={6}>
                <Card elevation={3} sx={{ border: "1px solid #ddd", p: 1, mb: 1 }}>
                  <CardContent>
                    <Typography variant="h6">Coin Symbol</Typography>
                    <Typography variant="body1">
                      {profile.symbol}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {profile.description && profile.description !== "N.A" && (
              <Grid item xs={12}>
                <Card elevation={3} sx={{ border: "1px solid #ddd", p: 1, mb: 1 }}>
                  <CardContent>
                    <Typography variant="h6">About {profile.name}</Typography>
                    {splitIntoParagraphs(profile.description).map((paragraph, index) => (
                      <Typography variant="body1" paragraph key={index}>
                        {paragraph}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            )}
            {profile.homepage && profile.homepage !== "N.A" && (
              <Grid item xs={12} sm={6}>
                <Card elevation={3} sx={{ border: "1px solid #ddd", p: 1, mb: 1 }}>
                  <CardContent>
                    <Typography variant="h6">Homepage URL</Typography>
                    <Typography variant="body1">
                      <Link href={profile.homepage} target="_blank" rel="noopener noreferrer">
                        {profile.homepage}
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {profile.subreddit && profile.subreddit !== "N.A" && (
              <Grid item xs={12} sm={6}>
                <Card elevation={3} sx={{ border: "1px solid #ddd", p: 1, mb: 1 }}>
                  <CardContent>
                    <Typography variant="h6">Subreddit URL</Typography>
                    <Typography variant="body1">
                      <Link href={profile.subreddit} target="_blank" rel="noopener noreferrer">
                        {profile.subreddit}
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  };

  // Sort profiles to display the one with type_name === "blockchain" or "exchange" first
  const sortedProfiles = filteredProfiles.sort((a, b) => {
    if (blockchainRoute && a.type_name === "blockchain") return -1;
    if (exchangeRoute && a.type_name === "exchange") return -1;
    return 0;
  });

  return (
    <div>
      {sortedProfiles.map((profile, index) => renderAccordion(profile, index))}
    </div>
  );
}