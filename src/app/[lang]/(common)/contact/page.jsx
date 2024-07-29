import { getDictionary } from '@app/[lang]/dictionaries';
import { ContactUsForm } from '@app/_components/contactus/ContactUsForm';
import { ContactsDetail } from '@app/_components/contactus/ContactsDetail';
import { SocialIcons } from '@app/_components/contactus/SocialIcons';
import { CONTAINER_MAX_WIDTH } from '@app/_config/layouts';
import { ASSET_IMAGES } from '@app/_utilities/constants/paths';
import { getAssetPath } from '@app/_utilities/helpers';

import { Card, CardMedia, Container, Grid, Typography } from '@mui/material';
// interface ContactUsProps {
//   params: { lang: string };
// }
export default function ContactUs() {
  // const { extraPages } = await getDictionary(lang);
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
      <Typography variant='h1' align='center' mb={3}>
        Contact Us
      </Typography>
      <Card sx={{ display: 'flex', mb: 3.5 }}>
        <ContactUsForm />
        {/* <CardMedia
          component='img'
          sx={{
            flexShrink: 0,
            flexBasis: '40%',
            display: { xs: 'none', md: 'block' },
            aspectRatio: 1 / 1,
          }}
          image={getAssetPath(`${ASSET_IMAGES}/apps/contactus.jpg`, '640x920')}
          alt='Contact Us'
        /> */}
      </Card>
      <Grid container spacing={3.75} mb={3.5}>
        <ContactsDetail />
      </Grid>
      {/* <SocialIcons /> */}
    </Container>
  );
}