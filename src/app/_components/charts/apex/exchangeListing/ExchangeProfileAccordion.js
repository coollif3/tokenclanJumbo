import {
  Grid2 as Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Typography,
  Link,
} from "@mui/material";
import { getExchangeProfileFor } from "@app/_services/exchange";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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

// accordion component function is used to display the Exchange Profile details
export default async function ExchangeProfileAccordion({ slug }) {
  const exchangeProfile = await getExchangeProfileFor(slug);
  // console.log("exchangeProfile: ", exchangeProfile);
  return (
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
            const smSize =
              displayKey === "Description" && value !== "N.A" ? 12 : 6;
            const mdSize =
              displayKey === "Description" && value !== "N.A" ? 12 : 4;
            return (
              <Grid size={{ xs: 12, sm: smSize, md: mdSize }}>
                <Card
                  elevation={3}
                  sx={{ border: "1px solid #ddd", p: 1, mb: 1 }}
                >
                  <CardContent>
                    <Typography variant="h6">{displayKey}</Typography>
                    <Typography variant="body1">
                      {/* if key is 'exchange_profile_url', 'reddit', 'telegram' and value is not 'N.A', display value as a link */}
                      {["exchange_profile_url", "reddit", "telegram"].includes(
                        key
                      ) && value !== "N.A" ? (
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
  );
}
