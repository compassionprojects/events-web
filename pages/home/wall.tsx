import React, { useRef, useContext, useState } from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, Button, Form, FormGroup } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Router, { useRouter } from 'next/router';
import classnames from 'classnames';
import moment from 'moment';

import { UserContext } from '../../lib/UserContext';
import withAuth from '../auth';
import Meta from '../../components/Meta';
import Loading from '../../components/Loading';
import Icon from '../../components/Icon';

const meta = {
  title: 'Walls',
};

const GET_MESSAGE_TYPES = gql`
  query getMessageTypes($typeId: ID!) {
    allMessageTypes {
      id
      title
    }
    MessageType(where: { id: $typeId }) {
      title
    }
  }
`;

const GET_MESSAGES = gql`
  query getMessages($typeId: ID!, $skip: Int, $first: Int) {
    allMessages(
      where: { type: { id: $typeId }, parent_is_null: true }
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
      }
      createdAt
      replies(sortBy: createdAt_DESC) {
        id
        body
        parent {
          id
        }
        createdBy {
          id
          name
        }
        createdAt
      }
    }
    _allMessagesMeta(where: { type: { id: $typeId }, parent_is_null: true }) {
      count
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation createMessage($body: String!, $typeId: ID!) {
    createMessage(data: { body: $body, type: { connect: { id: $typeId } } }) {
      id
      body
      type {
        id
        title
      }
      createdBy {
        id
        name
      }
      createdAt
      replies(sortBy: createdAt_DESC) {
        id
        body
        parent {
          id
        }
        createdBy {
          id
          name
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
      }
      createdAt
      replies(sortBy: createdAt_DESC) {
        id
        body
        parent {
          id
        }
        createdBy {
          id
          name
        }
        createdAt
      }
    }
  }
`;

function Wall() {
  const { query } = useRouter();
  const limit = 15;
  const variables = { typeId: query.type, first: limit, skip: 0 };
  const [deletingId, setDeleting] = useState(null);
  const [openReplies, setOpenReplies] = useState({});
  const [update, { loading: um }] = useMutation(UPDATE_MESSAGE);
  const [deleteMessage, { loading: dm }] = useMutation(DELETE_MESSAGE);
  const [create, { loading: cm }] = useMutation(CREATE_MESSAGE);
  const { data: dataMessageTypes, loading: lt } = useQuery(GET_MESSAGE_TYPES, {
    variables: { typeId: query.type },
  });
  const { data: dataMessages, loading: lm, fetchMore } = useQuery(
    GET_MESSAGES,
    { variables }
  );
  const loading = lt || lm;

  const { allMessageTypes = [] } = dataMessageTypes || {};
  const { allMessages = [], _allMessagesMeta = {} } = dataMessages || {};
  const { count = 0 } = _allMessagesMeta;

  const filter = (e, typeId) => {
    e.preventDefault();
    Router.push({
      pathname: '/home/wall',
      query: { type: typeId },
    });
  };

  const post = (e, inputRef) => {
    e.preventDefault();
    create({
      variables: { body: inputRef.current.value, typeId: query.type },
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
    setDeleting(parseInt(message.id));
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this message?')) {
      setDeleting(null);
      return;
    }
    deleteMessage({
      variables: { id: message.id },
      update: (store) => {
        setDeleting(null);
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: GET_MESSAGES, variables });

        // Write our data back to the cache by removing the deleted item
        store.writeQuery({
          query: GET_MESSAGES,
          variables,
          data: {
            allMessages: data['allMessages']
              .filter((m) => m.id !== message.id)
              .map((m) => ({
                ...m,
                replies: m.replies.filter((m) => m.id !== message.id),
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
              href="/home/wall"
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
        placeholder="Share what's on your mind!"
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
          &nbsp;&nbsp;
          <a href="" className="small" onClick={(e) => openReply(e, message)}>
            reply
          </a>
          {message.id in openReplies && (
            <div className="py-3">
              <Respond
                onSubmit={(e, ref) => reply(e, ref, message)}
                loading={um}
                placeholder="Share what's on your mind!"
                btnTitle="Reply"
                btnSmall
                min={1}
                max={2}
              />
            </div>
          )}
          {message.replies.map((m) => (
            <Message
              {...m}
              key={m.id}
              deletingId={deletingId}
              deleteInProgress={dm}
              removeMessage={remove}
              className="px-3 py-2 small border-top"
              verticalSpacing="py-1"
            />
          ))}
        </Message>
      ))}

      {allMessages.length < count && (
        <>
          <br />
          <Button color="outline-primary" block onClick={loadMore}>
            Load more ({count - allMessages.length})
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
        {btnTitle} {loading && <Loading />}
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
  createdAt,
  body,
  deletingId,
  deleteInProgress,
  removeMessage,
  className,
  verticalSpacing,
  children,
}) {
  const { user } = useContext(UserContext);
  return (
    <div
      key={id}
      className={classnames('d-flex', className, verticalSpacing, {
        'bg-deleting': deletingId === id,
      })}>
      <div
        className="rounded bg-light mt-1 mr-3 flex-shrink-0"
        style={{ width: 50, height: 50 }}
      />
      <div className="w-100">
        <div className="d-flex align-items-center">
          <b className="mr-auto">{createdBy.name}</b>
          {createdBy.id === user.id && (
            <a href="" onClick={(e) => removeMessage(e, { id, parent })}>
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
        <div className={verticalSpacing}>{body}</div>
        <span className="text-muted small">{moment(createdAt).fromNow()}</span>

        {children}
      </div>
    </div>
  );
}

Message.propTypes = {
  id: PropTypes.string,
  createdBy: PropTypes.object,
  createdAt: PropTypes.string,
  body: PropTypes.string,
  deletingId: PropTypes.number,
  deleteInProgress: PropTypes.bool,
  removeMessage: PropTypes.func,
  className: PropTypes.string,
  verticalSpacing: PropTypes.string,
  children: PropTypes.node,
};

Message.defaultProps = {
  verticalSpacing: 'py-2',
};
