import { CONFIG } from '@app/_config';
import { match } from 'path-to-regexp';

function matchPathname(pathArray, pathname, locale) {
  return pathArray.some((path) => {
    const pathMatcher = match(locale ? `/${locale}${path}` : path, {
      decode: decodeURIComponent,
    });
    console.log(locale ? `/${locale}${path}` : path, pathname);
    return pathMatcher(pathname);
  });
}

export function isPublicPath(pathname, locale) {
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/')
  ) {
    return true;
  }

  return matchPathname(CONFIG.PUBLIC_ROUTES, pathname, locale);
}

export function isAnonymousPath(pathname, locale) {
  return matchPathname(CONFIG.ANONYMOUS_ROUTES, pathname, locale);
}
