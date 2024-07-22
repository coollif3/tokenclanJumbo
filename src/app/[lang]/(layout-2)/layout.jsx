import { Footer, Header, Sidebar } from '@app/_components/layout';
import { clippedUnderHeaderLayoutConfig } from '@app/_config/layouts/layout2';
import { getMenus } from '@app/_services';
import { JumboLayout, JumboLayoutProvider } from '@jumbo/components';

export default async function ClippedUnderHeaderLayout({
  children,
  params: { lang },
}) {
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
