import { getDictionary } from '@app/[lang]/dictionaries';

export async function getMenus(locale) {
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
        {
          path: `/${locale}/coins`,
          label: sidebar.menuItem.coins,
          icon: "coins",
        },
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
          path: `/${locale}/vault`,
          label: sidebar.menuItem.vault,
          icon: "vault",
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
}
