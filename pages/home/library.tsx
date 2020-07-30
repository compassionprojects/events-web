import React from 'react';
import ReactMarkdown from 'react-markdown';
import Router, { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import withAuth from '../auth';
import Meta from '../../components/Meta';
import Loading from '../../components/Loading';
import Icon from '../../components/Icon';

const meta = {
  title: 'Library',
};

const GET_LIBRARY_CONTENTS = gql`
  query getLibraryContents($librarySection: ID, $skip: Int, $first: Int) {
    allLibrarySections {
      id
      title
    }
    allContents(
      where: {
        librarySection: { id: $librarySection }
        librarySection_is_null: false
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
      }
    ) {
      count
    }
  }
`;

function Library() {
  const { query, pathname } = useRouter();
  const limit = 15;
  const variables = { librarySection: query.section, first: limit, skip: 0 };
  const { data, loading, fetchMore } = useQuery(GET_LIBRARY_CONTENTS, {
    variables,
  });

  const { allLibrarySections = [], allContents = [] } = data || {};
  const { _allContentsMeta = {} } = data || {};
  const { count = 0 } = _allContentsMeta;

  const filter = (e, section) => {
    e.preventDefault();
    Router.push({
      pathname: pathname,
      query: section ? { section } : {},
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
    item.isDropboxVideo =
      item.url && item.url.includes('dropbox.com') && item.url.includes('.mp4');
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
            href="/home/library"
            active={!query.section}
            onClick={(e) => filter(e, '')}>
            All
          </NavLink>
        </NavItem>
        {allLibrarySections.map((item) => (
          <NavItem key={item.id}>
            <NavLink
              href={`/home/library/?section=${item.id}`}
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
            {moment(item.createdAt).fromNow()} by {item.createdBy.name}
          </div>
          <ReactMarkdown
            linkTarget="_blank"
            source={item.description}
            escapeHtml={false}
          />
          {item.contentType === 'image' && item.url && (
            <img src={item.url} className="img-fluid rounded" />
          )}
          {item.contentType === 'video' && item.url && (
            <div className="embed-responsive embed-responsive-16by9">
              {!item.isDropboxVideo && (
                <iframe
                  className="embed-responsive-item"
                  src={item.url}
                  allowFullScreen></iframe>
              )}
              {item.isDropboxVideo && (
                <video width="auto" height="auto" controls>
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
              {item.callToActionTitle || 'Join'}
            </a>
          )}
        </div>
      ))}
      {allContents.length < count && (
        <>
          <br />
          <Button color="outline-primary" block onClick={loadMore}>
            Load more ({count - allContents.length})
          </Button>
        </>
      )}
    </>
  );
}

export default withAuth(Library);
