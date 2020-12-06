import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from './Link';
import Icon from './Icon';

// this is the main CTA
// if the user is logged in, this will return a link pointing to home

export default function GetTickets({ size, title, course_id, ticket_url }) {
  const cta_title = title;
  if (ticket_url) {
    return (
      <a
        href={ticket_url}
        target="_blank"
        rel="noopener noreferrer"
        className={classnames('btn btn-primary rounded-pill', {
          'btn-lg': size === 'lg',
          'btn-sm': size === 'sm',
        })}>
        {cta_title} <Icon shape="external-link" width={16} height={16} />
      </a>
    );
  }
  return (
    <Link
      href={`/course/[course_id]/tickets`}
      as={`/course/${course_id}/tickets`}
      className={classnames('btn btn-primary rounded-pill', {
        'btn-lg': size === 'lg',
        'btn-sm': size === 'sm',
      })}>
      {cta_title}
    </Link>
  );
}

GetTickets.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg']),
  title: PropTypes.string,
  course_id: PropTypes.string.isRequired,
  ticket_url: PropTypes.string,
};

GetTickets.defaultProps = {
  accent: false,
  size: 'lg',
  title: 'Get Tickets',
};
