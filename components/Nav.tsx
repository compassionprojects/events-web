import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Nav, NavItem } from 'reactstrap';
import Link from './Link';

const items = [
  { path: '/home', title: 'Home' },
  { path: '/home/library', title: 'Library' },
  { path: '/home/wall', title: 'Wall' },
  { path: '/home/care', title: 'Care centre' },
  { path: '/home/training', title: 'Training centre' },
  { path: '/home/embody', title: 'Embody centre' },
];

export default function Navigation({ activePath }) {
  return (
    <Nav vertical pills>
      {items.map((item) => (
        <NavItem key={item.path}>
          <Link
            className={classnames('nav-link', {
              active: item.path === activePath,
            })}
            href={item.path}
            as={item.path}>
            {item.title}
          </Link>
        </NavItem>
      ))}
    </Nav>
  );
}

Navigation.propTypes = {
  activePath: PropTypes.string,
};
