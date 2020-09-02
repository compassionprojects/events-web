import React from 'react';
import Head from 'next/head';
import { Container } from 'reactstrap';
import ReactMarkdown from 'react-markdown/with-html';
import Meta from '../components/Meta';
import data from '../data';

const meta = {
  title: 'Payment successful',
};

export default function PaymentSuccess() {
  return (
    <>
      <Meta {...meta} />
      <Head>
        <meta name="robots" content="nofollow, noindex" />
      </Head>
      <Container className="py-5">
        <h1 className="my-4">{meta.title}</h1>
        <ReactMarkdown source={data.payment_thank_you} escapeHtml={false} />
      </Container>
    </>
  );
}
