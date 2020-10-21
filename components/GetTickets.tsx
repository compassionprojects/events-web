import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import classnames from 'classnames';

// this is the main CTA
// if the user is logged in, this will return a link pointing to home

export default function GetTickets({ size, nav, title, course_id }) {
  const cta_title = title;
  return (
    <Link
      href={`/course/[course_id]/tickets`}
      as={`/course/${course_id}/tickets`}
      className={classnames('btn btn-primary rounded-pill', {
        'btn-lg': size === 'lg',
        'btn-sm': size === 'sm',
        'my-4': !nav,
      })}>
      {cta_title}
    </Link>
  );
}

GetTickets.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg']),
  nav: PropTypes.bool,
  title: PropTypes.string,
  course_id: PropTypes.string.isRequired,
};

GetTickets.defaultProps = {
  accent: false,
  size: 'lg',
  nav: false,
  title: 'Get Tickets',
};
