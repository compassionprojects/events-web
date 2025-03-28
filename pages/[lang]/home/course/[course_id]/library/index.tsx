import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Router, { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import withAuth from 'hocs/auth';
import Meta from 'components/Meta';
import Loading from 'components/Loading';
import Icon from 'components/Icon';
import Link from 'components/Link';
import useTranslation from 'hooks/useTranslation';

const GET_LIBRARY_CONTENTS = gql`
  query getLibraryContents(
    $librarySection: ID
    $skip: Int
    $first: Int
    $courseId: ID
  ) {
    allLibrarySections(where: { courses_some: { id: $courseId } }) {
      id
      title
    }
    allContents(
      where: {
        librarySection: { id: $librarySection }
        librarySection_is_null: false
        courses_some: { id: $courseId }
      }
      sortBy: createdAt_DESC
      first: $first
      skip: $skip
    ) {
      id
      title
      description
      url
      contentType
      librarySection {
        id
        title
      }
      callToActionTitle
      callToActionUrl
      createdAt
      createdBy {
        name
      }
    }
    _allContentsMeta(
      where: {
        librarySection: { id: $librarySection }
        librarySection_is_null: false
        courses_some: { id: $courseId }
      }
    ) {
      count
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
  const limit = 15;
  const variables = {
    librarySection: query.section,
    courseId: query.course_id,
    first: limit,
    skip: 0,
  };
  const { data, loading, fetchMore } = useQuery(GET_LIBRARY_CONTENTS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const { allLibrarySections = [], allContents = [] } = data || {};
  const { _allContentsMeta = {} } = data || {};
  const { count = 0 } = _allContentsMeta;

  const filter = (e, section) => {
    e.preventDefault();
    Router.push({
      pathname: `/[lang]/home/course/[course_id]/library`,
      query: section
        ? { section, course_id: query.course_id, lang: locale }
        : { course_id: query.course_id, lang: locale },
    });
  };

  const loadMore = () => {
    fetchMore({
      variables: {
        ...variables,
        first: limit,
        skip: allContents.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          allContents: [
            ...prev['allContents'],
            ...fetchMoreResult['allContents'],
          ],
        });
      },
    });
  };

  allContents.forEach((item) => {
    item.isOneDrive = item.url && item.url.includes('onedrive.live.com');
  });

  return (
    <>
      <Meta {...meta} />
      <h2 className="d-flex align-items-center">
        <span className="pr-2">{meta.title}</span>
        {loading && <Loading color="primary" />}
      </h2>
      <Nav pills className="my-4">
        <NavItem>
          <NavLink
            href={`/${locale}/home/course/${query.course_id}/library`}
            active={!query.section}
            onClick={(e) => filter(e, '')}>
            {t('ALL')}
          </NavLink>
        </NavItem>
        {allLibrarySections.map((item) => (
          <NavItem key={item.id}>
            <NavLink
              href={`/${locale}/home/course/${query.course_id}/library/?section=${item.id}`}
              active={item.id === query.section}
              onClick={(e) => filter(e, item.id)}>
              {item.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      {allContents.map((item) => (
        <div className="py-5 border-top" key={item.id}>
          {item.contentType !== 'document' && <b>{item.title}</b>}
          {item.contentType === 'document' && (
            <a href={item.url} target="_blank" rel="noreferrer">
              <b>{item.title}</b>{' '}
              <Icon shape="external-link" className="pb-1" />
            </a>
          )}
          <div className="text-muted small py-1">
            {t('ITEM_CREATED_BY_IN', {
              timeAgo: moment(item.createdAt).fromNow(),
              createdBy: item.createdBy.name,
              category: item.librarySection.title,
            })}{' '}
            <Link
              href={`/[lang]/home/course/[course_id]/library/content/[content_id]`}
              as={`/${locale}/home/course/${query.course_id}/library/content/${item.id}`}>
              {t('VIEW')}
            </Link>
          </div>
          <ContentBlock>
            <ReactMarkdown
              linkTarget="_blank"
              source={item.description}
              escapeHtml={false}
            />
          </ContentBlock>
          {item.contentType === 'image' && item.url && (
            <img src={item.url} className="img-fluid rounded" />
          )}
          {item.contentType === 'video' && item.url && (
            <div
              className="embed-responsive embed-responsive-16by9"
              style={{ borderRadius: 15 }}>
              {!item.isOneDrive && (
                <iframe
                  className="embed-responsive-item"
                  src={item.url}
                  allowFullScreen></iframe>
              )}
              {item.isOneDrive && (
                <video
                  onContextMenu={disableRightClick}
                  width="auto"
                  height="auto"
                  controls
                  controlsList="nodownload">
                  <source src={item.url} type="video/mp4" />
                </video>
              )}
            </div>
          )}
          {item.callToActionUrl && (
            <a
              href={item.callToActionUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary rounded-pill">
              {item.callToActionTitle || t('JOIN')}
            </a>
          )}
        </div>
      ))}
      {allContents.length < count && (
        <>
          <br />
          <Button color="outline-primary" block onClick={loadMore}>
            {t('LOAD_MORE')} ({count - allContents.length})
          </Button>
        </>
      )}
    </>
  );
}

export default withAuth(Library);

export function disableRightClick(e) {
  e.preventDefault();
  return false;
}

export const ContentBlock = styled.div`
  p:last-child {
    margin-bottom: 0;
  }
`;
