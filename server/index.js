// server.js

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { ApolloClient, gql, HttpLink } = require('apollo-boost');
const { InMemoryCache } = require('apollo-cache-inmemory');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 4000;

app.prepare().then(() => {
  createServer(async (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // set auth token cookie
    if (pathname === '/auth' && query.token) {
      try {
        // Set token if validation succeeds
        await validateToken(query.token);
        res.setHeader('Set-Cookie', [`token=${query.token}`]);
        // @todo
        // redirect to home
        // authenticate the components
      } catch (e) {
        console.log(e);
      }
    }

    handle(req, res, parsedUrl);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
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
        }
      }
    `,
    variables: {
      token,
    },
  });
}
