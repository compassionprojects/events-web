import React, { useState } from 'react';
import { Button, Container, FormGroup, Label, Input } from 'reactstrap';
import striptags from 'striptags';
import styled from 'styled-components';
import classnames from 'classnames';
import { loadStripe } from '@stripe/stripe-js';
import Meta from '../components/Meta';
import data from '../data';

const PUBLISHABLE_KEY =
  process.env.STRIPE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(PUBLISHABLE_KEY);

const meta = {
  title:
    'Peace Factory presents Nonviolent Communication Virtual Intensive Course 2020 - Friday, 13 November 2020 | Sunday, 22 November 2020 - Get your ticket',
  description: striptags(data.mission_description),
  image_url: '/images/social-media-banner.png',
};

export default function Tickets() {
  const [agreed, setAgreed] = useState(false);
  const handleClick = async (e, p) => {
    e.preventDefault();

    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: p.price }),
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
          Join our ground-breaking way to engage in learning{' '}
          <strong>Nonviolent Communication</strong> - an 8 day Virtual Intensive
          Course (VIC) from November 13th - 22nd, 2020
        </Intro>
        <TicketContainer>
          <div className="bg-light rounded p-3 my-3 lead border border-primary">
            <FormGroup check>
              <Label check>
                <Check type="checkbox" onChange={() => setAgreed(!agreed)} />{' '}
                &nbsp;&nbsp; I agree to the{' '}
                <a href="/terms" target="_blank">
                  terms and conditions
                </a>
              </Label>
            </FormGroup>
          </div>
        </TicketContainer>
        <TicketContainer>
          {data.tickets.map((p, idx) => (
            <div
              className={classnames('py-4 d-flex align-items-center', {
                'border-top': idx,
              })}
              key={p.price}>
              {p.description}
              <div className="ml-auto pl-3 flex-shrink-0">
                <b>{p.amount}€</b> &nbsp;
                <Button
                  color={agreed ? 'primary' : 'secondary'}
                  disabled={!agreed}
                  className="rounded-pill px-4"
                  onClick={(e) => handleClick(e, p)}>
                  Buy
                </Button>
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
`;
