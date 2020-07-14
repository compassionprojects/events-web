import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, FormGroup, Input, Button, Container } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Icon from '../components/Icon';
import Meta from '../components/Meta';
import Loading from '../components/Loading';

const meta = {
  title: 'Sign In',
};

const START_SIGN_IN = gql`
  mutation startSignIn($email: String!) {
    startMagicSignIn(email: $email) {
      id
    }
  }
`;

export default function SignIn() {
  const [startSignIn, { loading, data, error }] = useMutation(START_SIGN_IN);

  const [email, setEmail] = useState('');
  const sendMagicLink = (e) => {
    e.preventDefault();
    startSignIn({ variables: { email } });
  };

  return (
    <>
      <Meta {...meta} />
      <Container className="py-5">
        <FormStyled method="post" onSubmit={sendMagicLink}>
          <h1 className="my-4">{meta.title}</h1>
          {error && (
            <div className="text-danger pb-3">
              We weren&apos;t able to find that email, sorry!
            </div>
          )}
          {!data && (
            <>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <Button color="primary" type="submit" disabled={loading}>
                {loading && <Loading />} Send the magic link
              </Button>
            </>
          )}
          {data && (
            <div className="d-flex lead">
              <Icon shape="send" className="mt-1 mr-3 flex-shrink-0" />{' '}
              We&apos;ve sent a magic sign-in link to {email}.
            </div>
          )}
        </FormStyled>
      </Container>
    </>
  );
}

const FormStyled = styled(Form)`
  max-width: 400px;
  margin: 0 auto;
`;
