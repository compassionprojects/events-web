import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import client from './apollo';
import removeAuthToken from '../lib/removeAuthToken';

const GET_USER_BY_TOKEN = gql`
  query findUserByToken($token: ID!) {
    allAuthTokens(
      where: { token: $token, valid: true }
      sortBy: expiresAt_DESC
    ) {
      id
      expired
      expiresAt
      user {
        id
        email
        name
      }
    }
  }
`;

export default function useAuth(token) {
  const router = useRouter();
  const { error, loading, data } = useQuery(GET_USER_BY_TOKEN, {
    variables: { token },
    client,
  });

  const signOut = (e) => {
    e.preventDefault();
    removeAuthToken();
    router.push('/');
  };

  if (loading) {
    return { user: null, authenticating: loading, signOut };
  } else if (error && !loading) {
    return { user: null, authenticating: loading, error, signOut };
  } else if (!error && !loading && data) {
    const [authToken] = data.allAuthTokens;
    const { expired } = authToken;
    if (expired) {
      removeAuthToken();
      return { user: null, authenticating: false, signOut };
    }
    return { user: authToken.user, authenticating: false, signOut };
  } else {
    return { user: null, authenticating: loading, error, signOut };
  }
}
