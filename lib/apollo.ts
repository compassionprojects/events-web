import ApolloClient, { InMemoryCache } from 'apollo-boost';
import resolvers from './resolvers';

const apolloClient = new ApolloClient({
  uri: '/admin/api',
  credentials: 'include',
  resolvers,
  cache: new InMemoryCache(),
});

export default apolloClient;
