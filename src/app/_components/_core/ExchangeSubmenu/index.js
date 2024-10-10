"use client";
import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";

export default function ExchangeSubmenu({ slug, coinSlug }) {
  const { theme } = useJumboTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const handleNavigation = (path) => {
    handleClose();
    router.push(path);
  };

  return (
    <div>
      <Button
        variant="outlined"
        endIcon={<ArrowDropDownIcon sx={{ fontSize: 32 }} />}
        id="exSubmenu-button"
        aria-controls={open ? "exchange-submenu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          color: theme.palette.text.link,
          borderColor: theme.palette.text.link,
        }}
        onClick={handleClick}
      >
        SubMenu
      </Button>
      <Menu
        id="exchange-submenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "exSubmenu-button",
        }}
      >
        <MenuItem
          sx={{
            color: theme.palette.text.link,
            "&:hover": { backgroundColor: theme.palette.background.default },
            "&:active": { color: theme.palette.primary.main },
          }}
          onClick={() => handleNavigation(`/exchanges/${slug}/dominance`)}
        >
          Exchange Dominance
        </MenuItem>
        <MenuItem
          sx={{
            color: theme.palette.text.link,
            "&:hover": { backgroundColor: theme.palette.background.default },
            "&:active": { color: theme.palette.primary.main },
          }}
          onClick={() => handleNavigation(`/exchanges/${slug}/volume`)}
        >
          Exchange Volume
        </MenuItem>

        <MenuItem
          sx={{
            color: theme.palette.text.link,
            "&:hover": { backgroundColor: theme.palette.background.default },
            "&:active": { color: theme.palette.primary.main },
          }}
          divider
          onClick={() => handleNavigation(`/exchanges/${slug}/tvev`)}
        >
          Tvev Ratio
        </MenuItem>
        <MenuItem
          sx={{
            color: theme.palette.text.link,
            "&:hover": { backgroundColor: theme.palette.background.default },
            "&:active": { color: theme.palette.primary.main },
          }}
          onClick={() => handleNavigation(`/coins/${coinSlug}?route=exchange`)}
        >
          Coin Profile
        </MenuItem>
        <MenuItem
          sx={{
            color: theme.palette.text.link,
            "&:hover": { backgroundColor: theme.palette.background.default },
            "&:active": { color: theme.palette.primary.main },
          }}
          onClick={() => handleNavigation(`/exchanges/${slug}/marketcap`)}
        >
          Marketcap
        </MenuItem>
      </Menu>
    </div>
  );
}
