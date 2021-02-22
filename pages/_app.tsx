import React, { useMemo } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import apolloClient from 'lib/apollo';
import PropTypes from 'prop-types';
// import cookies from 'next-cookies';
import Layout from 'components/Layout';
import { UserContext } from 'lib/UserContext';
import useAuth from 'lib/useAuth';
import theme from 'lib/theme';
import { isLocale } from 'translations/types';
import { LocaleProvider } from 'context/LocaleContext';

function VicApp({ Component, pageProps, router, locale }) {
  const { user, authenticating, error, signOut } = useAuth();
  const value = useMemo(() => ({ user, authenticating, error, signOut }), [
    user,
    authenticating,
    error,
    signOut,
  ]);

  return (
    <ApolloProvider client={apolloClient}>
      <UserContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <LocaleProvider lang={locale}>
            <Layout router={router}>
              <Component {...pageProps} />
            </Layout>
          </LocaleProvider>
        </ThemeProvider>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

VicApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ...ctx });
  }
  if (typeof ctx.query.lang !== 'string' || !isLocale(ctx.query.lang)) {
    return { pageProps, locale: undefined };
  }

  return { pageProps, locale: ctx.query.lang };
};

VicApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  router: PropTypes.object,
  locale: PropTypes.string,
};

export default VicApp;
