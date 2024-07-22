import { footerTheme } from '@app/_themes/footer/default';
import { headerTheme } from '@app/_themes/header/default';
import { mainTheme } from '@app/_themes/main/default';
import { sidebarTheme } from '@app/_themes/sidebar/default';
import { createJumboTheme } from '@jumbo/utilities/helpers';
import { anonymousPaths, publicPaths } from './routes/path';

export const CONFIG = {
  THEME: createJumboTheme(mainTheme, headerTheme, sidebarTheme, footerTheme),
  PUBLIC_ROUTES: publicPaths,
  ANONYMOUS_ROUTES: anonymousPaths,
  DISABLE_PROTECTED_ROUTE_CHECK: false,
};
