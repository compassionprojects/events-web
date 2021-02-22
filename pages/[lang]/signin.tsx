import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Form, FormGroup, Input, Button, Container } from 'reactstrap';
// import { useMutation } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';

import Icon from 'components/Icon';
import Meta from 'components/Meta';
import Loading from 'components/Loading';
import { UserContext } from 'lib/UserContext';
import { useRouter } from 'next/router';
import useTranslation from 'hooks/useTranslation';

export default function SignIn() {
  // const [startSignIn, { loading, data, error }] = useMutation(START_SIGN_IN);
  const { t, locale } = useTranslation();
  const meta = {
    title: t('SIGN_IN'),
  };
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const sendMagicLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url =
      process.env.VIC_API_HOST ||
      process.env.NEXT_PUBLIC_VIC_API_HOST ||
      'http://localhost:3000';
    const res = await fetch(`${url}/auth/magiclink?email=${email}`, {
      method: 'post',
    });
    setLoading(false);
    if (res.status !== 200) {
      setError(true);
      setSuccess(false);
    } else {
      setError(false);
      setSuccess(true);
    }
  };

  useEffect(() => {
    if (user) router.push(`/${locale}/home`);
  });

  return (
    <>
      <Meta {...meta} />
      <Container className="py-5">
        <FormStyled method="post" onSubmit={sendMagicLink}>
          <h1 className="my-4">{meta.title}</h1>
          {error && (
            <div className="text-danger pb-3">{t('CANT_FIND_EMAIL')}</div>
          )}
          {!success && (
            <>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t('EMAIL_ADDRESS')}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <Button color="primary" type="submit" disabled={loading}>
                {loading && <Loading />} {t('SEND_MAGIC_LINK')}
              </Button>
            </>
          )}
          {success && !error && (
            <div className="d-flex lead">
              <Icon shape="send" className="mt-1 mr-3 flex-shrink-0" />{' '}
              {t('MAGIC_LINK_SENT', { email })}
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
