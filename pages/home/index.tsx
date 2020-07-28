import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { UserContext } from '../../lib/UserContext';
import withAuth from '../auth';
import Meta from '../../components/Meta';
import Loading from '../../components/Loading';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const meta = {
  title: 'Schedule',
};

const GET_SCHEDULE = gql`
  query getSchedule {
    allSchedules {
      description
    }
  }
`;

function Home() {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(GET_SCHEDULE);

  const [schedule = {}] = data?.allSchedules || [];

  return (
    <>
      <Meta {...meta} />
      <h2 className="d-flex align-items-center">
        <span className="pr-2">{meta.title}</span>
        {loading && <Loading color="primary" />}
      </h2>
      <div>Welcome {user.name}!</div>
      <ReactMarkdown
        linkTarget="_blank"
        source={schedule.description}
        escapeHtml={false}
      />
    </>
  );
}

Home.propTypes = {
  user: PropTypes.object,
};

export default withAuth(Home);
