import React from 'react';
import styled from 'styled-components';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import Meta from '../components/Meta';

const meta = {
  title: 'Sign In',
};

export default function SignIn() {
  return (
    <>
      <Meta {...meta} />
      <Container className="py-5">
        <FormStyled method="post">
          <h1 className="my-4">{meta.title}</h1>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
            />
          </FormGroup>
          <Button color="primary">Send the magic link</Button>
        </FormStyled>
      </Container>
    </>
  );
}

const FormStyled = styled(Form)`
  max-width: 400px;
  margin: 0 auto;
`;
