"use client";
import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { useSearchParams } from 'next/navigation';

export default function BlockChainSlugData({ slugData }) {
  const { theme } = useJumboTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedSlug, setSelectedSlug] = useState(''); 
  const searchParams = useSearchParams();
  const compareTo = searchParams.get('compareTo');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const handleNavigation = (path,Slug) => {
    handleClose();
    router.push(path);
    setSelectedSlug(Slug)
  };

  useEffect(() => {
    if(compareTo !== null){
        setSelectedSlug(compareTo)
    }
  })

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
        {selectedSlug ? selectedSlug : 'Compare Slug'}
      </Button>
      <Menu
        id="blockchain-submenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "bcSubmenu-button",
        }}
        slotProps={{
            paper: {
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch',
              },
            },
          }}
      >
        {slugData.map((item, index) => (
        <MenuItem
          key={index}
          sx={{
            color: theme.palette.text.link,
            "&:hover": { backgroundColor: theme.palette.background.default },
            "&:active": { color: theme.palette.primary.main },
          }}
          onClick={() => handleNavigation(`?compareTo=${item.name}`,item.name)}
        >
          {item.name}
        </MenuItem>
      ))}
      </Menu>
    </div>
  );
}
