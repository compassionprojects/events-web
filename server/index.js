require('dotenv').config();

// server.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const next = require('next');
const fetch = require('node-fetch');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const localeParser = require('accept-language-parser');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { subscribe_api_endpoint } = require('./newsletter');
const HOST = process.env.HOST_URL;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 4000;

app.prepare().then(() => {
  const server = express();

  server.use(helmet());
  server.use(cookieParser());
  server.use(
    '/admin/api',
    createProxyMiddleware({
      target: process.env.VIC_API_HOST,
      logLevel: 'debug',
      changeOrigin: true,
    })
  );

  server.use(bodyParser.json());

  server.post('/create-checkout-session', async (req, res) => {
    const lang = getLang(req);
    const { course_id } = req.query;
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'required',
      allow_promotion_codes: true,
      payment_method_types: ['card', 'ideal'],
      line_items: req.body,
      mode: 'payment',
      success_url: `${HOST}/${lang}/course/${course_id}/payment-success?session_id={CHECKOUT_SESSION_ID}&course_id=${course_id}`,
      cancel_url: `${HOST}/${lang}/course/${course_id}/tickets`,
    });

    res.json({ id: session.id });
  });

  server.get('/', (req, res) => {
    const lang = getLang(req);
    res.redirect(`/${lang}`);
  });

  server.get('/auth', async (req, res) => {
    const { lang } = req.query;
    try {
      // Set token if validation succeeds
      const session = await validateToken(req.query.token);
      res.setHeader('Set-Cookie', session);
      res.redirect(`/${lang}/home`);
    } catch (e) {
      res.clearCookie('keystone.sid');
      res.redirect(`/${lang}/signin?fail=1`);
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

  server.post('/newsletter', subscribe_api_endpoint);

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

function getLang(req) {
  const [browserLang] = localeParser.parse(req.headers['accept-language']);
  const locale = req.cookies['locale'];
  // use en as default locale
  const lang = ['en', 'fr'].includes(browserLang.code)
    ? browserLang.code
    : 'en';
  return locale || lang;
}
