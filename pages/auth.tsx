import React, { useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import { useRouter } from 'next/router';

export default (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const { user, authenticating, error } = useContext(UserContext);

    if (authenticating && !user) return <div>Authenticating...</div>;
    if ((!user && !authenticating) || error) {
      router.push('/signin?fail=1');
      return null;
    }

    if (user) return <Component {...props} />;
  };

  return Auth;
};
