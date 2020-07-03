import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Collapse,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import Icon from '../components/Icon';
import data from '../data';

interface Trainer {
  name: string;
  image_url: string;
  bio: string;
}

function Landing() {
  const [faq, setFAQIsOpen] = useState({});
  const toggleFAQ = (index) =>
    setFAQIsOpen((prev) => ({ ...prev, [index]: !prev[index] }));

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const t: Trainer = { name: '', image_url: '', bio: '' };
  const [trainer, setTrainer] = useState(t);

  return (
    <>
      {/* title and description for SEO */}
      <Head>
        <title>{data.mission_title}</title>
        <meta name="description" content={data.mission_description} />
      </Head>

      {/* Cover section for the fold */}
      <Cover className="text-white text-center" id="top">
        <Narrow className="px-2 py-5 mx-auto">
          <h1 className="pt-5">{data.mission_title}</h1>
          <p className="lead pt-4">{data.mission_description}</p>
          <BuyTicket />
        </Narrow>
      </Cover>

      <div className="container">
        {/* About section */}
        <div className="mt-4 py-5" id="about">
          <Narrow className="mx-auto">
            <h1 className="text-center py-3">About</h1>
            <ReactMarkdown source={data.about} />
          </Narrow>
        </div>

        {/* Course section */}
        <Section id="course">
          <Narrow className="mx-auto">
            <h1 className="text-center py-3">Course</h1>
            <ReactMarkdown source={data.course} />
            <div className="pt-3 text-center">
              <BuyTicket />
            </div>
          </Narrow>
        </Section>

        {/* FAQ section */}
        <Section id="faq">
          <h1 className="text-center py-3">Frequently Asked Questions</h1>
          <Narrow className="mx-auto pl-sm-5">
            {data.faqs.map((item, index) => (
              <div className="py-2" key={index}>
                <a
                  className="d-flex align-items-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleFAQ(index)}>
                  <Icon shape={faq[index] ? 'chevron-up' : 'chevron-down'} />
                  <span className={faq[index] ? 'font-weight-bold' : ''}>
                    {item.question}
                  </span>
                </a>
                <Collapse style={{ marginLeft: 30 }} isOpen={faq[index]}>
                  {item.answer}
                </Collapse>
              </div>
            ))}
          </Narrow>
        </Section>

        {/* Trainers section */}
        <Section id="trainers">
          <Narrow className="mx-auto">
            <h1 className="text-center py-3">Trainers</h1>
            <div className="pb-4">{data.trainers_intro}</div>
            <Row>
              {data.trainers.map((item, index) => (
                <Col
                  key={index}
                  className="text-center"
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}>
                  <Trainer
                    {...item}
                    setTrainer={({ ...args }) => {
                      setTrainer({ ...args });
                      toggleModal();
                    }}
                  />
                </Col>
              ))}
            </Row>
            <Modal isOpen={modal} fade={false} toggle={toggleModal} centered>
              <ModalHeader toggle={toggleModal}>
                <div className="d-flex">
                  <img
                    width="30"
                    height="30"
                    alt={trainer.name}
                    src={trainer.image_url}
                    className="mr-2 img-fluid rounded-circle"
                  />
                  <span>{trainer.name}</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <ReactMarkdown source={trainer.bio} />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={toggleModal}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </Narrow>
        </Section>

        {/* Video presentation section */}
        <div className="mt-4 py-5" id="video">
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

        {/* Last CTA */}
        <div className="py-5 text-center">
          <BuyTicket />
        </div>
      </div>
    </>
  );
}

export default Landing;

function Trainer({ name, image_url, bio, setTrainer }) {
  const openModal = (e) => {
    e.preventDefault();
    setTrainer({ name, image_url, bio });
  };
  return (
    <>
      <div className="my-3">
        <img
          alt={name}
          src={image_url}
          className="img-fluid rounded-circle"
          style={{ height: 120, margin: '0 auto', cursor: 'pointer' }}
          onClick={openModal}
        />
        <a className="mt-3 h6 d-block" href="" onClick={openModal}>
          {name}
        </a>
      </div>
    </>
  );
}

Trainer.propTypes = {
  name: PropTypes.string,
  bio: PropTypes.string,
  image_url: PropTypes.string,
  setTrainer: PropTypes.func,
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

const Section = styled.section.attrs({
  className: 'mt-4 py-5 border-top',
})``;
