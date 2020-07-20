import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
// import { UserContext } from '../../lib/UserContext';
import withAuth from '../auth';
import Meta from '../../components/Meta';
import Loading from '../../components/Loading';
// import Link from '../../components/Link';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Router, { useRouter } from 'next/router';
import Icon from '../../components/Icon';

const meta = {
  title: 'Library',
};

const GET_LIBRARY_CONTENTS = gql`
  query getLibraryContents($librarySection: ID) {
    allLibrarySections {
      id
      title
    }
    allContents(
      where: {
        librarySection: { id: $librarySection }
        librarySection_is_null: false
      }
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
  }
`;

function Library() {
  // const { user } = useContext(UserContext);
  const { query, pathname } = useRouter();
  const { data, error, loading } = useQuery(GET_LIBRARY_CONTENTS, {
    variables: { librarySection: query.section },
  });

  const { allLibrarySections = [], allContents = [] } = data || {};

  const filter = (e, section) => {
    e.preventDefault();
    Router.push({
      pathname: pathname,
      query: section ? { section } : {},
    });
  };

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
              <iframe
                className="embed-responsive-item"
                src={item.url}
                allowFullScreen></iframe>
            </div>
          )}
          {item.callToActionUrl && (
            <a
              href={item.callToActionUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-accent">
              {item.callToActionTitle || 'Join'}
            </a>
          )}
        </div>
      ))}
    </>
  );
}

Library.propTypes = {
  user: PropTypes.object,
};

export default withAuth(Library);
