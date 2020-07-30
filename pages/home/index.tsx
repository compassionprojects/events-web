import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../../lib/UserContext';
import withAuth from '../auth';
import Meta from '../../components/Meta';
import Loading from '../../components/Loading';
import scheduleData from '../../schedule';

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

      {Object.keys(scheduleData).map((key, idx) => (
        <div className="py-4" key={idx}>
          <strong>
            Day {idx + 1} {scheduleData[key].startDate}
          </strong>
          <Table className="table">
            <tbody>
              {scheduleData[key].schedule.map((row, idx) => (
                <tr key={idx}>
                  <td width="20%">
                    {row.start} - {row.end}
                  </td>
                  <td>
                    <ReactMarkdown source={row.body} escapeHtml={false} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </>
  );
}

Home.propTypes = {
  user: PropTypes.object,
};

export default withAuth(Home);

const Table = styled.table`
  td p {
    margin: 0 !important;
  }
`;
