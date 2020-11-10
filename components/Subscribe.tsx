import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Label, Form, Input, FormGroup, Button } from 'reactstrap';
import Loading from './Loading';
import mailchimp from '../lib/mailchimp';

function Subscribe({ id }) {
  if (!id) {
    throw new Error('You need a mailchimp id to use this component');
  }

  const initialState = {
    subscribing: false,
    subscribed: false,
    email: '',
    lang: 'en',
    valid: false,
  };

  const [state, setState] = useState(initialState);

  const setEmail = (e) => {
    setState({
      ...state,
      email: e.target.value,
      valid: validate(e.target.value),
    });
  };

  const subscribe = (e) => {
    e.preventDefault();
    setState({ ...state, subscribing: true });
    mailchimp(state.email, state.lang, id)
      .then(() => setState({ ...initialState, subscribed: true }))
      .catch(() => setState({ ...state, subscribing: false }));
  };

  const { subscribing, subscribed, email, valid } = state;
  return (
    <div className="mailchimp-subscribe">
      {!subscribed && (
        <Form className="mx-auto" onSubmit={subscribe}>
          <FormGroup>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={setEmail}
              value={email}
            />
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input
                name="lang"
                type="radio"
                label="English"
                checked={state.lang === 'en'}
                onChange={() => setState({ ...state, lang: 'en' })}
              />{' '}
              English
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input
                name="lang"
                type="radio"
                label="Français"
                checked={state.lang === 'fr'}
                onChange={() => setState({ ...state, lang: 'fr' })}
              />{' '}
              Français
            </Label>
          </FormGroup>

          <div className="mt-3">
            <Button
              color="primary"
              className="rounded-pill"
              disabled={subscribing || !valid}>
              {subscribing && <Loading color="primary" />}
              Subscribe
            </Button>
          </div>
        </Form>
      )}
      {subscribed && (
        <div className="font-weight-light text-success">
          Thank you for subscribing!
        </div>
      )}
    </div>
  );
}

Subscribe.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Subscribe;

function validate(email) {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}
