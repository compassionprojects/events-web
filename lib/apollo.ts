import ApolloClient, { InMemoryCache } from 'apollo-boost';
import resolvers from './resolvers';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri:
    process.env.VIC_API_ROOT ||
    process.env.NEXT_PUBLIC_VIC_API_ROOT ||
    'http://localhost:3000/admin/api',
  resolvers,
});

export default client;
