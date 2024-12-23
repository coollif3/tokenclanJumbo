import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { AppSnackbar } from "@app/_components/_core";
import { CONFIG } from "@app/_config";
import "@app/_themes/assets/fonts/noir-pro/styles.css";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import "@app/_utilities/style/style.css";
import {
  JumboConfigProvider,
  JumboDialog,
  JumboDialogProvider,
  JumboTheme,
} from "@jumbo/components";
import { CssBaseline } from "@mui/material";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";
import Loading from "./(common)/loading";

export async function generateStaticParams() {
  return [{ lang: "en-US" }];
}
export const metadata = {
  title: "Jumbo - Admin Dashboard",
  icons: `${ASSET_IMAGES}/favicon.ico`,
};

export default async function RootLayout({ children, params: { lang } }) {
  return (
    <html lang={lang} data-lt-installed="true">
      <body cz-shortcut-listen="true">
        <div id="root">
          <AppRouterCacheProvider>
            <JumboConfigProvider LinkComponent={Link}>
              <JumboTheme init={CONFIG.THEME}>
                <GoogleAnalytics gaId={process.env.GA_ANALYTICS} />
                <CssBaseline />
                <JumboDialogProvider>
                  <JumboDialog />
                  <AppSnackbar>
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                  </AppSnackbar>
                </JumboDialogProvider>
              </JumboTheme>
            </JumboConfigProvider>
          </AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
}
