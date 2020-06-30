import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class VicDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="/css/bootstrap.min.css" rel="stylesheet" />
        </Head>
        <body className="d-flex flex-column h-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default VicDocument;
