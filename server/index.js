// server.js

const express = require('express');
const next = require('next');
// const { ApolloClient, gql, HttpLink } = require('apollo-boost');
// const { InMemoryCache } = require('apollo-cache-inmemory');
const fetch = require('node-fetch');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 4000;

app.prepare().then(() => {
  const server = express();

  server.get('/auth', async (req, res) => {
    try {
      // Set token if validation succeeds
      const session = await validateToken(req.query.token);
      console.log(session);
      res.setHeader('Set-Cookie', session);
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
