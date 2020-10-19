import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import client from './apollo';
import logout from './logout';

const GET_AUTHED_USER = gql`
  query authenticatedUser {
    authenticatedUser {
      id
      email
      name
      courses {
        id
        title
        description
        dateStart
        dateEnd
      }
    }
  }
`;

export default function useAuth() {
  const { error, loading, data } = useQuery(GET_AUTHED_USER, {
    client,
  });

  const signOut = (e) => {
    e.preventDefault();
    logout();
  };

  if (loading) {
    return { user: null, authenticating: loading, signOut };
  } else if (error && !loading) {
    return { user: null, authenticating: loading, error, signOut };
  } else if (!error && !loading && data) {
    const user = data.authenticatedUser;
    if (!user) {
      return { user: null, authenticating: false, signOut };
    }
    return { user, authenticating: false, signOut };
  } else {
    return { user: null, authenticating: loading, error, signOut };
  }
}
