import {
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  getExchangeNameFor,
  getCommonCoinProfileFor,
  getCommonCoinSlug
} from "@app/_services/exchange";
import { getBlockchainNameForSlug } from "@app/_services/blockchain";

export async function generateStaticParams() {
  const rows = await getCommonCoinSlug();
  // console.log("rows: ", rows);

  const results = rows
    .filter(row => row.dcp_slug !== null || row.ecp_slug !== null) // Filter out rows where both dcp_slug and ecp_slug are null
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
  const exchange = await getExchangeNameFor(slug);
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

// accordion component function is used to display the Coin Profile details
async function DisplayCommonCoinProfile(slug) {
  const coinProfile = await getCommonCoinProfileFor(slug);
  // console.log("slug: ", slug);
  // console.log("commomCoinProfile: ", coinProfile);

  // mapping of the key names to display names
  const keyNameMapping = {
    dcp_symbol: "Gas Coin Symbol",
    dcp_name: "Blockchain",
    dcp_description: `About ${coinProfile.dcp_name} Gas Coin`,
    dcp_homepage: "Homepage URL",
    dcp_subreddit_url: "Reddit",
    ecp_symbol: "Symbol",
    ecp_name: "Exchange",
    ecp_description: `About ${coinProfile.ecp_name}`,
    ecp_homepage: "Homepage URL",
    ecp_subreddit_url: "Reddit",
  };

  // split the description into readable paragraphs
  const splitIntoParagraphs = (text) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 4) {
      paragraphs.push(sentences.slice(i, i + 4).join(" "));
    }
    return paragraphs;
  };

  // Function to render profile data to be displayed
  const renderProfileData = (profileType) => {
    return Object.keys(coinProfile).map((key) => {
      // Skip keys that do not match the displayProfile value to be displayed
      if (profileType === 'ecp' && key.startsWith('dcp_')) return null;
      if (profileType === 'dcp' && key.startsWith('ecp_')) return null;

      // Skip dcp_slug and ecp_slug display
      if (key === 'dcp_slug' || key === 'ecp_slug') return null;

      let displayKey = keyNameMapping[key] || key;
      let value = coinProfile[key] || "N.A";

      return (
        <Grid
          item
          xs={12}
          sm={(key === 'dcp_description' || key === 'ecp_description') && value !== "N.A" ? 12 : 6}
          md={(key === 'dcp_description' || key === 'ecp_description') && value !== "N.A" ? 12 : 6}
          lg={(key === 'dcp_description' || key === 'ecp_description') && value !== "N.A" ? 12 : 6}
          key={key}
        >
          <Card elevation={3} sx={{ border: "1px solid #ddd", p: 1, mb: 1 }}>
            <CardContent>
              <Typography variant="h6">{displayKey}</Typography>
              {(key === 'dcp_description' || key === 'ecp_description') && value !== "N.A" ? (
                splitIntoParagraphs(value).map((paragraph, index) => (
                  <Typography variant="body1" paragraph key={index}>
                    {paragraph}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1">
                  {["dcp_homepage", "dcp_subreddit_url", "ecp_homepage", "ecp_subreddit_url"].includes(key) && value !== "N.A" ? (
                    <Link href={value} target="_blank" rel="noopener noreferrer">
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
        {coinProfile.dcp_slug !== null && coinProfile.ecp_slug === null && (
          <Accordion
            elevation={0}
            sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
          >
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h5">Blockchain Gas Coin Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {renderProfileData('dcp')}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}
        {coinProfile.dcp_slug === null && coinProfile.ecp_slug !== null && (
          <Accordion
            elevation={0}
            sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
          >
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography variant="h5">Exchange Coin Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {renderProfileData('ecp')}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}
        {coinProfile.dcp_slug !== null && coinProfile.ecp_slug !== null && (
          <>
            <Accordion
              elevation={0}
              sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
            >
              <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Typography variant="h5">Blockchain Gas Coin Profile</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {renderProfileData('dcp')}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              elevation={0}
              sx={{ boxShadow: "none", mb: 3, border: "1px solid #ddd" }}
            >
              <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Typography variant="h5">Exchange Coin Profile</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {renderProfileData('ecp')}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </Grid>
    </>
  );
}

export default async function CoinProfilePage({ params }) {
  // const param = params;
  // console.log("param: ", param);
  const slug = params.slug;
  const exchange = await getExchangeNameFor(slug);
  const blockchain = await getBlockchainNameForSlug(slug);

  let name;

  if (exchange) {
    name = exchange.name;
  } else if (blockchain) {
    name = blockchain.name;;
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
      >
        <Grid container spacing={3.75} sx={{ mt: 3, mb: 6 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h3">{`${name}`}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ marginLeft: "auto" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href={exchange ? `/exchanges/` : `/blockchains/`}>
                {exchange ? `Exchanges` : `Blockchains`}
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href={exchange ? `/exchanges/${slug}` : `/blockchains/${slug}`}
              >
                {exchange ? exchange.name : blockchain.name}
              </Link>
              <Typography color="text.primary">Coin Profile</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container spacing={3.75}>
          <Grid item xs={12}>
            {await DisplayCommonCoinProfile(slug)}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
