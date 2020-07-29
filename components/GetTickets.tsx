import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon';
import data from '../data';

// this is the main CTA
// if the user is logged in, this will return a link pointing to home

export default function GetTickets({ accent, size, nav, title }) {
  const cta_link = data.buy_ticket_url;
  const cta_title = title;
  return (
    <a
      href={cta_link}
      rel="noreferrer"
      target="_blank"
      className={classnames('btn rounded-pill', {
        'btn-lg': size === 'lg',
        'btn-sm': size === 'sm',
        'btn-accent': accent,
        'btn-primary': !accent,
        'my-4': !nav,
      })}>
      {cta_title}
      <Icon
        shape="external-link"
        width={16}
        height={16}
        style={{ paddingBottom: 3, marginLeft: 5 }}
      />
    </a>
  );
}

GetTickets.propTypes = {
  accent: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg']),
  nav: PropTypes.bool,
  title: PropTypes.string,
};

GetTickets.defaultProps = {
  accent: false,
  size: 'lg',
  nav: false,
  title: 'Get Tickets',
};
