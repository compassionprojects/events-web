import React, { useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Router, { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import withAuth from '../auth';
import Meta from '../../components/Meta';
import Loading from '../../components/Loading';

const meta = {
  title: 'Interactive tools',
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
  const { query, pathname } = useRouter();
  const [opened, setOpen] = useState({});
  const { data, loading } = useQuery(GET_CARDS, {
    variables: { type: query.type },
  });

  const cards = data?.allCards || [];

  const filter = (e, type) => {
    e.preventDefault();
    Router.push({
      pathname,
      query: type ? { type } : {},
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
            href="/home/cards?type=challenge"
            active={query.type === 'challenge'}
            onClick={(e) => filter(e, 'challenge')}>
            Daily challenge
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/home/cards?type=feelings"
            active={query.type === 'feelings'}
            onClick={(e) => filter(e, 'feelings')}>
            Feelings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="/home/cards?type=needs"
            active={query.type === 'needs'}
            onClick={(e) => filter(e, 'needs')}>
            Needs
          </NavLink>
        </NavItem>
      </Nav>

      <div className="row">
        {/* Sort the cards randomly */}
        {cards.map((card) => (
          <Card key={card.id} className="col-6 col-md-6 col-lg-4 col-xl-3 my-3">
            <CardInner
              className={classnames({
                open: opened[card.id],
              })}
              onClick={() =>
                setOpen({ ...opened, [card.id]: !opened[card.id] })
              }>
              <CardFront>
                <img
                  style={{ height: 175 }}
                  src="/images/hedgehog.png"
                  alt="Smiling hedgehog"
                  className="img-fluid border rounded-circle p-3"
                />
              </CardFront>
              <CardBack className="border rounded-circle bg-light">
                <div className="d-flex align-items-center h-100 justify-content-center">
                  {card.text}
                </div>
              </CardBack>
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
  width: 175px;
  height: 175px;
  text-align: center;
  transition: transform 0.3s;
  transform-style: preserve-3d;
  cursor: pointer;

  &.open {
    transform: rotateY(180deg);
  }
`;

const Card = styled.div`
  background-color: transparent;
  perspective: 1000px;
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
  padding: 1rem;
`;
