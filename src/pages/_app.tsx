import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from 'reflexjs';
import theme from '../theme/default';

import BaseLayout from '../components/layout/BaseLayout';

import BIO from '../assets/data/bio.yml';

// @Read: https://nextjs.org/docs/advanced-features/custom-app
export default function MyPersonalSpace({
  Component,
  pageProps,
}: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{BIO.name}</title>
        <meta
          name="viewport"
          content='"width=device-width,height=device-height"'
          key="viewport"
        />
      </Head>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  );
}
