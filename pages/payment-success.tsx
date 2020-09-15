import React from 'react';
import Head from 'next/head';
import { Container } from 'reactstrap';
import ReactMarkdown from 'react-markdown/with-html';
import Stripe from 'stripe';
import Meta from '../components/Meta';
import data from '../data/landing';
import PropTypes from 'prop-types';

const meta = {
  title: 'Payment successful',
};

export default function PaymentSuccess({ customer }) {
  const text = data.payment_thank_you.replace('{{email_id}}', customer.email);
  return (
    <>
      <Meta {...meta} />
      <Head>
        <meta name="robots" content="nofollow, noindex" />
      </Head>
      <Container className="py-5">
        <h1 className="my-4">{meta.title}</h1>
        <ReactMarkdown source={text} escapeHtml={false} />
      </Container>
    </>
  );
}

PaymentSuccess.getInitialProps = async function ({ query }) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: null,
  });
  const session = await stripe.checkout.sessions.retrieve(query.session_id);
  const customer = await stripe.customers.retrieve(session.customer.toString());
  return { customer };
};

PaymentSuccess.propTypes = {
  customer: PropTypes.object,
};
