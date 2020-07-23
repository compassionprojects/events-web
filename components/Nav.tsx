import React from 'react';
import classnames from 'classnames';
import { Nav, NavItem } from 'reactstrap';
import Link from './Link';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

const GET_ALL_SPACES = gql`
  query allSpaces {
    allSpaces {
      id
      title
    }
  }
`;

export default function Navigation() {
  const { data, loading } = useQuery(GET_ALL_SPACES);
  const { pathname, asPath } = useRouter();
  const items = [
    { path: '/home', title: 'Home' },
    { path: '/home/library', title: 'Library' },
    // { path: '/home/wall', title: 'Wall' },
  ];

  return (
    <>
      <Nav vertical pills>
        {items.map((item) => (
          <NavItem key={item.path}>
            <Link
              className={classnames('nav-link', {
                active: item.path === pathname,
              })}
              href={item.path}
              as={item.path}>
              {item.title}
            </Link>
          </NavItem>
        ))}
        {data &&
          !loading &&
          data.allSpaces
            .map((s) => ({
              path: `/home/space/[id]`,
              title: s.title,
              as: `/home/space/${s.id}`,
            }))
            .map((item) => (
              <NavItem key={item.as}>
                <Link
                  className={classnames('nav-link', {
                    active: item.as === asPath,
                  })}
                  href={item.path}
                  as={item.as}>
                  {item.title}
                </Link>
              </NavItem>
            ))}
        <NavItem>
          <Link
            className={classnames('nav-link', {
              active: pathname === '/home/cards',
            })}
            href="/home/cards"
            as="/home/cards">
            Games
          </Link>
        </NavItem>
      </Nav>
    </>
  );
}
