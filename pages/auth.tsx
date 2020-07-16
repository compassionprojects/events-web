import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
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

export default (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    let user = null;
    const { error, loading, data } = useQuery(GET_USER_BY_TOKEN, {
      variables: {
        token: props.token,
      },
    });

    if (loading) return <div>Loading...</div>;
    else if (error) {
      console.log(error);
      router.push('/signin?fail=1');
      return null;
    } else if (data) {
      const [authToken] = data.allAuthTokens;
      const { expired } = authToken;
      if (expired) {
        removeAuthToken();
        router.push('/signin?expired=1');
        return null;
      }
      user = authToken.user;
    }

    return <Component {...props} user={user} />;
  };

  Auth.getInitialProps = async (ctx) => {
    const { token } = cookies(ctx);
    return { token };
  };

  Auth.propTypes = {
    token: PropTypes.string,
  };

  return Auth;
};
