import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';

function VicApp({ Component, pageProps, router }: AppProps) {
  return (
    <Layout router={router}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default VicApp;
