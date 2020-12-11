import React, { FunctionComponent } from 'react';

import { Icon, VisuallyHidden } from 'reflexjs';

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  copyright: string,
  iconLinks: Array<{
    href: string,
    name: string,
    title: string,
  }>,
};

export const Footer: FunctionComponent<FooterProps> = ({copyright, iconLinks, ...props}) => {

  return (
    <section {...props}>
      <div variant="container">
        {copyright && (
          <div
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            borderTopWidth={1}
            textAlign="center"
            pt="4|5|6"
            mt="4|5|6">
            <p variant="text.xs" my="0">
              {copyright}
            </p>
            {iconLinks?.length && (
              <div 
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                {iconLinks.map((iconLink, index) => (
                  <a key={index} href={iconLink.href} color="text" mx="1">
                    <Icon name={iconLink.name} size={6} />
                    <VisuallyHidden>{iconLink.title}</VisuallyHidden>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        <div borderTopWidth={1} textAlign="center" pt="4|5|6" mt="4|5|6">
          <p variant="text.xs" my="0">
            Built with <Icon color="red" name="heart" size="3" /> using <a variant="text.link" href="https://nextjs.org/">next.js</a> and <a variant="text.link" href="https://reflexjs.org/">reflex.js</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
export default function Block({
  name,
  copyright,
  links,
  iconLinks,
  children,
  ...props
}) {
  
}
