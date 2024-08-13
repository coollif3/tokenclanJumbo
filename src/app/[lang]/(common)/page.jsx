import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div } from "@jumbo/shared";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import {CarouselComponent} from '../../_components/_core/CarouselComponent/CarouselComponent';

const items = [
  {
    title: 'Exchange Coin TVEV Ratio',
    description: 'Token value to exchange volume (TVEV) ratio. A way to value crypto exchange coins. Adopted from Willy Woo Bitcoin NVT ratio.',
    buttonName: 'Go to Charts',
    image: `${ASSET_IMAGES}/main-page/exchange-coin.jpg`,
    imagePosition: 'right'
  },
  {
    title: 'DeFi Coin Metrics',
    description: 'Grow your DeFi coins back up with their platform utility data.Identify the data trend easily which DeFi coins to keep with TVL and market cap aggregated history.',
    buttonName: 'Go to Charts',
    image: `${ASSET_IMAGES}/main-page/defi-coin.jpg`,
    imagePosition: 'left'
  }
]

export default async function Home() {
  await new Promise(resolve => setTimeout(resolve,2000))
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
      <Typography variant="h1" align="center" mb={5}>
        Empowering Crypto Investors With Financial Data
      </Typography>
      <CarouselComponent items={items}></CarouselComponent>
      <Divider />
      <Typography variant="h2" align="center" mt={5} mb={5}>
        Data Aggregated From
      </Typography>
      <Card>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Div
              sx={{ position: "relative", height: 0, paddingBottom: "69.5%" }}
            >
              <CardMedia
                component="img"
                image={getAssetPath(
                  `${ASSET_IMAGES}/main-page/coingecko-logo.png`,
                  "640x640"
                )}
                alt=""
                sx={{
                  inset: 0,
                  height: "100%",
                  position: "absolute",
                }}
              />
            </Div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Div
              sx={{ position: "relative", height: 0, paddingBottom: "69.5%" }}
            >
              <CardMedia
                component="img"
                image={getAssetPath(
                  `${ASSET_IMAGES}/main-page/coinpaprika-logo.png`,
                  "640x640"
                )}
                alt=""
                sx={{
                  inset: 0,
                  height: "100%",
                  position: "absolute",
                }}
              />
            </Div>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
