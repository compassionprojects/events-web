require('dotenv').config();

// server.js

const express = require('express');
const next = require('next');
const fetch = require('node-fetch');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const HOST = process.env.HOST_URL;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 4000;
const domain = dev ? 'localhost' : 'peacefactory.fr';

app.prepare().then(() => {
  const server = express();

  server.use(helmet());
  server.use(bodyParser.json());

  server.post('/create-checkout-session', async (req, res) => {
    const { course_id } = req.query;
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'required',
      allow_promotion_codes: true,
      payment_method_types: ['card', 'ideal' /* 'sepa_debit', */],
      line_items: req.body,
      mode: 'payment',
      success_url: `${HOST}/course/${course_id}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${HOST}/course/${course_id}/tickets`,
    });

    res.json({ id: session.id });
  });

  server.get('/auth', async (req, res) => {
    try {
      // Set token if validation succeeds
      const session = await validateToken(req.query.token);
      res.setHeader('Set-Cookie', `${session}; Domain=${domain}`);
      res.redirect('/home');
    } catch (e) {
      res.clearCookie('keystone.sid');
      res.redirect('/signin?fail=1');
      console.log(e);
    }
  });

  server.get('/logout', (req, res) => {
    // @todo perhaps end session on the server side as well?
    // either run unauthenticateUser or create an endpoint that runs
    // sessionManager.endAuthedSession()
    res.clearCookie('keystone.sid');
    res.redirect('/');
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

async function validateToken(token) {
  const host = process.env.VIC_API_HOST || 'http://localhost:3000';
  const response = await fetch(
    `${host}/auth/magiclink/callback?token=${token}`,
    {
      header: {
        Accept: 'application/json',
      },
    }
  );

  if (response.status !== 200) throw new Error('Invalid token');
  return response.headers.get('set-cookie');
}
