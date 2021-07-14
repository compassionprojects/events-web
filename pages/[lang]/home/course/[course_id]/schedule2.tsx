import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button } from 'reactstrap';
import ReactMarkdown from 'react-markdown';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import withAuth from 'hocs/auth';
import Meta from 'components/Meta';
import Loading from 'components/Loading';
import Link from 'components/Link';
import Icon from 'components/Icon';
import useTranslation from 'hooks/useTranslation';

const GET_SESSIONS = gql`
  query getSessions($courseId: ID!) {
    allSessions(
      where: { course: { id: $courseId } }
      sortBy: startDateTime_ASC
    ) {
      id
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
      attachments {
        file {
          publicUrl
        }
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
    isOver: moment().isAfter(d.endDateTime),
    // sameDay: moment().isSame(d.startDateTime, 'day'),
  }));

  useEffect(() => {
    setCurrent(index);
  }, [index]);

  return (
    <>
      <Meta {...meta} />
      <h2 className="d-flex align-items-center">
        <span className="pr-2">{meta.title}</span>
        {loading && <Loading color="primary" />}
      </h2>

      <div className="pt-4 position-relative mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5>
            <strong className="rounded px-2">
              {t('DAY')} {current + 1}{' '}
            </strong>
            <small className="ml-3">
              {moment(days[current]).format('ddd, MMM Do YYYY z')}
            </small>
          </h5>
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
        <div className="ml-5 pl-5 border-right position-absolute h-100">
          <div className="ml-3"></div>
        </div>
        {day.map((row) => (
          <div
            key={row.id}
            className="d-flex mt-5"
            style={{
              opacity: row.isOver ? 0.5 : 1,
              background:
                row.type && row.type === 'break'
                  ? 'rgb(252, 248, 227)'
                  : 'transparent',
            }}>
            <div className="flex-shrink-0 text-muted">
              {moment(row.startDateTime).format('HH:mm')} -{' '}
              {moment(row.endDateTime).format('HH:mm')}
            </div>
            <div
              className={classnames(
                'rounded-circle position-absolute ml-5 mt-2',
                {
                  'bg-gray': !row.active,
                  'bg-success': row.active,
                }
              )}
              style={{
                width: 10,
                height: 10,
                left: '3.7rem',
              }}
            />
            <div className="ml-5">
              <b>{row.title}</b>
              <ReactMarkdown
                source={row.description}
                escapeHtml={false}
                linkTarget="_blank"
              />
              <Trainers items={row.trainers} />

              <div className="d-flex align-items-center mt-3">
                {row.active && row.room && row.room.link && (
                  <a
                    className="btn btn-primary rounded-pill mr-3"
                    href={row.room.link}
                    target="_blank"
                    rel="noreferrer">
                    Join in {row.room.title}
                  </a>
                )}
                {row.attachments.length > 0 && (
                  <span className="text-muted d-inline-flex align-items-center">
                    <Icon height={18} shape="paperclip" />
                    <Link
                      href={`/[lang]/home/course/[course_id]/library2?session_id=${row.id}`}
                      as={`/${locale}/home/course/${query.course_id}/library2?session_id=${row.id}`}>
                      {t('LIBRARY')} <Icon height={18} shape="arrow-right" />
                    </Link>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

Home.propTypes = {
  user: PropTypes.object,
};

export default withAuth(Home);

export function Trainers({ items }) {
  if (!items) return null;
  if (!items.length) return null;
  return (
    <div className="d-flex my-3">
      {items.map((obj) => (
        <div key={obj.id} className="d-flex align-items-center mr-4">
          <div className="mr-2 flex-shrink-0">
            {obj.attachment && (
              <img
                src={obj.attachment.file.publicUrl}
                className="img-fluid rounded-circle"
                style={{ height: 25 }}
              />
            )}
          </div>
          <span className="text-muted">{obj.name}</span>
        </div>
      ))}
    </div>
  );
}

Trainers.propTypes = {
  items: PropTypes.array,
};
