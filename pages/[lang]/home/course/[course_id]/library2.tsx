import React from 'react';
// import styled from 'styled-components';
// import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
// import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import withAuth from 'hocs/auth';
import Meta from 'components/Meta';
import Loading from 'components/Loading';
// import Icon from 'components/Icon';
// import Link from 'components/Link';
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
      }
      attachments {
        file {
          publicUrl
        }
      }
      trainers {
        id
        name
        attachment {
          file {
            publicUrl
          }
        }
      }
    }
  }
`;

function Library() {
  const { t, locale } = useTranslation();
  const meta = {
    title: t('LIBRARY'),
  };
  moment.locale(locale);

  const { query } = useRouter();
  const variables = {
    courseId: query.course_id,
  };
  const { data, loading } = useQuery(GET_SESSIONS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const sessions = data?.allSessions || [];

  return (
    <>
      <Meta {...meta} />
      <h2 className="d-flex align-items-center">
        <span className="pr-2">{meta.title}</span>
        {loading && <Loading color="primary" />}
      </h2>
    </>
  );
}

export default withAuth(Library);
