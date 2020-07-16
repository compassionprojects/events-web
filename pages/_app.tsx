import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import apollo from '../lib/apollo';
import Layout from '../components/Layout';

class VicApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Layout router={router}>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }
}

export default VicApp;
