import { Footer, Header, Sidebar } from "@app/_components/layout";
import { clippedUnderHeaderLayoutConfig } from "@app/_config/layouts/layout2";
import { getMenus } from "@app/_services";
import { JumboLayout, JumboLayoutProvider } from "@jumbo/components";

export const metadata = {
  title: "TokenClan.io | Home to Empowering Investors with Crypto Finance Data",
  description:
    "We are on the mission to publicise cryptocurrency data that help investors make guided decisions for their financial future.",
  generator: "NextJS",
  applicationName: "TokenClan-V2",
  keywords: [
    "tokenclan",
    "flagone",
    "cryptocurrency",
    "exchanges",
    "tvev ratio",
    "blockchain",
    "web3",
    "crypto data",
  ],
  authors: [{ name: "Warren Seah" }, { name: "Charlie Ng" }],
  creator: "Warren Seah",
  publisher: "Flag One Pte Ltd",
};

export default async function CommonLayout({ children, params: { lang } }) {
  const menus = await getMenus(lang);
  return (
    <JumboLayoutProvider layoutConfig={clippedUnderHeaderLayoutConfig}>
      <JumboLayout
        header={<Header />}
        footer={<Footer lang={lang} />}
        sidebar={<Sidebar menus={menus} />}
      >
        {children}
      </JumboLayout>
    </JumboLayoutProvider>
  );
}