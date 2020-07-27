import React from 'react';
import { gql } from 'apollo-boost';
// import PropTypes from 'prop-types';
// import { UserContext } from '../../lib/UserContext';
import withAuth from '../auth';
import Meta from '../../components/Meta';

const meta = {
  title: 'Wall',
};

const GET_MESSAGES = gql`
  query getMessages($typeId: ID!) {
    allMessageTypes {
      id
      title
    }
    allMessages(where: { type: { id: $typeId } }) {
      id
      body
      type {
        id
        title
      }
      createdBy {
        id
        name
      }
      createdAt
      replies {
        id
        body
        createdBy {
          id
          name
        }
        createdAt
      }
    }
  }
`;

function Wall() {
  // const { user } = useContext(UserContext);
  return (
    <>
      <Meta {...meta} />
      <h2>{meta.title}</h2>
    </>
  );
}

Wall.propTypes = {
  user: PropTypes.object,
};

export default withAuth(Wall);
