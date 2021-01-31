import { FunctionComponent, ReactNode } from 'react';

import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

interface BaseLayoutProps {
  children: ReactNode;
};

const BaseLayout: FunctionComponent<BaseLayoutProps> = (props: BaseLayoutProps) => {
  return (
    <div
        display='flex'
        flexDirection='column'
        minHeight='100vh'>
      <div 
        p="3"
        position="sticky"
        top="0"
        backgroundColor="background"
        borderBottomWidth={2}>
        <Header
          branding={{
            name: "Rishikesh Darandale",
          }}
          links={[
            {
              title: "About",
              href: "#",
            },
            {
              title: "Blog",
              href: "#",
            },
          ]}
          />
      </div>
      <div flex='1 1 auto' p="3">
        <main>
          {props.children}
        </main>
      </div>
      <div p="3">
      <Footer
        iconLinks={[
          {
            title: "Follow on Github",
            href: "https://github.com/RishikeshDarandale",
            name: "github",
          },
          {
            title: "Follow on stackoverflow",
            href: "https://stackoverflow.com/users/8101556/rishikesh-darandale",
            name: "stackoverflow",
          },
          {
            title: "Follow on Twitter",
            href: "https://twitter.com/RishiDarandale",
            name: "twitter",
          },
          {
            title: "Follow on LinkedIn",
            href: "https://github.com/RishikeshDarandale",
            name: "linkedin",
          },
        ]}
        copyright={`Copyright © ${new Date().getFullYear()} Rishikesh Darandale.`}
      />
      </div>
    </div>
  )  
} 

export default BaseLayout;