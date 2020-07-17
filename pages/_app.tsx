import React, { useMemo } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import apollo from '../lib/apollo';
import PropTypes from 'prop-types';
import cookies from 'next-cookies';
import Layout from '../components/Layout';
import { UserContext } from '../lib/UserContext';
import useAuth from '../lib/useAuth';

function VicApp({ Component, pageProps, router, token }) {
  const { user, authenticating, signOut } = useAuth(token);
  const value = useMemo(() => ({ user, authenticating, signOut }), [
    user,
    authenticating,
    signOut,
  ]);

  return (
    <ApolloProvider client={apollo}>
      <UserContext.Provider value={value}>
        <Layout router={router} token={token}>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

VicApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ...ctx });
  }
  const { token } = cookies(ctx);

  return { pageProps, token };
};

VicApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  router: PropTypes.object,
  token: PropTypes.string,
};

export default VicApp;
