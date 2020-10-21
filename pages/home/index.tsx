import React, { useContext } from 'react';
import { Card, CardText, CardTitle, Container, Row, Col } from 'reactstrap';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../../lib/UserContext';
import withAuth from '../auth';
import Meta from '../../components/Meta';
import Link from '../../components/Link';
// import Loading from '../../components/Loading';

const meta = {
  title: 'Home',
};

function Home() {
  const { user } = useContext(UserContext);

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
        <h2>Your courses</h2>
        Hello {user.name}! Welcome!
        <h3 className="pb-2 pt-3 mt-5">Ongoing</h3>
        <Row>
          {ongoing.map((c) => (
            <Col sm={12} md={6} lg={4} key={c.id}>
              <CourseCard {...c} />
            </Col>
          ))}
        </Row>
        {!ongoing.length && (
          <div className="text-muted">No ongoing courses</div>
        )}
        <h3 className="pb-2 pt-3 mt-5">Upcoming</h3>
        <Row>
          {upcoming.map((c) => (
            <Col sm={12} md={6} lg={4} key={c.id}>
              <CourseCard {...c} key={c.id} />
            </Col>
          ))}
        </Row>
        {!upcoming.length && (
          <div className="text-muted">No upcoming courses</div>
        )}
        <h3 className="pb-2 pt-3 mt-5">Past</h3>
        <Row>
          {past.map((c) => (
            <Col sm={12} md={6} lg={4} key={c.id}>
              <CourseCard {...c} key={c.id} />
            </Col>
          ))}
        </Row>
        {!past.length && <div className="text-muted">No past courses</div>}
      </Container>
    </>
  );
}

Home.propTypes = {
  user: PropTypes.object,
};

function CourseCard({ id, title, description, dateStart, dateEnd }) {
  return (
    <Card body className="my-2">
      <CardTitle>{title}</CardTitle>
      <CardText>
        <ReactMarkdown source={description} escapeHtml={false} />
        {moment(dateStart).format('Do MMM')} -{' '}
        {moment(dateEnd).format('Do MMM YYYY')}
      </CardText>
      <Link
        href={`/home/course/[course_id]/schedule`}
        as={`/home/course/${id}/schedule`}>
        Go to course
      </Link>
    </Card>
  );
}

CourseCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
};

export default withAuth(Home);
