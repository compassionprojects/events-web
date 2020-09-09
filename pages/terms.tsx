import React from 'react';
import { Container } from 'reactstrap';
import ReactMarkdown from 'react-markdown/with-html';
import Meta from '../components/Meta';
import terms from '../terms';

const meta = {
  title: 'Terms',
};

export default function Tickets() {
  return (
    <>
      <Meta {...meta} />
      <Container className="py-5">
        <h1 className="my-3 text-center">{meta.title}</h1>
        <ReactMarkdown source={terms} escapeHtml={false} />
      </Container>
    </>
  );
}
