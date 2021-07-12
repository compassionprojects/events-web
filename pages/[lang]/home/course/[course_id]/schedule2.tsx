import React, { useState } from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import ReactMarkdown from 'react-markdown';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import withAuth from 'hocs/auth';
import Meta from 'components/Meta';
import Loading from 'components/Loading';
import useTranslation from 'hooks/useTranslation';

const GET_SESSIONS = gql`
  query getSessions($courseId: ID!) {
    allSessions(
      where: { course: { id: $courseId } }
      sortBy: startDateTime_ASC
    ) {
      startDateTime
      endDateTime
      title
      description
      startDateTime
      endDateTime
      room {
        title
        link
      }
      trainers {
        id
        name
        bio
        attachment {
          file {
            publicUrl
          }
        }
      }
    }
  }
`;

function Home() {
  const { t, locale } = useTranslation();
  const meta = {
    title: t('SCHEDULE'),
  };
  const { query } = useRouter();
  const variables = { courseId: query.course_id };
  const { data, loading } = useQuery(GET_SESSIONS, {
    variables,
  });
  // Set moment locale
  moment.locale(locale);

  const sessions = data?.allSessions || [];

  // group all sessions by day
  const grouped = sessions.reduce((groups, session) => {
    const date = moment(session.startDateTime).format('YYYY-MM-DD');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {});

  // get all days in an array
  const days = Object.keys(grouped);

  // keep an index to point to the current day in the `days` array
  let index = 0;
  for (let i = 0; i < days.length; i++) {
    if (moment().isSame(days[i], 'day')) {
      index = i;
      break;
    }
  }

  const [current, setCurrent] = useState(index);
  // get sessions of that particular day
  const day = (grouped[days[current]] || []).map((d) => ({
    ...d,
    active: moment().isBetween(d.startDateTime, d.endDateTime),
    sameDay: moment().isSame(d.startDateTime, 'day'),
  }));

  return (
    <>
      <Meta {...meta} />
      <h2 className="d-flex align-items-center">
        <span className="pr-2">{meta.title}</span>
        {loading && <Loading color="primary" />}
      </h2>

      <div className="py-4">
        <div className="d-flex justify-content-between">
          <strong>
            {t('DAY')} {current + 1}{' '}
            {moment(days[current]).format('dddd, MMMM Do YYYY z')}
          </strong>
          <div>
            <Button
              color="warning"
              onClick={() => setCurrent(current - 1)}
              disabled={current === 0}>
              {t('PREVIOUS_DAY')}
            </Button>{' '}
            <Button
              color="warning"
              onClick={() => setCurrent(current + 1)}
              disabled={current === days.length - 1}>
              {t('NEXT_DAY')}
            </Button>
          </div>
        </div>
        <Table className="table">
          <tbody>
            {day.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  opacity: row.sameDay && !row.active ? 0.5 : 1,
                  background:
                    row.type && row.type === 'break'
                      ? 'rgb(252, 248, 227)'
                      : 'transparent',
                }}>
                <td width="20%">
                  {moment(row.startDateTime).format('HH:mm')} -{' '}
                  {moment(row.endDateTime).format('HH:mm')}
                </td>
                <td>
                  <b>{row.title}</b>
                  <ReactMarkdown
                    source={row.description}
                    escapeHtml={false}
                    linkTarget="_blank"
                  />
                  <div className="d-flex my-4">
                    {row.trainers.map((obj) => (
                      <div key={obj.id} className="text-center">
                        <div className="mb-2 px-5">
                          {obj.attachment && (
                            <img
                              src={obj.attachment.file.publicUrl}
                              className="img-fluid rounded-circle"
                              style={{ height: 120 }}
                            />
                          )}
                        </div>
                        {obj.name}
                      </div>
                    ))}
                  </div>
                  {row.sameDay && row.active && (
                    <a
                      className="btn btn-sm btn-primary"
                      href={row.room.link}
                      target="_blank"
                      rel="noreferrer">
                      Join in {row.room.title}
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
