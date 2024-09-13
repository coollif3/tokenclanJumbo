import { getDictionary } from "@app/[lang]/dictionaries";
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
  Box,
} from "@mui/material";
import { CarouselMain } from "../../_components/_core/CarouselMain/CarouselMain";
import { CarouselImg } from "../../_components/_core/CarouselImg/CarouselImg";
import { NewsLetterSubscription } from "@app/_components/widgets/NewsLetterSubscription/NewsLetterSubscription";

const items = [
  {
    title: "Exchange Coin TVEV Ratio",
    description:
      "Token value to exchange volume (TVEV) ratio. A way to value crypto exchange coins. Adopted from Willy Woo Bitcoin NVT ratio.",
    buttonName: "Go to Charts",
    buttonLink: "/exchanges",
    image: `${ASSET_IMAGES}/main-page/exchange-coin.jpg`,
    imagePosition: "right",
  },
  {
    title: "DeFi Coin Metrics",
    description:
      "Grow your DeFi coins back up with their platform utility data.Identify the data trend easily which DeFi coins to keep with TVL and market cap aggregated history.",
    buttonName: "Go to Charts",
    buttonLink: "/blockchains",
    image: `${ASSET_IMAGES}/main-page/defi-coin.jpg`,
    imagePosition: "left",
  },
];

const images = [
  {
    image: `${ASSET_IMAGES}/main-page/coingecko-logo.svg`,
  },
  {
    image: `${ASSET_IMAGES}/main-page/coinpaprika-logo.svg`,
  },
  {
    image: `${ASSET_IMAGES}/main-page/defillama-logo.svg`,
  },
];

export default async function Home({ params }) {
  const { widgets } = await getDictionary(params.lang);
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
      <Typography variant="h1" align="center" mb={4}>
        Empowering Crypto Investors With Financial Data
      </Typography>
      <CarouselMain items={items}></CarouselMain>
      <Typography variant="h4" align="center" my={4}>
        Data Aggregated From
      </Typography>
      <CarouselImg items={images}></CarouselImg>
    </Container>
  );
}
