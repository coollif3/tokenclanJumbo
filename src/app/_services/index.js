import { getMenus as getMenuItems } from '@app/_utilities/constants/menu-items';
  async function getMenus(locale) {
  // const res = await fetch('http://localhost:3000/api/menus/' + locale);
  // // The return value is *not* serialized
  // // You can return Date, Map, Set, etc.
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }
    return getMenuItems(locale);
  // return res.json();
}

export { getMenus };
