"use client";
import Carousel from "react-material-ui-carousel";
import { Typography, Paper, Button, CardMedia, Grid } from "@mui/material";
import { Div } from "@jumbo/shared";

import { getAssetPath } from "@app/_utilities/helpers";

function CarouselImg({ items }) {
  return (
    <Carousel>
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </Carousel>
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
