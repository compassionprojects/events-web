import React, { useState, useContext } from 'react';
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
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown/with-html';
import { createGlobalStyle } from 'styled-components';
import moment from 'moment-timezone';
import striptags from 'striptags';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import { UserContext } from '../lib/UserContext';
import GetTickets from '../components/GetTickets';
import Icon from '../components/Icon';
import media, { sizes } from '../components/Media';
import Link from '../components/Link';
import Meta from '../components/Meta';
import Loading from '../components/Loading';
// import data from '../data/landing';

const start = new Date(2020, 10, 10);
const end = new Date(2020, 10, 22);

const COURSE_ID = 2;

interface Trainer {
  name: string;
  avatar_url: string;
  bio: string;
}

const LandingStyles = createGlobalStyle`
  body {
    padding-top: 75px;
  }
  @media (max-width: ${sizes.mini / 16}rem) {
    body {
      padding-top: 50px;
    }
  }
`;

const GET_COURSE = gql`
  query courseContent($id: ID!) {
    Course(where: { id: $id }) {
      id
      title
      description
      about
      details
      facebookLink
      dateStart
      dateEnd
      trainers {
        id
        name
        bio
        avatar_url
      }
    }
    allFAQS(where: { courses_every: { id: $id } }) {
      id
      question
      answer
    }
  }
`;

function LinkInternal({ path, title }) {
  return (
    <Link
      href={path}
      as={path}
      className="btn btn-lg rounded-pill my-4 btn-primary">
      {title}
    </Link>
  );
}

LinkInternal.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
};

function CTA({ ...props }) {
  const beforeTheEvent = moment(new Date()).isBefore(start);
  const duringTheEvent = moment(new Date()).isBetween(start, end);
  const afterTheEvent = moment(new Date()).isAfter(end);

  const { user } = useContext(UserContext);
  if (!user && beforeTheEvent) {
    return <GetTickets {...props} />;
  } else if ((!user && duringTheEvent) || (!user && afterTheEvent)) {
    return <LinkInternal path="/signin" title="Sign In" />;
  }
  return <LinkInternal path="/home" title="Home" />;
}

function Landing() {
  const { user } = useContext(UserContext);
  const [faq, setFAQIsOpen] = useState({});
  const toggleFAQ = (index) =>
    setFAQIsOpen((prev) => ({ ...prev, [index]: !prev[index] }));

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      <Icon shape="x" />
    </button>
  );

  const t: Trainer = { name: '', avatar_url: '', bio: '' };
  const [trainer, setTrainer] = useState(t);

  // course id
  const variables = { id: COURSE_ID };
  const { data, loading } = useQuery(GET_COURSE, {
    variables,
  });

  if (loading) return <Loading />;

  const course = data.Course;
  const faqs = data.allFAQS;

  if (!course) return null;

  const timeZone = moment.tz.guess();
  const timeZoneOffset = new Date().getTimezoneOffset();
  const tzName = moment.tz.zone(timeZone).abbr(timeZoneOffset);
  const startDate = moment(course.dateStart)
    .tz(tzName)
    .format('h:mm a z dddd, MMMM Do YYYY');
  const endDate = moment(course.dateEnd)
    .tz(tzName)
    .format('h:mm a z dddd, MMMM Do YYYY');
  const courseDates = `Starts at ${startDate}
  until ${endDate}`;

  const cta = (
    <CTA start={course.dateStart} end={course.dateEnd} course_id={course.id} />
  );

  return (
    <>
      {/* title and description for SEO */}
      <Meta
        title={striptags(course.title)}
        description={striptags(course.description)}
        image_url="/images/social-media-banner.png"
      />

      <LandingStyles />

      {/* Cover section for the fold */}
      <Cover className="text-center">
        <Narrow className="px-2 py-sm-5 py-4 mx-auto">
          <h1 className="pt-4 pt-sm-5">
            <ReactMarkdown source={course.title} escapeHtml={false} />
          </h1>
          <div className="lead py-4">
            <ReactMarkdown source={course.description} escapeHtml={false} />
          </div>
          <PreserveLineBreaks className="my-4">
            {courseDates}
          </PreserveLineBreaks>
          {cta}
          <div className="mb-2"></div>
        </Narrow>
        <ShapeLeft />
        <ShapeRight />
      </Cover>

      <div className="d-flex justify-content-center bg-light py-5 align-items-center">
        <ImgAffiliates src="/images/logo-pf.svg" alt="Peacefactory logo" />
        <ImgAffiliates
          src="/images/logo-cnvc.svg"
          alt="Center for nonviolent communication logo"
        />
      </div>

      {/* {data.before_about && (
        <div className="container py-5 mt-4 border-bottom">
          <Narrow className="mx-auto">
            <ReactMarkdown
              linkTarget="_blank"
              source={data.before_about}
              escapeHtml={false}
            />
          </Narrow>
        </div>
      )} */}

      <div className="container">
        {/* About section */}
        <Section className="mt-4 py-5 border-top-0" id="about" tabIndex={-1}>
          <Narrow className="mx-auto">
            <h2 className="text-center py-3">About</h2>
            <ReactMarkdown
              linkTarget="_blank"
              source={course.about}
              escapeHtml={false}
            />
            <div className="pt-3 text-center">{cta}</div>
          </Narrow>
        </Section>

        {/* Course section */}
        <Section id="course" tabIndex={-1}>
          <Narrow className="mx-auto">
            <h2 className="text-center py-3">Course</h2>
            <ReactMarkdown
              linkTarget="_blank"
              source={course.details}
              escapeHtml={false}
            />
            <div className="pt-3 text-center">{cta}</div>
          </Narrow>
        </Section>

        {/* Trainers section */}
        <Section id="trainers" tabIndex={-1}>
          <Narrow className="mx-auto">
            <h2 className="text-center py-3">Trainers</h2>
            <div className="pb-4 text-center">{data.trainers_intro}</div>
            <Row className="justify-content-center">
              {course.trainers.map((item, index) => (
                <Col
                  key={index}
                  className="text-center"
                  xs={6}
                  sm={6}
                  md={4}
                  lg={4}>
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
          </Narrow>
          <Modal
            isOpen={modal}
            fade={false}
            toggle={toggleModal}
            centered
            size="lg">
            <ModalHeader toggle={toggleModal} close={closeBtn}>
              <div className="d-flex">
                <img
                  style={{ height: 30, width: 30 }}
                  alt={trainer.name}
                  src={trainer.avatar_url}
                  className="mr-2 img-fluid rounded-circle"
                />
                <span>{trainer.name}</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <ReactMarkdown
                linkTarget="_blank"
                source={trainer.bio}
                escapeHtml={false}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <div className="pt-3 text-center">{cta}</div>
        </Section>

        {/* FAQ section */}
        <Section id="faq" tabIndex={-1}>
          <h2 className="text-center py-3">Frequently Asked Questions</h2>
          <Narrow className="mx-auto pl-sm-5">
            {faqs.map((item) => (
              <div
                className={classnames('py-2 px-sm-2', {
                  'bg-light rounded-lg': faq[item.id],
                })}
                key={item.id}>
                <span
                  className="d-flex align-items-top"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleFAQ(item.id)}>
                  <Icon
                    shape={faq[item.id] ? 'chevron-up' : 'chevron-down'}
                    className="flex-shrink-0"
                  />
                  <span className="font-weight-bold">{item.question}</span>
                </span>
                <Collapse style={{ marginLeft: 30 }} isOpen={faq[item.id]}>
                  <ReactMarkdown
                    linkTarget="_blank"
                    source={item.answer}
                    escapeHtml={false}
                  />
                </Collapse>
              </div>
            ))}
          </Narrow>
        </Section>

        {/* Video presentation section */}
        {/* {data.video_embed_url && (
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
        )} */}

        {!user && (
          <Section>
            <h2 className="text-center pt-3">Register</h2>
            <Narrow className="px-2 py-4 mx-auto text-center">
              <ReactMarkdown source={course.description} escapeHtml={false} />
              <PreserveLineBreaks className="my-2 text-muted">
                {courseDates}
              </PreserveLineBreaks>
              <div className="d-flex align-items-center justify-content-center">
                <GetTickets course_id={course.id} />
                <a
                  className="nav-link text-accent"
                  href={course.facebookLink}
                  target="_blank"
                  rel="noreferrer">
                  <Icon shape="facebook" height={18} width={18} />
                  Facebook
                </a>
              </div>
            </Narrow>
          </Section>
        )}
      </div>
    </>
  );
}

export default Landing;

function Trainer({ name, avatar_url, bio, setTrainer }) {
  const openModal = (e) => {
    e.preventDefault();
    setTrainer({ name, avatar_url, bio });
  };
  return (
    <>
      <div className="my-3">
        <img
          alt={name}
          src={avatar_url}
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
  avatar_url: PropTypes.string,
  setTrainer: PropTypes.func,
};

const Cover = styled.div`
  position: relative;

  ${media.up['phone']`
    h1 span, p span {
      display: block;
    }
  `}
`;

const Narrow = styled.div`
  max-width: 700px;
`;

const Section = styled.section.attrs({
  className: 'mt-4 py-5 border-top',
})`
  outline: none;
`;

const PreserveLineBreaks = styled.div`
  white-space: pre-line;
`;

// Preventing an image from being draggable or selectable without using JS
// https://stackoverflow.com/a/12906840/232619
const ImgUnselectable = styled.img`
  pointer-events: none;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const Shape = styled(ImgUnselectable).attrs({
  alt: 'Decorative artwork of semi-circle',
})`
  opacity: 0.5;
  ${// @ts-ignore
  media.down.tablet`
    width: 256px;
    height: 256px;
  `}
`;

const ShapeLeft = styled(Shape).attrs({
  src: '/images/shape-left.svg',
})`
  position: absolute;
  left: 30px;
  bottom: 0;
`;

const ShapeRight = styled(Shape).attrs({
  src: '/images/shape-right.svg',
})`
  position: absolute;
  right: 30px;
  top: 20px;
`;

const ImgAffiliates = styled(ImgUnselectable).attrs({
  className: 'mx-3',
})`
  height: 60px;
`;
