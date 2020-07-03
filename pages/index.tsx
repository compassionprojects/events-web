import React, { useState } from 'react';
import styled from 'styled-components';
import { Collapse, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import data from '../data';

function Landing() {
  const [state, setIsOpen] = useState({});
  const toggle = (index) =>
    setIsOpen((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <>
      <Head>
        <title>{data.mission_title}</title>
        <meta name="description" content={data.mission_description} />
      </Head>
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
            <h1 className="text-center py-3">About</h1>
            <ReactMarkdown source={data.about} />
          </Narrow>
        </div>
        <Section>
          <Narrow className="mx-auto">
            <h1 className="text-center py-3">Course</h1>
            <ReactMarkdown source={data.course} />
            <div className="pt-3 text-center">
              <BuyTicket />
            </div>
          </Narrow>
        </Section>
        <Section>
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
        </Section>
        <Section>
          <Narrow className="mx-auto">
            <h1 className="text-center py-3">Trainers</h1>
            {data.trainers_intro}
            <Row>
              {data.trainers.map((item, index) => (
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
        </Section>
        <div className="mt-4 py-5">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              title="a video presentation on vic"
              frameBorder="1"
              className="embed-responsive-item"
              sandbox="allow-same-origin allow-scripts"
              src={data.video_embed_url}
              allowFullScreen></iframe>
          </div>
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
        alt={name}
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

const Description = styled.div`
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

const Section = styled.section.attrs({
  className: 'mt-4 py-5 border-top',
})``;
