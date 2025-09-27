import { JumboDdPopover } from '@jumbo/components';
import { useAuth } from '@app/_contexts/AuthContext';
import { useJumboTheme } from '@jumbo/components/JumboTheme/hooks';
import { Div } from '@jumbo/shared';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const AuthUserPopover = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { theme } = useJumboTheme();

  const logout = React.useCallback(() => {
    signOut();
    router.push('/auth/login');
  }, [signOut, router]);

  if (!user) return null;
  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <Avatar
            sx={{ bgcolor: 'primary.main', cursor: 'pointer' }}
            sizes={'small'}
          >
            {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)}
          </Avatar>
        }
        sx={{ ml: 3 }}
      >
        <Div
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            p: (theme) => theme.spacing(2.5),
          }}
        >
          <Avatar
            sx={{ bgcolor: 'primary.main' }}
            sx={{ width: 60, height: 60, mb: 2 }}
          >
            {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)}
          </Avatar>
          <Typography variant={'h5'}>{user.user_metadata?.full_name || 'Member'}</Typography>
          <Typography variant={'body1'} color='text.secondary'>
            {user.email}
          </Typography>
        </Div>
        <Divider />
        <nav>
          <List disablePadding sx={{ pb: 1 }}>
            <ListItemButton onClick={() => router.push('/profile')}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary='Profile' sx={{ my: 0 }} />
            </ListItemButton>
            <ListItemButton onClick={logout}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' sx={{ my: 0 }} />
            </ListItemButton>
          </List>
        </nav>
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export default AuthUserPopover;