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
  Grid,
  Typography,
} from "@mui/material";

export const metadata = {
  title: "TVEV Ratio | Valuing Crypto Exchange Coins",
  description:
    "The Token Value to Exchange Volume (TVEV) ratio is a method for valuing cryptocurrency exchange tokens by comparing the token’s price to the trading volume on the exchange.",
};

export default function tvevRatio() {
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
      <Typography variant="h1" align="center" mb={3}>
        What Is TVEV Ratio?
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
          {/* <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
              <Typography variant="h3" mt={3} gutterBottom>
                TVEV Ratio Definition
              </Typography>
              <Typography paragraph>
                A possible and practical way to value such crypto exchanges is
                via this methodology named Token Value to Exchange Volume (TVEV)
                ratio.
              </Typography>
              <Typography paragraph>
                For people who will like to find out more about TVEV ratio; it
                is adapted from Network Value to Transactions (NVT) ratio first
                formulated by Willy Woo.
              </Typography>
              <Typography variant="h4" gutterBottom>
                Definition
              </Typography>
              <Typography paragraph>
                Token Value to Exchange Volume (TVEV) ratio serves as a simple
                model to compare the prices of an exchange token to the traded
                volume on the underlying exchange. TVEV ratio is adapted from
                Network Value to Transactions (NVT) ratio first created by Willy
                Woo.
              </Typography>
              <Typography paragraph>
                In conventional stock markets, the Price to Earnings (PE) ratio
                has been a long-standing tool for valuing companies. PE ratio
                compares the company’s total market capitalization to its total
                earnings. This is a measure of the fundamental value for stock
                and shares since earnings are the main indicator most investors
                are concerned with.
              </Typography>
              <Typography paragraph>
                In the same way a share investor wants a company with healthy
                earnings, an exchange token holder wants the exchange to
                facilitate a healthy amount of transaction activity. TVEV ratio
                can be viewed in a similar fashion as that of the PE ratio in
                valuing equities.
              </Typography>
              <Typography paragraph>
                The TVEV ratio is calculated using the following formula:
              </Typography>
              <Typography paragraph>
                TVEV Ratio = (TokenPriceInBTC * TotalTokenSupply) /
                (24hrExchangeVolumeInBTC)
              </Typography>
              <Typography paragraph>
                While NVT ratio takes into account only data from on-chain
                transactions, all the transaction volume that happens on the
                exchanges and is, for the most part, speculative in nature and
                is not included.
              </Typography>
              <Typography paragraph>
                TVEV ratio disregards all on-chain transactions while factoring
                transactional volumes (off-chain transactions) denoted in
                bitcoin as facilitated through the buying and selling of
                cryptocurrencies via exchanges.
              </Typography>
              <Typography paragraph>
                There are certainly people who believe that these exchange
                trading volume could be fake by the exchange themselves,
                resulting in the reported trading volume to be way higher than
                the actual figures. These reported numbers provide starting
                figures for analysis and valuation to take place.
              </Typography>
              <Typography paragraph>
                Due to its unregulated nature for most of these crypto exchanges
                to date, we should not view these numbers in absolute terms but
                analyze them in relative terms and attempt to extrapolate trend
                analysis with data points aggregated over time. The volume data
                will get accurate as initiatives in the space are making the
                reporting more transparent each passing day. Moving forward, the
                data is expected to get accurate as the crypto economy matures
                and progresses through time.
              </Typography>
              <Typography variant="h4" gutterBottom>
                Example of the TVEV Ratio Calculation
              </Typography>
              <Typography paragraph>
                As an example, let us calculate the TVEV ratio of an exchange
                coin on a particular day which the:
              </Typography>
              <Typography paragraph>
                Token price in BTC is 0.00220000
                <br />
                The total token supply is 100,000,000
                <br />
                The 24-hour Exchange Volume In BTC for the day is 2,500
              </Typography>
              <Typography paragraph>
                Therefore based on the TVEV ratio formula: (0.00220000 *
                100,000,000) / 2,500 = 88
              </Typography>
              <Typography variant="h4" gutterBottom>
                Simple Interpretation of TVEV Ratio
              </Typography>
              <Typography paragraph>
                A high TVEV ratio relative to its typical normal range of the
                token, may mean that the future growth of the token is bright
                and investors are expecting high transactional growth, or it can
                mean overvaluation.
              </Typography>
              <Typography paragraph>
                A low TVEV ratio relative to its typical normal range of the
                token, may mean that crypto investors and traders are expecting
                limited growth prospects and having low expectations on its
                transactional activity, or it can mean that they might have
                overlooked this token resulting in the token being undervalued.
              </Typography>
              <Typography paragraph>
                This is a simple explanation of what TVEV ratio is about.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </JumboCard>
    </Container>
  );
}
