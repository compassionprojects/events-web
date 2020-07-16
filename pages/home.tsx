import React from 'react';
import withAuth from './auth';
import PropTypes from 'prop-types';

function Home({ user }) {
  return (
    <>
      <h2>Home</h2>
      <div>Welcome {user.name}</div>
    </>
  );
}

Home.propTypes = {
  user: PropTypes.object,
};

export default withAuth(Home);
