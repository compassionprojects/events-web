import React, { useState } from 'react';
import {
  Button,
  Container,
  FormGroup,
  Label,
  Input,
  UncontrolledCollapse,
} from 'reactstrap';
import striptags from 'striptags';
import styled from 'styled-components';
import classnames from 'classnames';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown/with-html';
import moment from 'moment';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '../../../components/Loading';
import Icon from '../../../components/Icon';
import Meta from '../../../components/Meta';
import add_on from '../../../data/pricing';

const PUBLISHABLE_KEY =
  process.env.STRIPE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(PUBLISHABLE_KEY);

const GET_COURSE = gql`
  query course($id: ID!) {
    Course(where: { id: $id }) {
      id
      title
      description
      dateStart
      dateEnd
    }
    allPricings(where: { course: { id: $id } }) {
      id
      title
      price
      currency
      stripePriceId
    }
  }
`;

export default function Tickets() {
  const { query } = useRouter();
  const variables = { id: query.id };
  const { data, loading } = useQuery(GET_COURSE, {
    variables,
  });

  const [agreed, setAgreed] = useState(false);
  const [followup, setFollowup] = useState(false);

  if (loading) return <Loading />;

  const course = data.Course;
  const pricing = data.allPricings;

  if (!course) return null;

  const meta = {
    title: `Peace Factory presents ${course.title} - ${moment(
      course.dateStart
    ).format('Do MMM')} - ${moment(course.dateEnd).format(
      'Do MMM YYYY'
    )} - Get your ticket`,
    description: striptags(course.description),
    image_url: '/images/social-media-banner.png',
  };

  const handleClick = async (e, p) => {
    e.preventDefault();

    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;

    const data = [{ price: p.stripePriceId, quantity: 1 }];
    if (followup) {
      data.push({ price: add_on.price, quantity: p.peopleEquivalent || 1 });
    }

    // Call your backend to create the Checkout Session
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      alert(result.error.message);
    }
  };

  return (
    <>
      <Meta {...meta} />
      <Container className="py-5">
        <h1 className="my-3 text-center">Tickets</h1>
        <Intro className="py-3 text-center">
          Get your tickets for <strong>{course.title}</strong>.
          <ReactMarkdown
            source={course.description}
            escapeHtml={false}
          /> From {moment(course.dateStart).format('dddd D MMM')} until{' '}
          {moment(course.dateEnd).format('dddd D MMM YYYY')}
        </Intro>
        <TicketContainer>
          <div className="bg-light rounded p-3 my-3 lead border border-primary">
            <FormGroup check>
              <Label check className="d-flex align-items-top">
                <Check type="checkbox" onChange={() => setAgreed(!agreed)} />
                <div className="ml-2">
                  I agree to the{' '}
                  <a href="/terms" target="_blank">
                    terms and conditions{' '}
                    <Icon shape="external-link" width={16} height={16} />
                  </a>
                </div>
              </Label>
            </FormGroup>
          </div>
          <div className="bg-light rounded p-3 my-3 border">
            <FormGroup check>
              <Label check className="d-flex align-items-top">
                <Check
                  type="checkbox"
                  onChange={() => setFollowup(!followup)}
                />
                <div className="ml-2">
                  I would also like to buy the NVC follow up sessions with CNVC
                  certified trainers for <strong>{add_on.amount}€</strong>{' '}
                  <a id="followup-details" href="#">
                    Learn more <Icon shape="chevron-down" />
                  </a>
                  <UncontrolledCollapse toggler="#followup-details">
                    <div className="my-2 text-muted">{add_on.details}</div>
                  </UncontrolledCollapse>
                </div>
              </Label>
            </FormGroup>
          </div>
        </TicketContainer>
        <TicketContainer>
          {pricing.map((p, idx) => (
            <div
              className={classnames('py-4 d-flex align-items-center', {
                'border-top': idx,
              })}
              key={p.id}>
              {p.title}
              <div className="ml-auto pl-3 flex-shrink-0">
                <div className="d-flex align-items-center">
                  <div className="mr-2 text-right position-relative">
                    <h5 className="m-0">
                      <b>
                        {!followup
                          ? p.price
                          : p.price + (p.peopleEquivalent || 1) * add_on.amount}
                        €
                      </b>
                    </h5>
                    {followup && (
                      <Amount>
                        {p.price}€ +{' '}
                        {(p.peopleEquivalent || 1) > 1 &&
                          (p.peopleEquivalent || 1) + '*'}{' '}
                        {add_on.amount}€
                      </Amount>
                    )}
                  </div>
                  <Button
                    color={agreed ? 'primary' : 'secondary'}
                    disabled={!agreed}
                    className="rounded-pill px-4"
                    onClick={(e) => handleClick(e, p)}>
                    Buy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </TicketContainer>
      </Container>
    </>
  );
}

const TicketContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Intro = styled.p`
  max-width: 600px;
  margin: 0 auto;
`;

const Check = styled(Input)`
  height: 20px;
  width: 20px;
  margin-top: 0.3rem;
`;

const Amount = styled.small.attrs({
  className: 'text-muted position-absolute',
})`
  right: 0;
  width: 120px;
`;
