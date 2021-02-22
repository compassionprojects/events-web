import React, { useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';
import Router, { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import Cookies from 'js-cookie';
import withAuth from 'hocs/auth';
import Meta from 'components/Meta';
import Loading from 'components/Loading';
import useTranslation from 'hooks/useTranslation';

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
  const { t, locale: lang } = useTranslation();
  const meta = {
    title: t('INTERACTIVE_TOOLS'),
  };
  const { query } = useRouter();
  const [opened, setOpen] = useState({});
  const { data, loading } = useQuery(GET_CARDS, {
    variables: { type: query.type },
  });

  const cards = data?.allCards || [];

  const filter = (e, type) => {
    e.preventDefault();
    Router.push({
      pathname: `/${lang}/home/course/${query.course_id}/cards`,
      query: type ? { type } : {},
    });
  };

  const toggleAll = (e, open) => {
    e.preventDefault();
    const toggled = cards.reduce((obj, c) => {
      obj[c.id] = open;
      return obj;
    }, {});
    setOpen(toggled);
  };

  const choose = (e, text) => {
    e.preventDefault();
    e.stopPropagation();
    // 1 minute
    // const expires = new Date(new Date().getTime() + 1 * 60 * 1000);

    // end of day
    const expires = new Date();
    expires.setUTCHours(23, 59, 59, 999);
    Cookies.set('challenge', text, { expires });
    window.location.reload();
  };

  return (
    <>
      <Meta {...meta} />
      <div className="d-flex">
        <h2 className="d-flex align-items-center">
          <span className="pr-2">{meta.title}</span>
          {loading && <Loading color="primary" />}
        </h2>
        <div className="ml-auto">
          <Button size="sm" onClick={(e) => toggleAll(e, true)}>
            {t('OPEN_ALL')}
          </Button>{' '}
          <Button size="sm" onClick={(e) => toggleAll(e, false)}>
            {t('CLOSE_ALL')}
          </Button>
        </div>
      </div>
      <Nav pills className="my-4">
        <NavItem>
          <NavLink
            href={`/${lang}/home/course/${query.course_id}/cards?type=challenge`}
            active={query.type === 'challenge'}
            onClick={(e) => filter(e, 'challenge')}>
            {t('DAILY_CHALLENGE')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href={`/${lang}/home/course/${query.course_id}/cards?type=feelings`}
            active={query.type === 'feelings'}
            onClick={(e) => filter(e, 'feelings')}>
            Feelings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href={`/${lang}/home/course/${query.course_id}/cards?type=needs`}
            active={query.type === 'needs'}
            onClick={(e) => filter(e, 'needs')}>
            Needs
          </NavLink>
        </NavItem>
      </Nav>
      <div className="row">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={classnames('col-6 col-md-6 my-3', {
              'col-lg-4 col-xl-3': card.type === 'challenge',
              'col-lg-6 col-xl-4': card.type !== 'challenge',
            })}>
            <CardInner
              className={classnames(card.type, {
                open: opened[card.id],
              })}
              onClick={() =>
                setOpen({ ...opened, [card.id]: !opened[card.id] })
              }>
              <CardFront>
                <img
                  style={{
                    height: 175,
                    width: card.type !== 'challenge' && 250,
                  }}
                  src={`/images/card-${card.type}.svg`}
                  alt={card.type}
                  className={classnames('img-fluid border p-3', {
                    'rounded-circle': card.type === 'challenge',
                    rounded: card.type !== 'challenge',
                  })}
                />
              </CardFront>
              <CardBack
                className={classnames('border', card.type, {
                  'rounded-circle': card.type === 'challenge',
                  rounded: card.type !== 'challenge',
                })}>
                <CardBackBorder
                  className={classnames('border', {
                    'rounded-circle': card.type === 'challenge',
                    rounded: card.type !== 'challenge',
                  })}>
                  <div className="d-flex align-items-center h-100 justify-content-center">
                    {card.text}
                  </div>
                  {card.type === 'challenge' && (
                    <Button size="sm" onClick={(e) => choose(e, card.text)}>
                      {t('CHOOSE')}
                    </Button>
                  )}
                </CardBackBorder>
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
  &.feelings,
  &.needs {
    width: 250px !important;
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
  &.challenge {
    color: white;
    background-color: #00a8e8;
  }
  &.feelings {
    color: #555;
    background-color: #f9cde0;
  }
  &.needs {
    color: white;
    background-color: #1ca9e5;
  }
`;

const CardBackBorder = styled(CardFrontBack)`
  top: -5%;
  left: -5%;
  padding: 1rem;
  width: 110%;
  height: 110%;
  background: transparent;
`;
