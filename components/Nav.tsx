import React from 'react';
import classnames from 'classnames';
import { Nav, NavItem } from 'reactstrap';
import Link from './Link';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

const GET_SPACES_AND_MESSAGE_TYPES = gql`
  query allSpacesAndMessageTypes($courseId: ID) {
    allSpaces(
      where: { courses_some: { id: $courseId } }
      sortBy: position_ASC
    ) {
      id
      title
    }
    allMessageTypes(where: { courses_some: { id: $courseId } }) {
      id
      title
    }
  }
`;

export default function Navigation() {
  const { pathname, asPath, query } = useRouter();
  const { data, loading } = useQuery(GET_SPACES_AND_MESSAGE_TYPES, {
    variables: { courseId: query.course_id },
  });

  const [defaultWall = {}] = (data && data.allMessageTypes) || [];

  const items = [
    { path: `/home`, title: 'Home' },
    {
      path: `/home/course/[course_id]/schedule`,
      as: `/home/course/${query.course_id}/schedule`,
      title: 'Schedule',
    },
    {
      path: `/home/course/[course_id]/library`,
      as: `/home/course/${query.course_id}/library`,
      title: 'Library',
    },
    {
      path: `/home/course/[course_id]/wall?type=${defaultWall.id}`,
      as: `/home/course/${query.course_id}/wall?type=${defaultWall.id}`,
      title: 'Message boards',
    },
  ];

  return (
    <>
      <Nav vertical pills>
        {items.map((item) => (
          <NavItem key={item.path}>
            <Link
              className={classnames('nav-link', {
                active: item.path.split('?')[0] === pathname,
              })}
              href={item.path}
              as={item.as}>
              {item.title}
            </Link>
          </NavItem>
        ))}
        {data &&
          !loading &&
          data.allSpaces
            .map((s) => ({
              path: `/home/course/[course_id]/space/[id]`,
              title: s.title,
              as: `/home/course/${query.course_id}/space/${s.id}`,
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
              active: pathname === `/home/course/[course_id]/cards`,
            })}
            href="/home/course/[course_id]/cards?type=challenge"
            as={`/home/course/${query.course_id}/cards?type=challenge`}>
            Interactive tools
          </Link>
        </NavItem>
      </Nav>
    </>
  );
}
