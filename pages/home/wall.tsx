import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../lib/UserContext';
import withAuth from '../auth';
import Meta from '../../components/Meta';

const meta = {
  title: 'Wall',
};

function Wall() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Meta {...meta} />
      <h2>{meta.title}</h2>
      <div>Welcome {user.name}</div>
    </>
  );
}

Wall.propTypes = {
  user: PropTypes.object,
};

export default withAuth(Wall);
