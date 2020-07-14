import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import apollo from '../lib/apollo';
import Layout from '../components/Layout';

function VicApp({ Component, pageProps, router }: AppProps) {
  return (
    <ApolloProvider client={apollo}>
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default VicApp;
