import React from 'react';
import PropTypes from 'prop-types';
import FooterLanding, { Footer } from './Footer';
import HeaderLanding, { Header } from './Header';
import GlobalStyles from './GlobalStyles';
import SkipLinks from './SkipLinks';

export default function Layout({ router, ...props }) {
  const isLanding = router.pathname === '/';

  return (
    <div className="d-flex flex-column h-100">
      <GlobalStyles />
      {isLanding && <SkipLinks />}
      {isLanding ? <HeaderLanding /> : <Header />}
      <main className="flex-shrink-0" role="main" {...props} />
      {isLanding ? <FooterLanding /> : <Footer />}
    </div>
  );
}

Layout.propTypes = {
  router: PropTypes.object,
};
