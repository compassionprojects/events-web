import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../lib/UserContext';
import Loading from 'components/Loading';
import useTranslation from 'hooks/useTranslation';

const AuthWrap = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const { t, locale } = useTranslation();
    const { user, authenticating, error } = useContext(UserContext);

    if (authenticating && !user) {
      return (
        <div className="d-flex align-items-center justify-content-center pt-5 mt-2">
          <Loading color="primary" /> &nbsp;Authenticating...
        </div>
      );
    }

    useEffect(() => {
      if ((!user && !authenticating) || error)
        router.push(`/${locale}/signin?fail=1`);
    }, [user, authenticating, error]);

    if ((!user && !authenticating) || error) {
      return null;
    }

    // If user is not part of the course, send him back to /home
    if (
      user &&
      router.query.course_id &&
      !user.courses.map((c) => c.id).includes(router.query.course_id)
    ) {
      return <div>{t('NOT_PART_OF_COURSE')}</div>;
    }

    if (user) return <Component {...props} />;
  };

  return Auth;
};

export default AuthWrap;
