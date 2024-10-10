import { splitIntoParagraphs } from "@app/_utilities/helpers";
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
import { getCommonCoinProfileFor } from "@app/_services/coin";

// accordion component function is used to display the Coin Profile details
export default async function CoinProfileAccordion({ slug, route }) {
  const coinProfile = await getCommonCoinProfileFor(slug);
  // console.log("slug: ", slug);
  // console.log("commomCoinProfile: ", coinProfile);

  let blockchainRoute,
    exchangeRoute,
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

  // mapping of the key names to display names
  const keyNameMapping = {
    dcp_symbol: "Gas Coin Symbol",
    dcp_name: "Blockchain",
    dcp_description: `About ${coinProfile.dcp_name} Gas Coin`,
    dcp_homepage: "Homepage URL",
    dcp_subreddit_url: "Reddit",
    ecp_symbol: "Coin Symbol",
    ecp_exchng_name: "Exchange",
    ecp_description: `About ${coinProfile.ecp_name}`,
    ecp_homepage: "Homepage URL",
    ecp_subreddit_url: "Reddit",
  };

  // Function to render profile data to be displayed
  const renderProfileData = (profileType) => {
    return Object.keys(coinProfile).map((key) => {
      // Skip keys that do not match the displayProfile value to be displayed
      if (profileType === "ecp" && key.startsWith("dcp_")) return null;
      if (profileType === "dcp" && key.startsWith("ecp_")) return null;

      // Skip dcp_slug and ecp_slug display
      if (key === "dcp_slug" || key === "ecp_slug" || key === "ecp_name" || key === "coin_slug")
        return null;

      let displayKey = keyNameMapping[key] || key;
      let value = coinProfile[key] || "N.A";

      return (
        <Grid
          item
          xs={12}
          sm={
            (key === "dcp_description" || key === "ecp_description") &&
              value !== "N.A"
              ? 12
              : 6
          }
          md={
            (key === "dcp_description" || key === "ecp_description") &&
              value !== "N.A"
              ? 12
              : 6
          }
          lg={
            (key === "dcp_description" || key === "ecp_description") &&
              value !== "N.A"
              ? 12
              : 6
          }
          key={key}
        >
          <Card elevation={3} sx={{ border: "1px solid #ddd", p: 1, mb: 1 }}>
            <CardContent>
              <Typography variant="h6">{displayKey}</Typography>
              {(key === "dcp_description" || key === "ecp_description") &&
                value !== "N.A" ? (
                splitIntoParagraphs(value).map((paragraph, index) => (
                  <Typography variant="body1" paragraph key={index}>
                    {paragraph}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1">
                  {[
                    "dcp_homepage",
                    "dcp_subreddit_url",
                    "ecp_homepage",
                    "ecp_subreddit_url",
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
              )}
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        {coinRoute && coinProfile.dcp_slug && (
          <Accordion
            elevation={0}
            sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
          >
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h5">Blockchain Gas Coin Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {renderProfileData("dcp")}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}

        {coinRoute && coinProfile.ecp_slug && (
          <Accordion
            elevation={0}
            sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
          >
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h5">Exchange Coin Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {renderProfileData("ecp")}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}

        {blockchainRoute && coinProfile.dcp_slug && (
          <Accordion
            defaultExpanded
            elevation={0}
            sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
          >
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h5">Blockchain Gas Coin Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {renderProfileData("dcp")}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}

        {blockchainRoute && coinProfile.ecp_slug && (
          <Accordion
            elevation={0}
            sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
          >
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h5">Exchange Coin Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {renderProfileData("ecp")}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}

        {exchangeRoute && coinProfile.ecp_slug && (
          <Accordion
            defaultExpanded
            elevation={0}
            sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
          >
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h5">Exchange Coin Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {renderProfileData("ecp")}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}

        {exchangeRoute && coinProfile.dcp_slug && (
          <Accordion
            elevation={0}
            sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
          >
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h5">Blockchain Gas Coin Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {renderProfileData("dcp")}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}
      </Grid>
    </>
  );
}
