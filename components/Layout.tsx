import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import FooterLanding, { Footer } from './Footer';
import HeaderLanding, { Header } from './Header';
import GlobalStyles from './GlobalStyles';
import SkipLinks from './SkipLinks';
import Nav from './Nav';
import { UserContext } from '../lib/UserContext';

export default function Layout({ router, ...props }) {
  const activePath = router.pathname;
  const isLanding = activePath === '/';
  const { user } = useContext(UserContext);
  const onecol =
    (user && isLanding) || (!user && !isLanding) || (!user && isLanding);

  return (
    <div className="d-flex flex-column h-100">
      <GlobalStyles />
      {isLanding && <SkipLinks />}
      {isLanding ? <HeaderLanding /> : <Header />}
      {onecol && <main className="flex-shrink-0" role="main" {...props} />}

      {user && !isLanding && (
        <main className="flex-shrink-0" role="main">
          <Container className="py-5">
            <Row>
              <Col md={4} lg={3}>
                <Nav />
              </Col>
              <Col md={8} lg={9} {...props} />
            </Row>
          </Container>
        </main>
      )}
      {isLanding ? <FooterLanding /> : <Footer />}
    </div>
  );
}

Layout.propTypes = {
  router: PropTypes.object,
};
