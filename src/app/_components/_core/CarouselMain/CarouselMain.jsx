"use client";
import { Typography, Paper, Button, CardMedia, Grid } from "@mui/material";
import { Div } from "@jumbo/shared";

import { getAssetPath } from "@app/_utilities/helpers";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

var settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};
function CarouselMain({ items }) {
  return (
    <div className="slider-container">
      <Slider {...settings}>
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
      </Slider>
    </div>
  );
}

function Item(props) {
  const { theme } = useJumboTheme();
  return (
    <Paper elevation={0} sx={{ borderRadius: 2 }}>
      <Grid container spacing={2} sx={{ py: 8 }}>
        <Grid
          item
          xs={12}
          md={6}
          order={{ md: props.item.imagePosition === "left" ? 1 : 2 }}
        >
          <Div sx={{ position: "relative", height: 0, paddingBottom: "69.5%" }}>
            <CardMedia
              component="img"
              image={getAssetPath(`${props.item.image}`, "640x640")}
              alt=""
              sx={{
                inset: 0,
                height: "100%",
                position: "absolute",
                borderRadius: 2,
              }}
            />
          </Div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          order={{ md: props.item.imagePosition === "left" ? 2 : 1 }}
          sx={{
            alignSelf: "center",
            textAlign:
              props.item.imagePosition === "right"
                ? { sm: "left", md: "right" }
                : "",
          }}
        >
          <Typography variant="h3">{props.item.title}</Typography>
          <Typography variant="body1" mb={5}>
            {props.item.description}
          </Typography>
          <Button
            variant={"contained"}
            href={props.item.buttonLink}
            sx={{
              bgcolor: theme.palette.text.link,
              ":hover": { bgcolor: theme.palette.primary.main },
            }}
          >
            {props.item.buttonName}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export { CarouselMain };
