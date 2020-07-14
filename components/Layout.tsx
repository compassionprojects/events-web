import React from 'react';
import PropTypes from 'prop-types';
import FooterLanding, { Footer } from './Footer';
import HeaderLanding, { Header } from './Header';
import GlobalStyles from './GlobalStyles';
import SkipLinks from './SkipLinks';

export default function Layout({ router, ...props }) {
  const isLanding = router.pathname === '/';
  return (
    <>
      <GlobalStyles />
      {isLanding && <SkipLinks />}
      {isLanding ? <HeaderLanding /> : <Header />}
      <main role="main" {...props} />
      {isLanding ? <FooterLanding /> : <Footer />}
    </>
  );
}

Layout.propTypes = {
  router: PropTypes.object,
};
