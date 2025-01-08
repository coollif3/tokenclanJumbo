import { getDictionary } from "@app/[lang]/dictionaries";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { JumboCard } from "@jumbo/components";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid2 as Grid,
  Typography,
} from "@mui/material";

export const metadata = {
  title: "Disclaimer Page | TokenClan",
  description: "TokenClan Disclaimer Page",
};

export default function Disclaimer() {
  // const { extraPages } = await getDictionary(lang);
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
    >
      <Typography variant="h3" align="center" mb={3}>
        Disclaimer
      </Typography>
      <JumboCard
        // title={
        //   <Typography variant='h6' color={'text.secondary'}>
        //     About Us
        //   </Typography>
        // }
        // subheader={
        //   <Typography component={'h2'} variant={'h1'}>
        //     A biggest digital marketing agency in the world
        //   </Typography>
        // }
        contentWrapper
        contentSx={{ pt: 0 }}
      >
        <Grid>
          {/* <Grid size={{xs:12 md:6}}>
            <CardMedia
              component={'img'}
              sx={{ borderRadius: 2 }}
              image={getAssetPath(
                `${ASSET_IMAGES}/pages/cherrydeck.jpg`,
                '640x820'
              )}
              alt={'About Us'}
            />
          </Grid> */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* <Button
              disableRipple
              variant={'text'}
              sx={{
                px: 0,
                ml: '-5px',
                mt: { md: 2 },
                mb: 2,
                textTransform: 'none',
                color: 'text.primary',

                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <PlayCircleIcon sx={{ fontSize: '3rem', mr: 1 }} /> Watch Intro
            </Button> */}
            <Box sx={{ maxWidth: "1000px", margin: "auto" }}>
              <Typography variant={"h6"} color={"text.primary"} mt={5} mb={3}>
                Latest Version: 29 July 2024
              </Typography>
              <Typography variant="body1" paragraph>
                All content provided herein our website, hyperlinked sites,
                associated applications, forums, blogs, social media accounts
                and other platforms (“Site”) is for your general information
                only, procured primarily from third party sources and does not
                constitute as a form of endorsement, guarantee, warranty, or
                recommendation by Tokenclan.io. Please do conduct your own due
                diligence before using any third party services.
              </Typography>
              <Typography variant="body1" paragraph>
                The information provided on this website does not constitute
                investment advice, financial advice, trading advice, or any
                other sort of advice and you should not treat any of the
                website's content as such. Any use or reliance on our content
                and services is solely at your own risk and discretion. You
                should conduct your own due diligence, verifying our content or
                services before relying on or using them. As trading or
                investment related activities constitute as highly risky
                activities that can lead to major losses, please consult your
                financial advisor before making any investment decision.
              </Typography>
              <Typography variant="body1" paragraph>
                Tokenclan.io will strive to ensure accuracy of information
                listed on this website but we make no warranties of any kind nor
                hold any responsibility for any missing or inaccurate
                information. You understand that you are using any and all
                information available on Tokenclan.io at your own risk.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </JumboCard>
    </Container>
  );
}
