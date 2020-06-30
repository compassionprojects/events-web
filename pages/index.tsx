import React, { useState } from 'react';
import styled from 'styled-components';
import { Collapse, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import data from '../data';

function Landing() {
  const [state, setIsOpen] = useState({});
  const toggle = (index) =>
    setIsOpen((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <>
      <Cover className="text-white text-center">
        <Narrow className="px-2 py-5 mx-auto">
          <h1 className="pt-5">{data.mission_title}</h1>
          <p className="lead pt-4">{data.mission_description}</p>
          <BuyTicket />
        </Narrow>
      </Cover>
      <div className="container">
        <div className="mt-4 py-5">
          <Narrow className="mx-auto">
            <h1 className="text-center py-3">About us</h1>
            <AboutDescription>{data.about_us}</AboutDescription>
          </Narrow>
        </div>
        <div className="mt-5 py-5">
          <h1 className="text-center py-3">Frequently Asked Questions</h1>
          <Narrow className="mx-auto pl-sm-5">
            {data.faqs.map((item, index) => (
              <div className="py-2" key={index}>
                <a style={{ cursor: 'pointer' }} onClick={() => toggle(index)}>
                  <Icon shape={state[index] ? 'chevron-up' : 'chevron-down'} />
                  <span>{item.question}</span>
                </a>
                <Collapse style={{ marginLeft: 30 }} isOpen={state[index]}>
                  {item.answer}
                </Collapse>
              </div>
            ))}
          </Narrow>
        </div>
        <div className="mt-4 py-5">
          <Narrow className="mx-auto">
            <h1 className="text-center py-3">Speakers</h1>
            {data.speakers_intro}
            <Row>
              {data.speakers.map((item, index) => (
                <Col
                  key={index}
                  className="text-center"
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}>
                  <Speaker {...item} />
                </Col>
              ))}
            </Row>
          </Narrow>
        </div>
        <div className="py-5 text-center">
          <BuyTicket />
        </div>
      </div>
    </>
  );
}

export default Landing;

function Icon({ shape, ...props }) {
  return (
    <Feather {...props}>
      <use xlinkHref={`/images/feather-sprite.svg#${shape}`} />
    </Feather>
  );
}

Icon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  shape: PropTypes.oneOf(['chevron-down', 'chevron-up', 'external-link']),
};

function Speaker({ name, image_url }) {
  return (
    <div className="my-3">
      <img
        src={image_url}
        className="img-fluid rounded-circle"
        style={{ height: 120, margin: '0 auto' }}
      />
      <h6 className="mt-3">{name}</h6>
    </div>
  );
}

Speaker.propTypes = {
  name: PropTypes.string,
  bio: PropTypes.string,
  image_url: PropTypes.string,
};

function BuyTicket() {
  return (
    <a
      href={data.buy_ticket_url}
      rel="noreferrer"
      target="_blank"
      className="btn btn-lg btn-primary my-4">
      {data.buy_ticket_title}
      <Icon
        shape="external-link"
        width={16}
        height={16}
        style={{ paddingBottom: 3, marginLeft: 5 }}
      />
    </a>
  );
}

const Cover = styled.div`
  background: url('${data.cover_image}') no-repeat;
  background-size: 100% 100%;
  min-height: 70vh;
`;

const Narrow = styled.div`
  max-width: 600px;
`;

const AboutDescription = styled.div`
  white-space: pre-line;
`;

const Feather = styled.svg`
  width: ${(props) => props.width || 25}px;
  height: ${(props) => props.height || 25}px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 5px;
`;
