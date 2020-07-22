import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import ReactMarkdown from 'react-markdown';
// import { UserContext } from '../../lib/UserContext';
import withAuth from '../auth';
import Meta from '../../components/Meta';
import Loading from '../../components/Loading';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

const meta = {
  title: 'Cards',
};

const GET_CARDS = gql`
  query getCards($type: CardTypeType) {
    allCards(where: { type: $type }) {
      id
      text
      type
    }
  }
`;

function Cards() {
  const { query } = useRouter();
  const { data, loading } = useQuery(GET_CARDS, {
    variables: { type: query.type },
  });

  const cards = data?.allCards || [];

  return (
    <>
      <Meta {...meta} />
      <h2 className="d-flex align-items-center">
        <span className="pr-2">{meta.title}</span>
        {loading && <Loading color="primary" />}
      </h2>
      <div className="row align-items-center">
        {cards.map((card) => (
          <Card key={card.id} className="col-4">
            <CardInner>
              <CardFront>
                <img
                  src="/images/hedgehog.png"
                  alt="Smiling hedgehog"
                  className="img-fluid border rounded"
                />
              </CardFront>
              <CardBack className="border">{card.text}</CardBack>
            </CardInner>
          </Card>
        ))}
      </div>
    </>
  );
}

export default withAuth(Cards);

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 187px;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

const Card = styled.div`
  background-color: transparent;
  perspective: 1000px;

  &:hover ${CardInner} {
    transform: rotateY(180deg);
  }
`;

const CardFrontBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const CardFront = styled(CardFrontBack)`
  color: black;
`;

const CardBack = styled(CardFrontBack)`
  transform: rotateY(180deg);
`;
