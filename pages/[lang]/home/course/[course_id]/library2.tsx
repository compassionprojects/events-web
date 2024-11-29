import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import ReactMarkdown from 'react-markdown';
import Router, { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import {
  Collapse,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
} from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment-timezone';
import msf from 'moment-shortformat';
import striptags from 'striptags';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import Meta from 'components/Meta';
import Loading from 'components/Loading';
import Icon from 'components/Icon';
import ImgUnselectable from 'components/ImgUnselectable';
// import Link from 'components/Link';
import withAuth from 'hocs/auth';
import useTranslation from 'hooks/useTranslation';
import truncate from 'truncate';
import { disableRightClick } from './library/index';
import { Trainers } from './schedule2';

const GET_SESSIONS = gql`
  query getSessions($courseId: ID!) {
    allSessions(
      where: { course: { id: $courseId } }
      sortBy: startDateTime_ASC
    ) {
      id
      startDateTime
      endDateTime
      videoRecordingUrl
      title
      description
      startDateTime
      endDateTime
      room {
        title
      }
      attachments {
        id
        file {
          publicUrl
          originalFilename
          mimetype
        }
      }
      trainers {
        id
        name
        attachment {
          file {
            publicUrl
          }
        }
      }
    }
  }
`;

function Library() {
  const { t, locale } = useTranslation();
  const meta = {
    title: t('LIBRARY'),
  };
  moment.locale(locale);

  const { query } = useRouter();
  const variables = {
    courseId: query.course_id,
  };
  const { data, loading } = useQuery(GET_SESSIONS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const sessions = data?.allSessions || [];

  // get sessions where we have a video recording or an attachment
  const grouped = sessions
    .filter((s) => s.attachments.length > 0 || s.videoRecordingUrl)
    .reduce((groups, session) => {
      const date = moment(session.startDateTime).format('YYYY-MM-DD');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(session);
      return groups;
    }, {});

  const days = Object.keys(grouped);

  const isSame = (day) => moment().isSame(day, 'day');
  const isHappening = (session) =>
    moment().isBetween(session.startDateTime, session.endDateTime);

  const getActiveSession = (id) =>
    id && sessions.filter((s) => s.id.toString() === id.toString())[0];

  const getSelectedDate = (s) =>
    moment((s && s.startDateTime) || new Date()).format('YYYY-MM-DD');

  const [selected, setSession] = useState(getActiveSession(query.session_id));
  const [isOpen, setIsOpen] = useState(getSelectedDate(selected));

  const toggle = (day) => setIsOpen(day);

  const selectSession = (session) => (e) => {
    e.preventDefault();
    Router.push({
      pathname: `/[lang]/home/course/[course_id]/library2`,
      query: {
        course_id: query.course_id,
        lang: locale,
        session_id: session.id,
      },
    });
    setSession(session);
  };

  useEffect(() => {
    setSession(getActiveSession(query.session_id));
  }, [sessions]);

  useEffect(() => {
    toggle(getSelectedDate(selected));
  }, [selected]);

  return (
    <>
      <Meta {...meta} />
      <h2 className="d-flex align-items-center">
        <span className="pr-2">{meta.title}</span>
        {loading && <Loading color="primary" />}
      </h2>
      <div className="row">
        <div className="col-md-12 col-lg-7">
          {selected && (
            <div className="my-3">
              <h4>{selected.title}</h4>
              <div className="text-muted small mb-3">
                {moment(selected.startDateTime).format('DD MMM YYYY')}{' '}
                {moment(selected.startDateTime).format('HH:mm')} -{' '}
                {moment(selected.endDateTime).format('HH:mm')}
              </div>
              <ReactMarkdown
                source={selected.description}
                escapeHtml={false}
                linkTarget="_blank"
              />
              <Trainers items={selected.trainers} />
              <Video url={selected.videoRecordingUrl} />
              <Files items={selected.attachments} />
            </div>
          )}
          {!selected && (
            <div className="py-5 text-center">
              <ImgUnselectable
                className="img-fluid"
                src="/images/icon-select.png"
                style={{ height: 200, opacity: 0.2 }}
              />
              <div className="mt-4 text-muted">{t('SELECT_SESSION')}</div>
            </div>
          )}
        </div>
        <div className="col-md-12 col-lg-5">
          {days.map((day, index) => (
            <div key={day}>
              <div
                onClick={() => toggle(day)}
                className={classnames(
                  'py-2 px-2 my-1 rounded d-flex text-muted align-items-center',
                  {
                    'cursor-pointer bg-light': isOpen !== day,
                    'bg-muted': isOpen === day,
                  }
                )}
                id={`day${index}`}>
                <Icon
                  shape={isOpen === day ? 'chevron-down' : 'chevron-right'}
                />
                <div>
                  {' '}
                  {t('DAY')} {index + 1}{' '}
                  {isSame(day) && (
                    <small className="text-success pl-2">
                      <b>{t('TODAY')}</b>
                    </small>
                  )}
                </div>
                <div className="ml-auto small">
                  {moment(day).format('DD MMM YYYY')}
                </div>
              </div>
              <Collapse isOpen={isOpen === day}>
                <ListGroup tag="div">
                  {grouped[day].map((session) => (
                    <ListGroupItem
                      key={session.id}
                      tag="a"
                      onClick={selectSession(session)}
                      className={classnames(
                        'list-group-item-action cursor-pointer',
                        {
                          'list-group-item-success':
                            session.id === query.session_id,
                        }
                      )}>
                      <div className="d-flex w-100 justify-content-between align-items-center">
                        <div className="mb-1">
                          <b>{session.title}</b>
                        </div>
                        <small className="text-muted">
                          {msf(session.startDateTime).short()}
                        </small>
                      </div>
                      <ListGroupItemText>
                        {truncate(striptags(session.description), 80)}
                      </ListGroupItemText>
                      <div className="d-flex w-100 justify-content-between align-items-center text-muted">
                        <small>
                          {session.trainers
                            .map((t) => t.name.split(' ')[0])
                            .join(', ')}
                        </small>
                        <span>
                          {session.videoRecordingUrl && (
                            <Icon width={20} shape="video" className="mr-3" />
                          )}
                          {session.attachments.length > 0 && (
                            <Icon width={20} shape="paperclip" />
                          )}
                        </span>
                      </div>
                      {isHappening(session) && (
                        <div className="text-success small">
                          <b>{t('HAPPENING_NOW')}</b>
                        </div>
                      )}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default withAuth(Library);

function Video({ url }) {
  if (!url) return null;
  const isOneDrive = url.includes('onedrive.live.com');
  return (
    <div
      className="embed-responsive embed-responsive-16by9"
      style={{ borderRadius: 15 }}>
      {!isOneDrive && (
        <iframe
          className="embed-responsive-item rounded"
          src={url}
          allowFullScreen></iframe>
      )}
      {isOneDrive && (
        <video
          onContextMenu={disableRightClick}
          width="auto"
          height="auto"
          controls
          controlsList="nodownload">
          <source src={url} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

Video.propTypes = {
  url: PropTypes.string,
};

function Files({ items }) {
  if (!items) return null;
  if (!items.length) return null;
  return (
    <div className="mt-4">
      {items.map((item) => (
        <div className="my-3 text-muted" key={item.id}>
          <Icon width={20} shape="paperclip" />{' '}
          <a
            href={item.file.publicUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-muted rounded p-2">
            {item.file.originalFilename}
          </a>
        </div>
      ))}
    </div>
  );
}

Files.propTypes = {
  items: PropTypes.array,
};
