import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
 
import { CONFIG } from '@app/_config';
import '@app/_themes/assets/fonts/noir-pro/styles.css';
import '@app/_utilities/style/style.css';
import { JumboConfigProvider, JumboTheme } from '@jumbo/components';
import { CssBaseline } from '@mui/material';
import Link from 'next/link';

export async function generateStaticParams() {
  return [{ lang: 'en-US' }];
}
export const metadata = {
  title: 'Jumbo - Admin Dashboard',
  icons: '/assets/images/favicon.ico',
};

export default async function RootLayout({ children, params: { lang } }) {
  return ( 
    <html lang={lang}>
      <body>
        <div id='root'>
          <AppRouterCacheProvider>
            <JumboConfigProvider LinkComponent={Link}>
              <JumboTheme init={CONFIG.THEME}>
                <CssBaseline />
                {children}
              </JumboTheme>
            </JumboConfigProvider>
          </AppRouterCacheProvider>
        </div>
      </body>
    </html> 
  );
}
