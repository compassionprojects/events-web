import React from 'react';
import classnames from 'classnames';
import { Nav, NavItem } from 'reactstrap';
import Link from './Link';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import useTranslation from 'hooks/useTranslation';

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
  const { t, locale } = useTranslation();
  const { pathname, asPath, query } = useRouter();
  const { data, loading } = useQuery(GET_SPACES_AND_MESSAGE_TYPES, {
    variables: { courseId: query.course_id },
  });

  const [defaultWall = {}] = (data && data.allMessageTypes) || [];

  const items = [
    { path: `/[lang]/home`, as: `/${locale}/home`, title: t('HOME') },
    {
      path: `/[lang]/home/course/[course_id]/schedule`,
      as: `/${locale}/home/course/${query.course_id}/schedule`,
      title: t('SCHEDULE'),
    },
    {
      path: `/[lang]/home/course/[course_id]/library`,
      as: `/${locale}/home/course/${query.course_id}/library`,
      title: t('LIBRARY'),
    },
    {
      path: `/[lang]/home/course/[course_id]/wall?type=${defaultWall.id}`,
      as: `/${locale}/home/course/${query.course_id}/wall?type=${defaultWall.id}`,
      title: t('MESSAGE_BOARDS'),
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
              path: `/[lang]/home/course/[course_id]/space/[id]`,
              title: s.title,
              as: `/${locale}/home/course/${query.course_id}/space/${s.id}`,
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
              active: pathname === `/[lang]/home/course/[course_id]/cards`,
            })}
            href="/[lang]/home/course/[course_id]/cards?type=challenge"
            as={`/${locale}/home/course/${query.course_id}/cards?type=challenge`}>
            {t('INTERACTIVE_TOOLS')}
          </Link>
        </NavItem>
      </Nav>
    </>
  );
}
