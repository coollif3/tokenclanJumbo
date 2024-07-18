"use client";
import { AuthUserPopover } from "@app/_components/popovers/AuthUserPopover";
import { MessagesPopover } from "@app/_components/popovers/MessagesPopover";
import { NotificationsPopover } from "@app/_components/popovers/NotificationsPopover";
import { DropDownPopover } from "@app/_components/popovers/DropDownPopover";
import { useSidebarState } from "@jumbo/components/JumboLayout/hooks";
import { useJumboHeaderTheme } from "@jumbo/components/JumboTheme/hooks";

import { SIDEBAR_STYLES } from "@jumbo/utilities/constants";

import { Logo } from "@app/_components/_core/Logo";
import { SidebarToggleButton } from "@app/_components/_core/SidebarToggleButton";
import { TranslationPopover } from "@app/_components/popovers/TranslationPopover";
import { Stack, Link } from "@mui/material";
import React from "react";
import { Search, SearchIconButtonOnSmallScreen } from "./components";
import { ThemeModeOption } from "./components/ThemeModeOptions";

function Header() {
  const { isSidebarStyle } = useSidebarState();

  const [searchVisibility, setSearchVisibility] = React.useState(false);
  const { headerTheme } = useJumboHeaderTheme();

  const handleSearchVisibility = React.useCallback((value: boolean) => {
    setSearchVisibility(value);
  }, []);

  return (
    <React.Fragment>
      <SidebarToggleButton />
      {isSidebarStyle(SIDEBAR_STYLES.CLIPPED_UNDER_HEADER) && (
        <Link href="/" sx={{ my: 0 }} color="inherit" underline="none">
          <Logo sx={{ mr: 3 }} mode={headerTheme.type ?? "light"} />
        </Link>
      )}
      {/* <Search show={searchVisibility} onClose={handleSearchVisibility} /> */}
      <Stack direction="row" alignItems="center" gap={1.25} sx={{ ml: "auto" }}>
        {/* {/* <ThemeModeOption /> */}
        {/* <TranslationPopover /> */}
        {/* <SearchIconButtonOnSmallScreen onClick={handleSearchVisibility} /> */}
        {/* <MessagesPopover /> */}
        {/* <NotificationsPopover /> */}
        <DropDownPopover />
        {/* <AuthUserPopover /> */}
      </Stack>
    </React.Fragment>
  );
}

export { Header };
