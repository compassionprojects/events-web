import React from 'react';
import { Container, Button } from 'reactstrap';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { useQuery } from '@apollo/react-hooks';
// import { UserContext } from '../../../../../../../lib/UserContext';
import withAuth from '../../../../../../../hocs/auth';
import Meta from '../../../../../../../components/Meta';
import Loading from '../../../../../../../components/Loading';
import Link from '../../../../../../../components/Link';
import Icon from '../../../../../../../components/Icon';
import { disableRightClick, ContentBlock } from '../../';

const meta = {
  title: 'Content',
};

const GET_LIBRARY_CONTENT = gql`
  query getContent($id: ID!) {
    Content(where: { id: $id }) {
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

function Content() {
  // const { user } = useContext(UserContext);
  const { query } = useRouter();
  const variables = {
    id: query.content_id,
    courseId: query.course_id,
  };
  const { data, loading } = useQuery(GET_LIBRARY_CONTENT, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const { Content: item } = data || {};

  if (item) {
    item.isOneDrive = item.url && item.url.includes('onedrive.live.com');
  }

  return (
    <>
      <Meta {...meta} />
      <Container className="py-5">
        {loading && !item && <Loading color="primary" />}
        <Button onClick={() => window.history.go(-1)}>Back</Button>
        {item && (
          <div className="mt-3">
            {/* this is duplicate from the library listing */}
            {/* todo: make a componenet out of this */}
            {item.contentType !== 'document' && <b>{item.title}</b>}
            {item.contentType === 'document' && (
              <a href={item.url} target="_blank" rel="noreferrer">
                <b>{item.title}</b>{' '}
                <Icon shape="external-link" className="pb-1" />
              </a>
            )}
            <div className="text-muted small py-1">
              {moment(item.createdAt).fromNow()} by {item.createdBy.name} in{' '}
              {item.librarySection.title}
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
              <div className="embed-responsive embed-responsive-16by9">
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
                {item.callToActionTitle || 'Join'}
              </a>
            )}
          </div>
        )}
      </Container>
    </>
  );
}

Content.propTypes = {
  user: PropTypes.object,
};

export default withAuth(Content);
