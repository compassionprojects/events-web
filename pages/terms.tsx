import React from 'react';
import { Container } from 'reactstrap';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../components/Loading';
import ReactMarkdown from 'react-markdown/with-html';
import Meta from '../components/Meta';

const CONTENT_ID = 134;
const meta = {
  title: 'Terms',
};

const GET_CONTENT = gql`
  query Content($id: ID!) {
    Content(where: { id: $id }) {
      id
      description
    }
  }
`;

export default function Terms() {
  const variables = { id: CONTENT_ID };
  const { data, loading } = useQuery(GET_CONTENT, {
    variables,
  });
  const { Content = {} } = data || {};
  return (
    <>
      <Meta {...meta} />
      <Container className="py-5">
        <h1 className="my-3 text-center">{meta.title}</h1>

        {loading && <Loading color="primary" />}

        <ReactMarkdown
          linkTarget="_blank"
          source={Content.description}
          escapeHtml={false}
        />
      </Container>
    </>
  );
}
