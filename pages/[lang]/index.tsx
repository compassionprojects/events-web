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
// import striptags from 'striptags';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import { UserContext } from 'lib/UserContext';
import GetTickets from 'components/GetTickets';
import Icon from 'components/Icon';
import media, { sizes } from 'components/Media';
import Link from 'components/Link';
// import Meta from 'components/Meta';
import Loading from 'components/Loading';
import PreserveLineBreaks from 'components/PreserveLineBreaks';
import useTranslation from 'hooks/useTranslation';
import ImgUnselectable from 'components/ImgUnselectable';

// Featured course:
const COURSE_ID = 1;

interface Attachment {
  file: {
    publicUrl: string;
  };
}

interface Trainer {
  name: string;
  avatar_url: string;
  attachment: Attachment;
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
      videoUrl
      dateStart
      dateEnd
      cancelled
      trainers {
        id
        name
        bio
        avatar_url
        attachment {
          file {
            publicUrl
          }
        }
      }
    }
    allFAQS(where: { courses_some: { id: $id } }, sortBy: [id_ASC]) {
      id
      question
      answer
    }
  }
`;

function LinkInternal({ path, title }) {
  return (
    <Link href={path} as={path} className="btn btn-lg my-4 btn-primary">
      {title}
    </Link>
  );
}

LinkInternal.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
};

function CTA({ ...props }) {
  const { t, locale } = useTranslation();
  const beforeTheEvent = moment(new Date()).isBefore(props.start);
  const duringTheEvent = moment(new Date()).isBetween(props.start, props.end);
  const afterTheEvent = moment(new Date()).isAfter(props.end);

  const { user } = useContext(UserContext);
  if (!user && beforeTheEvent) {
    return <GetTickets {...props} />;
  } else if ((!user && duringTheEvent) || (!user && afterTheEvent)) {
    return <LinkInternal path={`/${locale}/signin`} title={t('SIGN_IN')} />;
  }
  return <LinkInternal path={`/${locale}/home`} title={t('HOME')} />;
}

CTA.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  course_id: PropTypes.number,
};

function Landing() {
  const { t, locale } = useTranslation();
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

  const trnr: Trainer = {
    name: '',
    avatar_url: '',
    bio: '',
    attachment: { file: { publicUrl: '' } },
  };
  const [trainer, setTrainer] = useState(trnr);

  // course id
  const variables = { id: COURSE_ID };
  const { data, loading } = useQuery(GET_COURSE, {
    variables,
  });

  if (loading) {
    return (
      <>
        <LandingStyles />
        <div className="mt-5 text-center pt-5">
          <Loading color="primary" />
        </div>
      </>
    );
  }

  const course = data.Course;
  const faqs = data.allFAQS;

  if (!course) return null;

  // Set moment locale
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
  const courseDates = t('COURSE_DATES', { startDate, endDate });

  const cta = !course.cancelled && (
    <CTA
      start={course.dateStart}
      end={course.dateEnd}
      course_id={parseInt(course.id)}
    />
  );

  return (
    <>
      {/* title and description for SEO */}
      {/* @todo enable once there's a mechanism to generate a dynamic one */}
      {/* <Meta
        title={striptags(course.title)}
        description={striptags(course.description)}
        image_url="/images/social-media-banner.png"
      /> */}

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
          <div className="my-4">
            <PreserveLineBreaks
              dangerouslySetInnerHTML={{ __html: courseDates }}
            />
            <div className="mt-2 small text-muted">
              ({t('DISPLAYED_IN_YOUR_TZ')})
            </div>
          </div>
          {cta}
          {course.cancelled && (
            <div className="py-3 text-danger">{t('COURSE_CANCELLED')}</div>
          )}
          <div className="mb-2"></div>
        </Narrow>
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
              title="a video presentation of the course"
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
            <div className="pb-4 text-center">{t('TRAINERS_INTRO')}</div>
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
                  src={trainer.attachment.file.publicUrl}
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
              {faqs.map((item) => (
                <div
                  className={classnames('py-4 my-1 px-sm-2', {
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
                    <Answer>
                      <ReactMarkdown
                        linkTarget="_blank"
                        source={item.answer}
                        escapeHtml={false}
                      />
                    </Answer>
                  </Collapse>
                </div>
              ))}
            </Narrow>
          </Section>
        )}

        {/* Register tickets section */}
        {!user && !course.cancelled && (
          <Section>
            <h2 className="text-center pt-3">{t('GET_TICKETS')}</h2>
            <Narrow className="px-2 py-4 mx-auto text-center">
              <ReactMarkdown source={course.description} escapeHtml={false} />
              <PreserveLineBreaks
                className="my-2 text-muted"
                dangerouslySetInnerHTML={{ __html: courseDates }}
              />
              <div className="mt-2 small text-muted">
                ({t('DISPLAYED_IN_YOUR_TZ')})
              </div>
              <div className="mt-4 d-flex align-items-center justify-content-center">
                <GetTickets course_id={course.id} />
                {course.facebookLink && (
                  <a
                    className="ml-3"
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
                )}
              </div>
            </Narrow>
          </Section>
        )}
      </div>
    </>
  );
}

export default Landing;

function Trainer({ name, avatar_url, bio, attachment, setTrainer }) {
  const openModal = (e) => {
    e.preventDefault();
    setTrainer({ name, avatar_url, bio, attachment });
  };
  return (
    <>
      <div className="my-3">
        <div
          onClick={openModal}
          className="rounded-circle"
          style={{
            background: `url(${
              avatar_url || attachment.file.publicUrl
            }) no-repeat`,
            backgroundSize: 'cover',
            height: 120,
            width: 120,
            margin: '0 auto',
            cursor: 'pointer',
          }}
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
  attachment: PropTypes.object,
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

const ImgAffiliates = styled(ImgUnselectable).attrs({
  className: 'mx-3',
})`
  height: 80px;
`;

const Answer = styled.div`
  p {
    margin: 0;
  }
`;
