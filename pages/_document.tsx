import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class VicDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const skipCls = 'sr-only sr-only-focusable';
    return (
      <Html lang="en">
        <Head>
          <link href="/css/bootstrap.min.css" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/images/favicon.png" />
        </Head>
        <body>
          <div id="top"></div>
          <a className={skipCls} href="#about">
            Skip to about
          </a>
          <a className={skipCls} href="#course">
            Skip to course
          </a>
          <a className={skipCls} href="#language">
            Skip to course language
          </a>
          <a className={skipCls} href="#what-to-expect">
            Skip to what to expect from the course
          </a>
          <a className={skipCls} href="#what-you-need">
            Skip to what you need to attend the course
          </a>
          <a className={skipCls} href="#course-content">
            Skip to course content
          </a>
          <a className={skipCls} href="#fee">
            Skip to participation fee
          </a>
          <a className={skipCls} href="#trainers">
            Skip to trainers
          </a>
          <a className={skipCls} href="#faq">
            Skip to frequently asked questions
          </a>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default VicDocument;
