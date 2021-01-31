import { Icon } from 'reflexjs';
import Link from 'next/link';

import BIO from '../assets/data/bio.yml';

export default function Home(): JSX.Element {
  return (
    <div>
      <section pt="6|8|12|20">
        <div variant="container">
          <div
            display="flex"
            flexDirection="column"
            textAlign="center"
            justifyContent="center"
          >
            <p color="primary" textTransform="uppercase" m="0">
              Hey, I'm
            </p>
            <h1 
              variant="heading.h1"
              fontWeight="bolder" 
              lineHeight="tight">
              {BIO.name}
            </h1>
            <div
              display="flex"
              alignItems="center"
              justifyContent="center"
              size="64|80"
              rounded="full"
              mb="4"
              mx="auto"
              bg="secondary"
              pt="2"
            >
              <picture>
                <source srcSet={BIO.social.gravatar + '?s=300'} media="(min-width: 640px)" />
                <img rounded="full" srcSet={BIO.social.gravatar + '?s=250'} alt={BIO.name} height="auto"/>
              </picture>
            </div>
            <p variant="text.lead" mt={2} pb={2} borderBottomWidth={1}>
            {BIO.bio}
            </p>
          </div>
          <div
            display="grid"
            gridAutoFlow="dense"
            col="1|1|2"
            gap="8|8|12"
            mt={8}>
            <div >
              <h3>Introduction</h3>
              {BIO.aboutMe.split('\n\n').map((p, index) => {
                return (
                  <p mb={3} key={index}>{p}</p>
                )
              })}
            </div>
            <div>
              <h3>Highlights</h3>
              <ul listStyle="disc" paddingInlineStart={4}>
              {BIO.highlights.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
              </ul>
            </div>
          </div>
          <div display="flex" justifyContent="center" gap="4" mt="6">
            <Link passHref href="/about">
              <a variant="button.primary.lg">
                About <Icon name="arrow-right" ml="2" size="4" />
              </a>
            </Link>            
            <a variant="button.outlineSecondary.lg" href="#">
              Projects
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}