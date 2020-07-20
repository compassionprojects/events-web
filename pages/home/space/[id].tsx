import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
// import { UserContext } from '../../../lib/UserContext';
import withAuth from '../../auth';
import Meta from '../../../components/Meta';
import Loading from '../../../components/Loading';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

const GET_CONTENT = gql`
  query allContentOnSpaces($id: ID!) {
    Space(where: { id: $id }) {
      id
      title
    }
    allContents(where: { space: { id: $id } }) {
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
  }
`;

function Space() {
  // const { user } = useContext(UserContext);
  const { query } = useRouter();
  const { data, loading } = useQuery(GET_CONTENT, {
    variables: { id: query.id },
  });

  const { Space = {}, allContents = [] } = data || {};

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
    </>
  );
}

Space.propTypes = {
  user: PropTypes.object,
};

export default withAuth(Space);
