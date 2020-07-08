import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon';
import data from '../data';

export default function GetTickets({ accent, size, nav, title }) {
  return (
    <a
      href={data.buy_ticket_url}
      rel="noreferrer"
      target="_blank"
      className={classnames('btn', {
        'btn-lg': size === 'lg',
        'btn-sm': size === 'sm',
        'btn-accent': accent,
        'btn-primary': !accent,
        'my-4': !nav,
      })}>
      {title}
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
