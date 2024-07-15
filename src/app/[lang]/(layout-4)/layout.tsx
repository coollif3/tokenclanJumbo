import { Footer, Header, Sidebar } from '@app/_components/layout';
import { miniLayoutConfig } from '@app/_config/layouts/layout4';
import { getMenus } from '@app/_services';
import { JumboLayout, JumboLayoutProvider } from '@jumbo/components';
import { MenuItems } from '@jumbo/types';
import React from 'react';

interface CommonLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default async function MiniLayout({
  children,
  params: { lang },
}: CommonLayoutProps) {
  const menus: MenuItems = await getMenus(lang);
  return (
    <JumboLayoutProvider layoutConfig={miniLayoutConfig}>
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
