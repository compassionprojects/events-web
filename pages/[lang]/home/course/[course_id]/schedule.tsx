import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import withAuth from 'hocs/auth';
import Meta from 'components/Meta';
import Loading from 'components/Loading';
import scheduleData from 'data/schedule/index';
import useTranslation from 'hooks/useTranslation';

const GET_SCHEDULE = gql`
  query getSchedule($courseId: ID!) {
    allSchedules(where: { course: { id: $courseId } }) {
      description
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
  const { data, loading } = useQuery(GET_SCHEDULE, {
    variables,
  });
  // Set moment locale
  moment.locale(locale);

  const [schedule = {}] = data?.allSchedules || [];

  const course = scheduleData[query.course_id.toString()](locale); // array (days)

  let index = 0;
  if (course) {
    for (let i = 0; i < course.length; i++) {
      if (moment().isSame(course[i].startDate, 'day')) {
        index = i;
        break;
      }
    }
  }

  const [current, setCurrent] = useState(index);
  const day = course && course[current]; // object (day)

  return (
    <>
      <Meta {...meta} />
      <h2 className="d-flex align-items-center">
        <span className="pr-2">{meta.title}</span>
        {loading && <Loading color="primary" />}
      </h2>

      <ReactMarkdown
        linkTarget="_blank"
        source={schedule.description}
        escapeHtml={false}
      />

      {course && (
        <div className="py-4">
          <div className="d-flex justify-content-between">
            <strong>
              {t('DAY')} {current + 1} {day.startDateFormatted}
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
                disabled={current === course.length - 1}>
                {t('NEXT_DAY')}
              </Button>
            </div>
          </div>
          <Table className="table">
            <tbody>
              {day.schedule.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    background:
                      row.type && row.type === 'break'
                        ? 'rgb(252, 248, 227)'
                        : 'transparent',
                  }}>
                  <td width="20%">
                    {row.start} - {row.end}
                    {row.session && (
                      <>
                        <br />
                        {t('SESSION')} {row.session}
                      </>
                    )}
                  </td>
                  <td>
                    <ReactMarkdown
                      source={row.body}
                      escapeHtml={false}
                      linkTarget="_blank"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
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
