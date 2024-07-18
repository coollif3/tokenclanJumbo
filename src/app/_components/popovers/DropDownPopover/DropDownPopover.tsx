import { JumboDdPopover, JumboIconButton } from '@jumbo/components';
import { useJumboTheme, useJumboHeaderTheme } from '@jumbo/components/JumboTheme/hooks';
import { Div } from '@jumbo/shared';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {
    Avatar,
    Button,
    Divider,
    Link,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ThemeProvider,
    Typography,
} from '@mui/material';
// import { signOut } from 'next-auth/react';
import React from 'react';

const DropDownPopover = () => {
    const { theme } = useJumboTheme();
    const { headerTheme } = useJumboHeaderTheme();
    return (
        <ThemeProvider theme={theme}>
            <JumboDdPopover
                triggerButton={
                    <ThemeProvider theme={headerTheme}>
                        <Button color="inherit">
                            <BarChartIcon sx={{ fontSize: '1.5rem' }} />
                            Charts
                        </Button>
                    </ThemeProvider>
                }
            // disableInsideClick
            >
                <Div
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        p: (theme) => theme.spacing(0.75),
                    }}
                >
                </Div>
                <nav>
                    <List disablePadding sx={{ pb: 1 }}>
                        <Link href="/blockchains" sx={{ my: 0 }} color="inherit" underline="none">
                            <ListItemButton>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <CurrencyBitcoinIcon />
                                </ListItemIcon>
                                {/* <ListItemText primary='Blockchains' sx={{ my: 0 }} /> */}
                                Blockchains
                            </ListItemButton>
                        </Link>
                        <Link href="/exchanges" sx={{ my: 0 }} color="inherit" underline="none">
                            <ListItemButton>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <CurrencyExchangeIcon />
                                </ListItemIcon>
                                {/* <ListItemText primary='Exchanges' sx={{ my: 0 }} /> */}
                                Exchanges
                            </ListItemButton>
                        </Link>
                    </List>
                </nav>
            </JumboDdPopover>
        </ThemeProvider>
    );
};

export { DropDownPopover };