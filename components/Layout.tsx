import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Cookies from 'js-cookie';
import Footer from './Footer';
import HeaderLanding, { Header } from './Header';
import GlobalStyles from './GlobalStyles';
import Affix from './Affix';
import SkipLinks from './SkipLinks';
import Nav from './Nav';
import { UserContext } from '../lib/UserContext';

export default function Layout({ router, ...props }) {
  const activePath = router.pathname;
  const isLanding = router.route === '/[lang]';
  const isOneCol = !activePath.startsWith('/[lang]/home/');
  const { user } = useContext(UserContext);
  const onecol =
    (user && isOneCol) || (!user && !isOneCol) || (!user && isOneCol);

  const challenge = Cookies.get('challenge');

  const clearChallenge = (e) => {
    e.preventDefault();
    Cookies.remove('challenge');
    window.location.reload();
  };

  return (
    <>
      <GlobalStyles />
      {isOneCol && <SkipLinks />}
      {isLanding ? <HeaderLanding /> : <Header />}
      {onecol && <main className="flex-shrink-0" role="main" {...props} />}

      {user && !isOneCol && (
        <main className="flex-shrink-0 mb-5" role="main">
          {challenge && (
            <div className="bg-light border-bottom py-3 text-center">
              Daily challenge you have chosen: {challenge} &nbsp;&nbsp;{' '}
              <a href="" onClick={clearChallenge}>
                clear
              </a>
            </div>
          )}
          <Container className="py-5">
            <Row>
              <Col md={4} lg={3}>
                <Affix top={20}>
                  <Nav />
                </Affix>
              </Col>
              <Col md={8} lg={9} {...props} />
            </Row>
          </Container>
        </main>
      )}
      <Footer />
    </>
  );
}

Layout.propTypes = {
  router: PropTypes.object,
};
