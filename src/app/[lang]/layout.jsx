import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { CONFIG } from "@app/_config";
import "@app/_themes/assets/fonts/noir-pro/styles.css";
import "@app/_utilities/style/style.css";
import { JumboConfigProvider, JumboTheme } from "@jumbo/components";
import { CssBaseline } from "@mui/material";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";
import Loading from "./(common)/loading";

export async function generateStaticParams() {
  return [{ lang: "en-US" }];
}
export const metadata = {
  icons: "/assets/images/favicon.ico",
};

export default async function RootLayout({ children, params: { lang } }) {
  return (
    <html lang={lang}>
      <body>
        <div id="root">
          <AppRouterCacheProvider>
            <JumboConfigProvider LinkComponent={Link}>
              <JumboTheme init={CONFIG.THEME}>
                <GoogleAnalytics gaId={process.env.GA_ANALYTICS} />
                <CssBaseline />
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </JumboTheme>
            </JumboConfigProvider>
          </AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
}
