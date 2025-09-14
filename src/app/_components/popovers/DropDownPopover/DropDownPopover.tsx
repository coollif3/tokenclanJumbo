'use client';

import { JumboDdPopover, JumboIconButton } from "@jumbo/components";
import {
  useJumboTheme,
  useJumboHeaderTheme,
} from "@jumbo/components/JumboTheme/hooks";
import { Div } from "@jumbo/shared";
import BarChartIcon from "@mui/icons-material/BarChart";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import TollIcon from "@mui/icons-material/Toll";
import {
  Avatar,
  Button,
  colors,
  Divider,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
// import { signOut } from 'next-auth/react';
import React from "react";

const DropDownPopover = () => {
  const { theme } = useJumboTheme();
  const { headerTheme } = useJumboHeaderTheme();
  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <ThemeProvider theme={headerTheme}>
            <Button
              sx={{
                color: theme.palette.text.link,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff", // Change text color on hover
                },
              }}
            >
              <BarChartIcon sx={{ fontSize: "1.5rem" }} />
              Charts
            </Button>
          </ThemeProvider>
        }
        // disableInsideClick
        sx={{}} // Provide a default or placeholder value for sx
      >
        <Div
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: (theme) => theme.spacing(0.75),
          }}
        ></Div>
        <nav>
          <List
            disablePadding
            sx={{
              pb: 1,
              color: theme.palette.text.link,
            }}
          >
            <Link
              href="/blockchains"
              sx={{ my: 0 }}
              color="inherit"
              underline="none"
            >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CurrencyBitcoinIcon />
                </ListItemIcon>
                Blockchains
              </ListItemButton>
            </Link>
            <Link
              href="/exchanges"
              sx={{ my: 0 }}
              color="inherit"
              underline="none"
            >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CurrencyExchangeIcon />
                </ListItemIcon>
                Exchanges
              </ListItemButton>
            </Link>
            <Link href="/coins" sx={{ my: 0 }} color="inherit" underline="none">
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <TollIcon />
                </ListItemIcon>
                Coins
              </ListItemButton>
            </Link>
          </List>
        </nav>
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export { DropDownPopover };
