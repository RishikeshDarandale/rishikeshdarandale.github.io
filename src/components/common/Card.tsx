import React, { FunctionComponent } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string,
  text: string,
  image: {
    src: string,
    alt: string,
  }
};

export const Card: FunctionComponent<CardProps> = ({ heading, text, image, ...props }) => {
  return (
    <div borderWidth="1" rounded="lg" p="6" {...props}>
      {image && <img w="full" mb="4" rounded="md" {...image} />}
      <h4 variant="heading.h4">{heading}</h4>
      {text && (
        <p variant="text.paragraph text.sm" mt="1">
          {text}
        </p>
      )}
    </div>
  );
}
