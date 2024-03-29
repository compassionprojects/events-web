import React, { useRef, useContext, useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, Button, Form, FormGroup } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Router, { useRouter } from 'next/router';
import classnames from 'classnames';
import moment from 'moment';
import Gravatar from 'react-gravatar';
import ReactMarkdown from 'react-markdown/with-html';

import { UserContext } from 'lib/UserContext';
import withAuth from 'hocs/auth';
import Meta from 'components/Meta';
import Loading from 'components/Loading';
import Icon from 'components/Icon';
import useTranslation from 'hooks/useTranslation';

const limit = 15;
const limitReplies = 2;

const GET_MESSAGE_TYPES = gql`
  query getMessageTypes($typeId: ID!, $courseId: ID) {
    allMessageTypes(where: { courses_some: { id: $courseId } }) {
      id
      title
    }
    MessageType(where: { id: $typeId }) {
      title
    }
  }
`;

const GET_MESSAGES = gql`
  query getMessages($typeId: ID!, $skip: Int, $first: Int, $courseId: ID!) {
    allMessages(
      where: {
        type: { id: $typeId }
        parent_is_null: true
        orphaned_not: true
        course: { id: $courseId }
      }
      sortBy: createdAt_DESC
      first: $first
      skip: $skip
    ) {
      id
      body
      type {
        id
        title
      }
      createdBy {
        id
        name
        email
      }
      createdAt
      replies(sortBy: createdAt_ASC) {
        id
        body
        parent {
          id
        }
        createdBy {
          id
          name
          email
        }
        createdAt
      }
    }
    _allMessagesMeta(
      where: {
        type: { id: $typeId }
        parent_is_null: true
        orphaned_not: true
        course: { id: $courseId }
      }
    ) {
      count
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation createMessage($body: String!, $typeId: ID!, $courseId: ID!) {
    createMessage(
      data: {
        body: $body
        type: { connect: { id: $typeId } }
        course: { connect: { id: $courseId } }
      }
    ) {
      id
      body
      type {
        id
        title
      }
      createdBy {
        id
        name
        email
      }
      createdAt
      replies(sortBy: createdAt_ASC) {
        id
        body
        parent {
          id
        }
        createdBy {
          id
          name
          email
        }
        createdAt
      }
    }
  }
`;

const DELETE_MESSAGE = gql`
  mutation deleteMessage($id: ID!) {
    deleteMessage(id: $id) {
      id
    }
  }
`;

const UPDATE_MESSAGE = gql`
  mutation updateMessage($id: ID!, $body: String!, $typeId: ID!) {
    updateMessage(
      id: $id
      data: {
        replies: {
          create: {
            parent: { connect: { id: $id } }
            body: $body
            type: { connect: { id: $typeId } }
          }
        }
      }
    ) {
      id
      body
      type {
        id
        title
      }
      createdBy {
        id
        name
        email
      }
      createdAt
      replies(sortBy: createdAt_ASC) {
        id
        body
        parent {
          id
        }
        createdBy {
          id
          name
          email
        }
        createdAt
      }
    }
  }
`;

function Wall() {
  const { t, locale } = useTranslation();
  const meta = {
    title: t('MESSAGE_BOARDS'),
  };
  const { query } = useRouter();
  const variables = {
    typeId: query.type,
    first: limit,
    skip: 0,
    courseId: query.course_id,
  };
  const [visibleReplies, showAllReplies] = useState([]);
  const [deletingId, setDeleting] = useState(null);
  const [openReplies, setOpenReplies] = useState({});
  const [update, { loading: um }] = useMutation(UPDATE_MESSAGE);
  const [deleteMessage, { loading: dm }] = useMutation(DELETE_MESSAGE);
  const [create, { loading: cm }] = useMutation(CREATE_MESSAGE);
  const { data: dataMessageTypes, loading: lt } = useQuery(GET_MESSAGE_TYPES, {
    variables: { typeId: query.type, courseId: query.course_id },
  });
  const { data: dataMessages, loading: lm, fetchMore } = useQuery(
    GET_MESSAGES,
    { variables, fetchPolicy: 'cache-and-network' }
  );
  const loading = lt || lm;

  const { allMessageTypes = [] } = dataMessageTypes || {};
  const { allMessages = [], _allMessagesMeta = {} } = dataMessages || {};
  const { count = 0 } = _allMessagesMeta;

  const filter = (e, typeId) => {
    e.preventDefault();
    Router.push({
      pathname: `/[lang]/home/course/[course_id]/wall`,
      query: { type: typeId, course_id: query.course_id, lang: locale },
    });
  };

  const post = (e, inputRef) => {
    e.preventDefault();
    create({
      variables: {
        body: inputRef.current.value,
        typeId: query.type,
        courseId: query.course_id,
      },
      update: (store, { data: { createMessage } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: GET_MESSAGES, variables });

        // Write our data back to the cache.
        store.writeQuery({
          query: GET_MESSAGES,
          variables,
          data: {
            allMessages: [createMessage, ...data['allMessages']],
            _allMessagesMeta: {
              ...data['_allMessagesMeta'],
              count: data['_allMessagesMeta'].count + 1,
            },
          },
        });

        // clear input
        inputRef.current.value = '';
      },
    });
  };

  const loadMore = () => {
    fetchMore({
      variables: {
        ...variables,
        first: limit,
        skip: allMessages.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          allMessages: [
            ...prev['allMessages'],
            ...fetchMoreResult['allMessages'],
          ],
        });
      },
    });
  };

  const remove = (e, message) => {
    setDeleting(message.id);
    e.preventDefault();
    if (!window.confirm(t('CONFIRM_DELETE_MSG'))) {
      setDeleting(null);
      return;
    }
    deleteMessage({
      variables: { id: message.id },
      update: (store) => {
        setDeleting(null);
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: GET_MESSAGES, variables });

        const filter = (m) => +m.id !== +message.id;
        // Write our data back to the cache by removing the deleted item
        store.writeQuery({
          query: GET_MESSAGES,
          variables,
          data: {
            allMessages: data['allMessages'].filter(filter).map((m) => ({
              ...m,
              replies: m.replies.filter(filter),
            })),
            _allMessagesMeta: {
              ...data['_allMessagesMeta'],
              count: message.parent
                ? data['_allMessagesMeta'].count
                : data['_allMessagesMeta'].count - 1,
            },
          },
        });
      },
    });
  };

  const openReply = (e, message) => {
    e.preventDefault();
    setOpenReplies({ ...openReplies, [message.id]: true });
  };

  const reply = (e, inputRef, message) => {
    e.preventDefault();
    update({
      variables: {
        id: message.id,
        body: inputRef.current.value,
        typeId: query.type,
      },
      update: (store, { data: { updateMessage } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: GET_MESSAGES, variables });

        // Write our data back to the cache.
        store.writeQuery({
          query: GET_MESSAGES,
          variables,
          data: {
            allMessages: data['allMessages'].map((m) => {
              if (m.id === updateMessage.id) {
                m.replies = updateMessage.replies;
                // If the user has set all replies to be visible
                // make sure to add all newly created replies to the
                // visible object so that they are all visible
                if (visibleReplies.includes(m.id)) {
                  showAllReplies([
                    ...visibleReplies,
                    ...m.replies.map((m) => m.id),
                  ]);
                }
              }
              return m;
            }),
            _allMessagesMeta: data['_allMessagesMeta'],
          },
        });

        // clear input value
        inputRef.current.value = '';
      },
    });
  };

  const showReplies = (e, m) => {
    e.preventDefault();
    showAllReplies([...visibleReplies, ...m.replies.map((m) => m.id), m.id]);
  };

  return (
    <>
      <Meta {...meta} />
      <h2 className="d-flex align-items-center">
        <span className="pr-2">{meta.title}</span>
        {loading && <Loading color="primary" />}
      </h2>

      <Nav tabs className="my-4">
        {allMessageTypes.map((item) => (
          <NavItem key={item.id}>
            <NavLink
              href={`/home/course/${query.course_id}/wall`}
              active={query.type === item.id}
              onClick={(e) => filter(e, item.id)}>
              {item.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <Respond
        onSubmit={post}
        loading={cm}
        placeholder={t('SHARE_WHAT_IS_ON_YOUR_MIND')}
        className="mb-4"
      />

      {allMessages.map((message) => (
        <Message
          className="py-4 border-top px-4"
          key={message.id}
          deletingId={deletingId}
          deleteInProgress={dm}
          removeMessage={remove}
          {...message}>
          {message.replies.length > limitReplies &&
            !visibleReplies.includes(message.id) && (
              <Button
                color="light"
                block
                size="sm"
                onClick={(e) => showReplies(e, message)}>
                {t('SHOW_PREVIOUS_REPLIES')} (
                {message.replies.length - limitReplies})
              </Button>
            )}
          {message.replies.map((m, idx) => (
            <Message
              {...m}
              key={m.id}
              deletingId={deletingId}
              deleteInProgress={dm}
              removeMessage={remove}
              className="px-2 py-2 small border-top"
              style={
                /* eslint-disable-next-line prettier/prettier */
                !visibleReplies.includes(m.id) && idx <= message.replies.length - 1 - limitReplies
                  ? { display: 'none' }
                  : {}
              }
              verticalSpacing="py-1">
              <span className="text-muted small">
                {moment(m.createdAt).fromNow()}
              </span>
            </Message>
          ))}
          <span className="text-muted small">
            {moment(message.createdAt).fromNow()}
          </span>
          &nbsp;&nbsp;
          <a href="" className="small" onClick={(e) => openReply(e, message)}>
            {t('REPLY')}
          </a>
          {message.id in openReplies && (
            <div className="pt-2">
              <Respond
                onSubmit={(e, ref) => reply(e, ref, message)}
                loading={um}
                placeholder={t('SHARE_WHAT_IS_ON_YOUR_MIND')}
                btnTitle={t('REPLY')}
                btnSmall
                min={1}
                max={2}
              />
            </div>
          )}
        </Message>
      ))}

      {allMessages.length < count && (
        <>
          <br />
          <Button color="outline-primary" block onClick={loadMore}>
            {t('LOAD_MORE')} ({count - allMessages.length})
          </Button>
        </>
      )}
    </>
  );
}

export default withAuth(Wall);

function Respond({
  onSubmit,
  placeholder,
  btnTitle,
  loading,
  min,
  max,
  btnSmall,
  className,
}) {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  return (
    <Form onSubmit={(e) => onSubmit(e, inputRef)} className={className}>
      <FormGroup>
        <textarea
          rows={min}
          onFocus={() => (inputRef.current.rows = max)}
          onBlur={() => {
            if (inputRef.current.value) return;
            inputRef.current.rows = min;
          }}
          className="form-control"
          ref={inputRef}
          required
          placeholder={placeholder}
        />
      </FormGroup>
      <Button
        color="primary"
        className="rounded-pill"
        size={(btnSmall && 'sm') || ''}
        disabled={loading}>
        {t(btnTitle.toUpperCase())} {loading && <Loading />}
      </Button>
    </Form>
  );
}

Respond.propTypes = {
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  btnTitle: PropTypes.string,
  btnSmall: PropTypes.bool,
  loading: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
};

Respond.defaultProps = {
  placeholder: '',
  btnTitle: 'Share',
  btnSmall: false,
  loading: false,
  min: 2,
  max: 4,
};

function Message({
  id,
  parent,
  createdBy,
  body,
  deletingId,
  deleteInProgress,
  removeMessage,
  className,
  verticalSpacing,
  children,
  style,
}) {
  const { user } = useContext(UserContext);
  return (
    <div style={style} id={id}>
      <div
        className={classnames('d-flex', className, verticalSpacing, {
          'bg-deleting': deletingId === +id,
        })}>
        <div
          className={classnames('mt-1 flex-shrink-0', {
            'mr-3': !parent,
            'mr-2': parent,
          })}
          style={{ width: parent ? 30 : 50 }}>
          <Gravatar
            email={createdBy && createdBy.email}
            default="monsterid"
            className="rounded-circle img-fluid"
          />
        </div>
        <div className="w-100">
          <div className="d-flex align-items-center">
            <span className="mr-auto">
              <b>
                {(createdBy && createdBy.name) || 'User'}
                {!parent && (
                  <>
                    &nbsp;
                    <a href={`#${id}`}>#{id}</a>
                  </>
                )}
              </b>
            </span>
            {createdBy && createdBy.id === user.id && (
              <a href="" onClick={(e) => removeMessage(e, { id: +id, parent })}>
                <Icon
                  shape="trash-2"
                  className="text-danger"
                  width={15}
                  height={15}
                />
                {deleteInProgress && <Loading />}
              </a>
            )}
          </div>
          <MessageStyle>
            <ReactMarkdown
              className={verticalSpacing}
              source={body}
              escapeHtml={false}
              linkTarget="_blank"
              disallowedTypes={[
                'root',
                'image',
                'heading',
                'inlineCode',
                'code',
                'html',
                'virtualHtml',
              ]}
            />
          </MessageStyle>
          {children}
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  id: PropTypes.string,
  parent: PropTypes.object,
  createdBy: PropTypes.object,
  body: PropTypes.string,
  deletingId: PropTypes.number,
  deleteInProgress: PropTypes.bool,
  removeMessage: PropTypes.func,
  className: PropTypes.string,
  verticalSpacing: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

Message.defaultProps = {
  verticalSpacing: 'py-2',
  createdBy: {},
};

const MessageStyle = styled.div`
  p:last-child,
  ul:last-child,
  ol:last-child {
    margin-bottom: 0;
  }
`;
