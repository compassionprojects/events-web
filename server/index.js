// server.js

const express = require('express');
const next = require('next');
const { ApolloClient, gql, HttpLink } = require('apollo-boost');
const { InMemoryCache } = require('apollo-cache-inmemory');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 4000;

app.prepare().then(() => {
  const server = express();

  server.get('/auth', async (req, res) => {
    try {
      // Set token if validation succeeds
      await validateToken(req.query.token);
      res.cookie('token', req.query.token);
      res.redirect('/home');
    } catch (e) {
      res.clearCookie('token');
      res.redirect('/signin?fail=1');
      console.log(e);
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

function validateToken(token) {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.VIC_API_ROOT || 'http://localhost:3000/admin/api',
    }),
    cache: new InMemoryCache(),
  });

  return client.mutate({
    mutation: gql`
      mutation validateToken($token: String!) {
        validateToken(token: $token) {
          id
          expiresAt
          token
        }
      }
    `,
    variables: {
      token,
    },
  });
}
