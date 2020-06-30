import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';

function VicApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default VicApp;
