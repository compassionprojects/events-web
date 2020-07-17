import React, { useContext, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import { useRouter } from 'next/router';

export default (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const { user, authenticating } = useContext(UserContext);

    useEffect(() => {
      if (!user && !authenticating) router.push('/signin?fail=1');
    }, []);

    if (authenticating && !user) return <div>Authenticating...</div>;

    return <Component {...props} />;
  };

  return Auth;
};
