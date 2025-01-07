"use client";
import { Typography, Paper, Button, CardMedia, Grid } from "@mui/material";
import { Div } from "@jumbo/shared";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { getAssetPath } from "@app/_utilities/helpers";
var settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};
function CarouselImg({ items }) {
  return (
    <Slider {...settings}>
        {items.map((item, index) => (
          <Item item={item} key={index} />
        ))}
    </Slider>
  );
}

function Item(props) {
  return (
    <Paper elevation={0}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Div sx={{ position: "relative", height: 0, padding: 10 }}>
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
      </Grid>
    </Paper>
  );
}

export { CarouselImg };
