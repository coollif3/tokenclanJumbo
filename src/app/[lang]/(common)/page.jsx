import { getDictionary } from '@app/[lang]/dictionaries';
import { CONTAINER_MAX_WIDTH } from '@app/_config/layouts';
import { ASSET_IMAGES } from '@app/_utilities/constants/paths';
import { getAssetPath } from '@app/_utilities/helpers';
import { Div } from '@jumbo/shared';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Divider
} from '@mui/material';

export default function Home() {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: 'flex',
        minWidth: 0,
        flex: 1,
        flexDirection: 'column',
      }}
      disableGutters
    >
      <Typography variant='h1' align='center' mb={5}>
        Empowering Crypto Investors With Financial Data
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3.75} mb={1}>
            <Grid item xs={12} md={6}>
              <Div
                sx={{ position: 'relative', height: 0, paddingBottom: '69.5%' }}
              >
                <CardMedia
                  component='img'
                  image={getAssetPath(
                    `${ASSET_IMAGES}/main-page/exchange-coin.jpg`,
                    '640x640'
                  )}
                  alt=''
                  sx={{
                    inset: 0,
                    height: '100%',
                    position: 'absolute',
                    borderRadius: 2,
                  }}
                />
              </Div>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                alignSelf: 'center',
                textAlign: { sm: 'left', md: 'right' },
                order: { md: -1 },
              }}
            >
              <Typography variant='h3' mb={2}>
                Exchange Coin TVEV Ratio
              </Typography>
              <Typography variant='body1' mb={5}>
                Token value to exchange volume (TVEV) ratio. A way to value crypto exchange coins. Adopted from Willy Woo Bitcoin NVT ratio.
              </Typography>
              <Button variant={'contained'} href='/blockchains' disableElevation>
                Go to Charts
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Div
                sx={{ position: 'relative', height: 0, paddingBottom: '69.5%' }}
              >
                <CardMedia
                  component='img'
                  image={getAssetPath(
                    `${ASSET_IMAGES}/main-page/defi-coin.jpg`,
                    '640x640'
                  )}
                  alt=''
                  sx={{
                    inset: 0,
                    height: '100%',
                    position: 'absolute',
                    borderRadius: 2,
                  }}
                />
              </Div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ alignSelf: 'center' }}>
              <Typography variant='h3' mb={2}>
                DeFi Coin Metrics
              </Typography>
              <Typography variant='body1' mb={5}>
                Grow your DeFi coins back up with their platform utility data. 
                Identify the data trend easily which DeFi coins to keep with TVL and market cap aggregated history.
              </Typography>
              <Button variant={'contained'} href='/exchanges' disableElevation>
                Go to Charts
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Divider />
      <Typography variant='h2' align='center' mt={5} mb={5}>
        Data Aggregated From
      </Typography>
      <Card>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Div
              sx={{ position: 'relative', height: 0, paddingBottom: '69.5%' }}
            >
              <CardMedia
                component='img'
                image={getAssetPath(
                  `${ASSET_IMAGES}/main-page/coingecko-logo.png`,
                  '640x640'
                )}
                alt=''
                sx={{
                  inset: 0,
                  height: '100%',
                  position: 'absolute',
                }}
              />
            </Div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Div
              sx={{ position: 'relative', height: 0, paddingBottom: '69.5%' }}
            >
              <CardMedia
                component='img'
                image={getAssetPath(
                  `${ASSET_IMAGES}/main-page/coinpaprika-logo.png`,
                  '640x640'
                )}
                alt=''
                sx={{
                  inset: 0,
                  height: '100%',
                  position: 'absolute',
                }}
              />
            </Div>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}