import React, { useRef, useContext, useState } from 'react';
import { gql } from 'apollo-boost';
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
      where: { type: { id: $typeId } }
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
      replies {
        id
        body
        createdBy {
          id
          name
        }
        createdAt
      }
    }
    _allMessagesMeta(where: { type: { id: $typeId } }) {
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
      replies {
        id
        body
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

function Wall() {
  const { query } = useRouter();
  const { user } = useContext(UserContext);
  const limit = 15;
  const variables = { typeId: query.type, first: limit, skip: 0 };
  const inputRef = useRef(null);
  const [deleting, setDeleting] = useState(null);
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

  const { allMessageTypes = [], MessageType = {} } = dataMessageTypes || {};
  const { allMessages = [], _allMessagesMeta = {} } = dataMessages || {};
  const { count = 0 } = _allMessagesMeta;

  const filter = (e, typeId) => {
    e.preventDefault();
    Router.push({
      pathname: '/home/wall',
      query: { type: typeId },
    });
  };

  const post = (e) => {
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
      },
    });
    inputRef.current.value = '';
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
            allMessages: data['allMessages'].filter((m) => m.id !== message.id),
            _allMessagesMeta: {
              ...data['_allMessagesMeta'],
              count: data['_allMessagesMeta'].count - 1,
            },
          },
        });
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

      <Form onSubmit={post} className="mb-4">
        <FormGroup>
          <textarea
            rows={2}
            onFocus={() => (inputRef.current.rows = 4)}
            onBlur={() => {
              if (inputRef.current.value) return;
              inputRef.current.rows = 2;
            }}
            className="form-control"
            ref={inputRef}
            required
            placeholder={`Share ${MessageType.title}`}
          />
        </FormGroup>
        <Button color="primary" className="rounded-pill" disabled={cm}>
          Share {cm && <Loading />}
        </Button>
      </Form>

      {allMessages.map((message) => (
        <div
          key={message.id}
          className={classnames('py-4 border-top d-flex px-4', {
            'bg-deleting': deleting === message.id,
          })}>
          <div
            className="rounded bg-light mt-1 mr-3 flex-shrink-0"
            style={{ width: 50, height: 50 }}
          />
          <div className="w-100">
            <div className="d-flex align-items-center">
              <b className="mr-auto">{message.createdBy.name}</b>
              {message.createdBy.id === user.id && (
                <a href="" onClick={(e) => remove(e, message)}>
                  <Icon
                    shape="trash-2"
                    className="text-danger"
                    width={15}
                    height={15}
                  />
                  {dm && <Loading />}
                </a>
              )}
            </div>
            <div className="py-2">{message.body}</div>
            <span className="text-muted small">
              {moment(message.createdAt).fromNow()}
            </span>
            &nbsp;&nbsp;
            <a href="" className="small" onClick={(e) => e.preventDefault()}>
              reply
            </a>
          </div>
        </div>
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
