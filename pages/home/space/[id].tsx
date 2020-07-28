import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { Button } from 'reactstrap';

import withAuth from '../../auth';
import Meta from '../../../components/Meta';
import Loading from '../../../components/Loading';

const GET_CONTENT = gql`
  query allContentOnSpaces($id: ID!, $skip: Int, $first: Int) {
    Space(where: { id: $id }) {
      id
      title
    }
    allContents(
      where: { space: { id: $id } }
      sortBy: createdAt_DESC
      first: $first
      skip: $skip
    ) {
      id
      title
      description
      url
      contentType
      callToActionTitle
      callToActionUrl
      createdAt
      createdBy {
        name
      }
    }
    _allContentsMeta(where: { space: { id: $id } }) {
      count
    }
  }
`;

function Space() {
  const { query } = useRouter();
  const limit = 15;
  const variables = { id: query.id, first: limit, skip: 0 };
  const { data, loading, fetchMore } = useQuery(GET_CONTENT, {
    variables,
  });

  const { Space = {}, allContents = [] } = data || {};
  const { _allContentsMeta = {} } = data || {};
  const { count = 0 } = _allContentsMeta;

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

  const meta = {
    title: Space.title || '',
  };

  return (
    <>
      <Meta {...meta} />
      <h2 className="d-flex align-items-center">
        <span className="pr-2">{meta.title}</span>
        {loading && <Loading color="primary" />}
      </h2>
      {allContents.map((item) => (
        <div className="py-4 border-top" key={item.id}>
          <b>{item.title}</b>
          <div className="text-muted small py-1">
            {moment(item.createdAt).fromNow()} by {item.createdBy.name}
          </div>
          <ReactMarkdown
            linkTarget="_blank"
            source={item.description}
            escapeHtml={false}
          />
          {item.contentType === 'image' && item.url && (
            <img src={item.url} className="img-fluid rounded mb-3" />
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

Space.propTypes = {
  user: PropTypes.object,
};

export default withAuth(Space);
