import { MenuItem } from "@mui/material";
import { getDictionary } from "@app/[lang]/dictionaries";

async function getMenus(locale: string) {
  const dictionary = await getDictionary(locale);
  const { sidebar } = dictionary;

  const menuItems = [
    {
      label: sidebar.menu.main,
      children: [
        {
          path: `/${locale}/blockchains`,
          label: sidebar.menuItem.blockchains,
          icon: "blockchains",
        },
        {
          path: `/${locale}/exchanges`,
          label: sidebar.menuItem.exchanges,
          icon: "exchanges",
        },
      ],
    },
  ];

  return menuItems;

  // const res = await fetch('http://localhost:3000/api/menus/'+locale);
  // // The return value is *not* serialized
  // // You can return Date, Map, Set, etc.
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }

  // return res.json();
}

export { getMenus };
