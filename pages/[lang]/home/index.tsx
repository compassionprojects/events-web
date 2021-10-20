import React, { useContext } from 'react';
import { Card, CardText, CardTitle, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';
import { UserContext } from 'lib/UserContext';
import withAuth from 'hocs/auth';
import Meta from 'components/Meta';
import Link from 'components/Link';
import useTranslation from 'hooks/useTranslation';
// import Loading from '../../components/Loading';

const meta = {
  title: 'Home',
};

function Home() {
  const { t, locale } = useTranslation();
  const { user } = useContext(UserContext);

  // Set moment locale
  moment.locale(locale);

  const ongoing = user.courses.filter((c) =>
    moment().isBetween(moment(c.dateStart), moment(c.dateEnd))
  );
  const upcoming = user.courses.filter((c) =>
    moment(c.dateStart).isAfter(moment())
  );
  const past = user.courses.filter((c) => moment().isAfter(moment(c.dateEnd)));

  return (
    <>
      <Meta {...meta} />
      <Container className="py-5">
        <h1>{t('YOUR_COURSES')}</h1>
        {t('WELCOME_USER', { name: user.name })}
        <h2 className="pb-2 pt-4 mt-5">{t('ONGOING')}</h2>
        <Row>
          {ongoing.map((c) => (
            <Col sm={12} md={6} lg={4} key={c.id}>
              <CourseCard primary {...c} />
            </Col>
          ))}
        </Row>
        {!ongoing.length && (
          <div className="text-muted">{t('NO_ONGOING_COURSES')}</div>
        )}
        <h2 className="pb-2 pt-4 mt-5">{t('UPCOMING')}</h2>
        <Row>
          {upcoming.map((c) => (
            <Col sm={12} md={6} lg={4} key={c.id}>
              <CourseCard {...c} key={c.id} />
            </Col>
          ))}
        </Row>
        {!upcoming.length && (
          <div className="text-muted">{t('NO_UPCOMING_COURSES')}</div>
        )}
        <h2 className="pb-2 pt-4 mt-5">{t('PAST')}</h2>
        <Row>
          {past.map((c) => (
            <Col sm={12} md={6} lg={4} key={c.id}>
              <CourseCard {...c} key={c.id} />
            </Col>
          ))}
        </Row>
        {!past.length && (
          <div className="text-muted">{t('NO_PAST_COURSES')}</div>
        )}
      </Container>
    </>
  );
}

Home.propTypes = {
  user: PropTypes.object,
};

function CourseCard({
  id,
  title,
  description,
  dateStart,
  dateEnd,
  primary,
  cancelled,
}) {
  const { t, locale } = useTranslation();
  const path = parseInt(id) >= 4 ? 'schedule2' : 'schedule';

  return (
    <Card body className="my-2">
      <CardTitle className="font-weight-bold">{title}</CardTitle>
      <CardText>
        <ReactMarkdown source={description} escapeHtml={false} />
        <span className="text-muted">
          {moment(dateStart).format('Do MMM')} -{' '}
          {moment(dateEnd).format('Do MMM YYYY')}
        </span>
      </CardText>
      {cancelled && <div className="text-danger pb-3">{t('CANCELLED')}</div>}
      <Link
        href={`/[lang]/home/course/[course_id]/${path}`}
        className={classnames({
          'btn btn-primary mr-auto': primary,
        })}
        as={`/${locale}/home/course/${id}/${path}`}>
        {t('GO_TO_COURSE')}
      </Link>
    </Card>
  );
}

CourseCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
  primary: PropTypes.bool,
  cancelled: PropTypes.bool,
};

export default withAuth(Home);
