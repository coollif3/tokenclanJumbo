'use client';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Theme,
  Typography,
  alpha,
} from '@mui/material';

const items = [
  {
    title: 'Address',
    description: 'The Plaza 7500A Beach Road <br/>#07-320<br/>Singapore 199591',
    icon: <LocationOnIcon fontSize={'medium'} />,
    bgColor: (theme: Theme) => alpha(theme.palette.info.main, 0.35),
    color: 'info.main',
  },
  {
    title: 'Phone No.',
    description: '+65 9739 3465 <br/>+65 9852 8269',
    icon: <LocalPhoneIcon fontSize={'medium'} />,
    bgColor: (theme: Theme) => alpha(theme.palette.warning.main, 0.35),
    color: 'warning.main',
  },
  {
    title: 'Email',
    description: 'bk@flagone.io <br/>charlieng@flagone.io',
    icon: <MailIcon fontSize={'medium'} />,
    bgColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.35),
    color: 'primary.main',
  },
];
const ContactsDetail = () => {
  return (
    <>
      {items?.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ minHeight: '100%' }}>
            <CardContent
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: item?.bgColor,
                  width: 52,
                  height: 52,
                  border: 1,
                  color: item?.color,
                  borderColor: item?.color,
                  boxShadow: 2,
                  mb: 3,
                }}
              >
                {item?.icon}
              </Avatar>
              <Typography variant={'h5'}>{item?.title}</Typography>
              <Typography
                variant={'body1'}
                color={'text.secondary'}
                dangerouslySetInnerHTML={{ __html: item?.description }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export { ContactsDetail };
