import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import ReactMarkdown from 'react-markdown/with-html';
import Meta from 'components/Meta';
import Loading from 'components/Loading';
import useTranslation from 'hooks/useTranslation';

const CONTENT_ID = 1;

const GET_CONTENT = gql`
  query Content($id: ID!) {
    Content(where: { id: $id }) {
      id
      description
    }
  }
`;

export default function About() {
  const { t } = useTranslation();
  const meta = {
    title: t('ABOUT_US'),
  };
  const variables = { id: CONTENT_ID };
  const { data, loading } = useQuery(GET_CONTENT, {
    variables,
  });
  const { Content = {} } = data || {};
  return (
    <>
      <Meta {...meta} />
      <Container className="py-5">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1 className="my-4">{meta.title}</h1>

            {loading && <Loading color="primary" />}

            <ReactMarkdown
              linkTarget="_blank"
              source={Content.description}
              escapeHtml={false}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
