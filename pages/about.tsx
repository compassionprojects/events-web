import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import ReactMarkdown from 'react-markdown/with-html';
import Meta from '../components/Meta';
import Loading from '../components/Loading';
import about from '../data/about';

const meta = {
  title: 'About us',
};

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

export default function About() {
  // space id in the database
  const variables = { id: 7, skip: 0 };
  const { data, loading } = useQuery(GET_CONTENT, {
    variables,
  });
  const { allContents = [] } = data || {};
  return (
    <>
      <Meta {...meta} />
      <Container className="py-5">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1 className="my-4">{meta.title}</h1>

            <ReactMarkdown
              linkTarget="_blank"
              source={about.what}
              escapeHtml={false}
            />

            <h2 className="mt-5 py-4">Why do we do it?</h2>
            <ReactMarkdown source={about.why} escapeHtml={false} />

            <h2 className="mt-5 py-4">Meet the team</h2>
            {loading && <Loading color="primary" />}
            {allContents.map((item) => (
              <div key={item.id}>
                {/* <b>{item.title}</b>
                <div className="text-muted small py-1">
                  {moment(item.createdAt).fromNow()} by {item.createdBy.name}
                </div> */}
                <ReactMarkdown
                  linkTarget="_blank"
                  source={item.description}
                  escapeHtml={false}
                />
                {/* {item.contentType === 'image' && item.url && (
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
                )} */}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
