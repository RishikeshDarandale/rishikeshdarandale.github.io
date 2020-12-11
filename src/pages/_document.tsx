import Document, { Html, Head, Main, NextScript } from 'next/document';
import { InitializeColorMode } from "reflexjs";

// @Read: https://nextjs.org/docs/advanced-features/custom-document
class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
