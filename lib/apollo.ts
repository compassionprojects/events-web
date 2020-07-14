import ApolloClient, { InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.VIC_API_ROOT || 'http://localhost:3000/admin/api',
});

export default client;
