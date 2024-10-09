import { getDictionary } from "@app/[lang]/dictionaries";

async function getMenus(locale: string) {
  const dictionary = await getDictionary(locale);
  const { sidebar, widgets } = dictionary;

  const menuItems = [
    {
      label: sidebar.menu.chart,
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
        // {
        //   path: `/${locale}/coins`,
        //   label: sidebar.menuItem.coins,
        //   icon: "coins",
        // },
      ],
    },
    {
      label: sidebar.menu.main,
      children: [
        {
          path: `/${locale}/tvev`,
          label: sidebar.menuItem.tvevRatio,
          icon: "tvevRatio",
        },
        {
          path: `/${locale}/disclaimer`,
          label: sidebar.menuItem.disclaimer,
          icon: "disclaimer",
        },
        {
          path: `/${locale}/privacy`,
          label: sidebar.menuItem.privacy,
          icon: "privacy",
        },
        {
          path: `/${locale}/terms`,
          label: sidebar.menuItem.terms,
          icon: "terms",
        },
        {
          path: `https://support.tokenclan.io`,
          label: sidebar.menuItem.contact,
          icon: "contact",
        },
      ],
    },
  ];

  return { menuItems, widgets };

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
