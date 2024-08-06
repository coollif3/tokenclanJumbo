'use client';
import Carousel from 'react-material-ui-carousel';
import {
  Typography,Paper,Button,CardMedia,Grid
} from "@mui/material";
import { Div } from "@jumbo/shared";

import { getAssetPath } from "@app/_utilities/helpers";


function CarouselComponent({items}) {
  return (
    <Carousel>
      {items.map((item,index) => 
        <Item item={item} key={index} />
      )}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} order={{ md: props.item.imagePosition === 'left' ? 1 : 2 }}>
          <Div
              sx={{ position: "relative", height: 0, paddingBottom: "69.5%" }}
            >
              <CardMedia
                component="img"
                image={getAssetPath(
                  `${props.item.image}`,
                  "640x640"
                )}
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
          item xs={12} md={6}
          order={{ md: props.item.imagePosition === 'left' ? 2 : 1 }}
          sx={{
            alignSelf: "center",
            textAlign: props.item.imagePosition === 'right' ? { sm: "left", md: "right" } : '',
          }}
        >
            <Typography variant="h2">{props.item.title}</Typography>
            <Typography variant="body1" mb={5}>
              {props.item.description}
            </Typography>
            <Button
              variant={"contained"}
              href="/blockchains"
              sx={{ bgcolor: "#2D5FB4", ":hover": { bgcolor: "#5DCBA6" }}}
            >
              {props.item.buttonName}
            </Button>
        </Grid>

      </Grid>
    </Paper>
  );
}

export {CarouselComponent};
