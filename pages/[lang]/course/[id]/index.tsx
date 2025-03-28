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
import moment from 'moment-timezone';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import striptags from 'striptags';

import { UserContext } from 'lib/UserContext';

import media from 'components/Media';
import GetTickets from 'components/GetTickets';
import Icon from 'components/Icon';
import Link from 'components/Link';
import Meta from 'components/Meta';
import Loading from 'components/Loading';
import useTranslation from 'hooks/useTranslation';

interface Trainer {
  name: string;
  avatar_url: string;
  bio: string;
}

const GET_COURSE = gql`
  query courseContent($id: ID!) {
    Course(where: { id: $id }) {
      id
      title
      description
      about
      details
      facebookLink
      ticketUrl
      videoUrl
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

function CTA({ course_id, start, end, ticketUrl }) {
  const { t, locale } = useTranslation();
  const beforeTheEvent = moment(new Date()).isBefore(start);
  const duringTheEvent = moment(new Date()).isBetween(start, end);
  const afterTheEvent = moment(new Date()).isAfter(end);

  const { user } = useContext(UserContext);

  if (!user && beforeTheEvent) {
    return <GetTickets course_id={course_id} ticket_url={ticketUrl} />;
  } else if ((!user && duringTheEvent) || (!user && afterTheEvent)) {
    return (
      <Link
        href="/[lang]/signin"
        as={`/${locale}/signin`}
        className="btn btn-lg rounded-pill my-4 btn-primary">
        {t('SIGN_IN')}
      </Link>
    );
  }
  return (
    <Link
      href="/[lang]/home"
      as={`/${locale}/home`}
      className="btn btn-lg rounded-pill my-4 btn-primary">
      {t('HOME')}
    </Link>
  );
}

CTA.propTypes = {
  course_id: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  ticketUrl: PropTypes.string,
};

function Landing() {
  const { t, locale } = useTranslation();
  const { user } = useContext(UserContext);
  const [faq, setFAQIsOpen] = useState({});
  const toggleFAQ = (index) =>
    setFAQIsOpen((prev) => ({ ...prev, [index]: !prev[index] }));

  const tra: Trainer = { name: '', avatar_url: '', bio: '' };
  const [trainer, setTrainer] = useState(tra);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      <Icon shape="x" />
    </button>
  );

  const { query } = useRouter();
  const variables = { id: query.id };
  const { data, loading } = useQuery(GET_COURSE, {
    variables,
  });

  if (loading) return <Loading />;

  const course = data.Course;
  const faqs = data.allFAQS;

  if (!course) return null;

  moment.locale(locale);

  const timeZone = moment.tz.guess();
  const timeZoneOffset = new Date().getTimezoneOffset();
  const tzName = moment.tz.zone(timeZone).abbr(timeZoneOffset);
  const startDate = moment(course.dateStart)
    .tz(tzName)
    .format('h:mm a z dddd, MMMM Do');
  const endDate = moment(course.dateEnd)
    .tz(tzName)
    .format('h:mm a z dddd, MMMM Do YYYY');
  const isPastEvent = moment(new Date()).isAfter(course.dateEnd);
  const courseDates = t('COURSE_DATES', { startDate, endDate });

  const cta = (
    <CTA
      course_id={course.id}
      start={course.dateStart}
      end={course.dateEnd}
      ticketUrl={course.ticketUrl}
    />
  );

  return (
    <>
      {/* title and description for SEO */}
      <Meta
        title={striptags(course.title)}
        description={striptags(course.description)}
      />

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
        <ImgAffiliates
          src="/images/logo-cnvc.svg"
          alt="Center for nonviolent communication logo"
        />
      </div>

      {/* Video presentation section */}
      {course.videoUrl && (
        <div className="pt-5 mt-4 container" id="video">
          <div
            className="embed-responsive embed-responsive-16by9"
            style={{ borderRadius: 15 }}>
            <iframe
              title="a video presentation"
              frameBorder="1"
              className="embed-responsive-item"
              sandbox="allow-same-origin allow-scripts"
              src={course.videoUrl}
              allowFullScreen></iframe>
          </div>
        </div>
      )}

      <div className="container">
        {/* About section */}
        <Section className="mt-4 py-5 border-top-0" id="about" tabIndex={-1}>
          <Narrow className="mx-auto">
            <h2 className="text-center py-3">{t('ABOUT')}</h2>
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
            <h2 className="text-center py-3">{t('COURSE')}</h2>
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
            <h2 className="text-center py-3">{t('TRAINERS')}</h2>
            {/* <div className="pb-4 text-center">{data.trainers_intro}</div> */}
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
                {t('CLOSE')}
              </Button>
            </ModalFooter>
          </Modal>
          <div className="pt-3 text-center">{cta}</div>
        </Section>

        {/* FAQ section */}
        {faqs.length > 0 && (
          <Section id="faq" tabIndex={-1}>
            <h2 className="text-center py-3">{t('FAQ_ABBR')}</h2>
            <Narrow className="mx-auto pl-sm-5">
              {faqs.map((item, index) => (
                <div
                  className={classnames('py-2 px-sm-2', {
                    'bg-light rounded-lg': faq[index],
                  })}
                  key={item.id}>
                  <span
                    className="d-flex align-items-top"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleFAQ(index)}>
                    <Icon
                      shape={faq[index] ? 'chevron-up' : 'chevron-down'}
                      className="flex-shrink-0"
                    />
                    <span className="font-weight-bold">{item.question}</span>
                  </span>
                  <Collapse style={{ marginLeft: 30 }} isOpen={faq[index]}>
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
        )}

        {/* Registration section */}
        {!user && !isPastEvent && (
          <Section>
            <h2 className="text-center pt-3">Register</h2>
            <Narrow className="px-2 py-4 mx-auto text-center">
              <ReactMarkdown source={course.description} escapeHtml={false} />
              <PreserveLineBreaks className="my-2 text-muted">
                {courseDates}
              </PreserveLineBreaks>
              <div className="mt-4 d-flex align-items-center justify-content-center">
                <GetTickets
                  course_id={course.id}
                  ticket_url={course.ticketUrl}
                />
                <a
                  className="nav-link text-accent"
                  href={course.facebookLink}
                  target="_blank"
                  rel="noreferrer">
                  {t('CHECK_FACEBOOK_EVENT')}{' '}
                  <Icon
                    shape="external-link"
                    width={20}
                    height={20}
                    className="pb-1"
                  />
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
