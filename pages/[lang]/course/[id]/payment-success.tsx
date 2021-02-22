import React, { useEffect } from 'react';
import Head from 'next/head';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Container } from 'reactstrap';
import ReactMarkdown from 'react-markdown/with-html';
import Stripe from 'stripe';
import Meta from 'components/Meta';
import data from 'data/landing';
import PropTypes from 'prop-types';

const meta = {
  title: 'Payment successful',
};

const CREATE_ORDER = gql`
  mutation createOrder(
    $stripeSessionId: String!
    $stripeCustomerEmail: String!
    $stripeCustomerId: String!
    $courseId: ID!
  ) {
    createOrder(
      data: {
        stripeSessionId: $stripeSessionId
        stripeCustomerEmail: $stripeCustomerEmail
        stripeCustomerId: $stripeCustomerId
        course: { connect: { id: $courseId } }
      }
    ) {
      id
      stripeCustomerEmail
    }
  }
`;

export default function PaymentSuccess({ customer }) {
  const text = data.payment_thank_you.replace('{{email_id}}', customer.email);
  const { query } = useRouter();
  const [create] = useMutation(CREATE_ORDER);
  useEffect(() => {
    create({
      variables: {
        stripeSessionId: query.session_id,
        stripeCustomerEmail: customer.email,
        stripeCustomerId: customer.id,
        courseId: query.course_id,
      },
    });
  }, [query.session_id]);
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
