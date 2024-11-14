"use client";
import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";

export default function BlockchainSubmenu({ slug, coinSlug }) {
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
        id="bcSubmenu-button"
        aria-controls={open ? "blockchain-submenu" : undefined}
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
        id="blockchain-submenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "bcSubmenu-button",
        }}
      >
        <MenuItem
          sx={{
            color: theme.palette.text.link,
            "&:hover": { backgroundColor: theme.palette.background.default },
            "&:active": { color: theme.palette.primary.main },
          }}
          onClick={() => handleNavigation(`/blockchains/${slug}/dominance`)}
        >
          Blockchain Dominance
        </MenuItem>
        <MenuItem
          sx={{
            color: theme.palette.text.link,
            "&:hover": { backgroundColor: theme.palette.background.default },
            "&:active": { color: theme.palette.primary.main },
          }}
          onClick={() => handleNavigation(`/blockchains/${slug}/tvl`)}
        >
          Blockchain TVL
        </MenuItem>

        <MenuItem
          sx={{
            color: theme.palette.text.link,
            "&:hover": { backgroundColor: theme.palette.background.default },
            "&:active": { color: theme.palette.primary.main },
          }}
          divider
          onClick={() => handleNavigation(`/blockchains/${slug}/ratio`)}
        >
          Mktcap/Tvl Ratio
        </MenuItem>
        <MenuItem
          sx={{
            color: theme.palette.text.link,
            "&:hover": { backgroundColor: theme.palette.background.default },
            "&:active": { color: theme.palette.primary.main },
          }}
          onClick={() => handleNavigation(`/coins/${coinSlug}?route=blockchain`)}
        >
          Coin Profile
        </MenuItem>
        <MenuItem
          sx={{
            color: theme.palette.text.link,
            "&:hover": { backgroundColor: theme.palette.background.default },
            "&:active": { color: theme.palette.primary.main },
          }}
          onClick={() => handleNavigation(`/blockchains/${slug}/marketcap`)}
        >
          Marketcap
        </MenuItem>
      </Menu>
    </div>
  );
}
