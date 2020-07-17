import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { UserContext } from '../lib/UserContext';
import withAuth from './auth';

function Home() {
  const { user } = useContext(UserContext);
  return (
    <Container className="py-5">
      <h2>Home</h2>
      <div>Welcome {user.name}</div>
    </Container>
  );
}

Home.propTypes = {
  user: PropTypes.object,
};

export default withAuth(Home);
