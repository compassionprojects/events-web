import ApolloClient, { InMemoryCache } from 'apollo-boost';
import resolvers from './resolvers';

const API_URL =
  process.env.VIC_API_ROOT ||
  process.env.NEXT_PUBLIC_VIC_API_ROOT ||
  'http://localhost:3000/admin/api';

const apolloClient = new ApolloClient({
  uri: API_URL,
  credentials: 'include',
  resolvers,
  cache: new InMemoryCache(),
});

export default apolloClient;
