import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import {
  Collapse,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink as _NavLink,
} from 'reactstrap';
// import classnames from 'classnames';
import scrollTo from 'scroll-to-element';

import Link from './Link';
import media from './Media';
import { APP_NAME } from '../constants';
import data from '../data/landing';
import { UserContext } from '../lib/UserContext';
// import { useRouter } from 'next/router';
import useTranslation from 'hooks/useTranslation';

export const o = { duration: 300, offset: -70 };

/* @todo: simplify header, use one for logged in and another for visitors */

export default function HeaderLanding() {
  const { t, locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { user, signOut } = useContext(UserContext);

  let root = `/${locale}`;
  if (user) root = `/${locale}/home`;

  return (
    <Navbar
      color="light"
      light
      expand="lg"
      id="header"
      fixed="top"
      className="border-bottom">
      <Container>
        <Brand href={root}>
          <Logo />
          {APP_NAME}
        </Brand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto py-md-3" navbar>
            <NavItem className="pl-md-2 pl-lg-4">
              <NavLink href={`/${locale}/about`} className="text-accent">
                {t('ABOUT_US')}
              </NavLink>
            </NavItem>
            <NavItem className="pl-md-2 pl-lg-4">
              <NavLink
                href={`/${locale}/#faq`}
                onClick={() => scrollTo('#faq', o)}
                className="text-accent">
                {t('FAQS')}
              </NavLink>
            </NavItem>
            <NavItem className="pl-md-2 pl-lg-4">
              <_NavLink
                href={`mailto:${data.contact_email}`}
                className="text-accent">
                {t('CONTACT')}
              </_NavLink>
            </NavItem>
            {!user && (
              <NavItem className="pl-md-2 pl-lg-4">
                <Link
                  href={`/[lang]/signin`}
                  as={`/${locale}/signin`}
                  className="text-accent nav-link">
                  {t('SIGN_IN')}
                </Link>
              </NavItem>
            )}
            {user && (
              <UncontrolledDropdown nav inNavbar className="pl-md-2 pl-lg-4">
                <DropdownToggle nav caret>
                  {t('LOGOUT')}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>{user.email}</DropdownItem>
                  <DropdownItem onClick={signOut}>{t('LOGOUT')}</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export function Header() {
  const { t, locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  // const { pathname } = useRouter();
  const toggle = () => setIsOpen(!isOpen);

  const { user, signOut } = useContext(UserContext);
  let root = `/${locale}`;
  if (user) root = `/${locale}/home`;
  // const isHome = pathname === '/home';

  return (
    <Navbar
      color="light"
      light
      expand="md"
      id="header"
      className="border-bottom flex-shrink-0">
      <Container>
        <Brand href={root}>
          <Logo />
          {APP_NAME}
        </Brand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto py-md-3" navbar>
            {!user && (
              <>
                <NavItem className="pl-md-2 pl-lg-4">
                  <NavLink href={`/${locale}/about`} className="text-accent">
                    {t('ABOUT_US')}
                  </NavLink>
                </NavItem>
                <NavItem className="pl-md-2 pl-lg-4">
                  <_NavLink
                    href={`mailto:${data.contact_email}`}
                    className="text-accent">
                    {t('CONTACT')}
                  </_NavLink>
                </NavItem>
                <NavItem className="pl-md-2 pl-lg-4">
                  <Link
                    href={`/[lang]/signin`}
                    as={`/${locale}/signin`}
                    className="text-accent nav-link">
                    {t('SIGN_IN')}
                  </Link>
                </NavItem>
              </>
            )}
            {user && (
              <>
                <NavItem className="pl-md-2 pl-lg-4">
                  <_NavLink
                    href={`mailto:${data.contact_email}`}
                    className="text-accent">
                    {t('HELP')}
                  </_NavLink>
                </NavItem>
                <NavItem className="pl-md-2 pl-lg-4">
                  <NavLink href={`/${locale}/about`} className="text-accent">
                    {t('ABOUT_US')}
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar className="pl-md-2 pl-lg-4">
                  <DropdownToggle nav caret>
                    {t('LOGOUT')}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.email}</DropdownItem>
                    <DropdownItem onClick={signOut}>{t('LOGOUT')}</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

const Logo = styled.img.attrs({
  src: '/images/logo.svg',
  className: 'mr-2',
  alt: APP_NAME + ' logo',
})`
  pointer-events: none;
  width: 48px;
  height: 48px;

  ${// @ts-ignore
  media.down.mini`
    width: 28px;
    height: 28px;
  `};

  ${// @ts-ignore
  media.up.phone`
    width: 56px;
    height: 56px;
  `};
`;

const Brand = styled(Link).attrs({
  className: 'navbar-brand',
})`
  ${// @ts-ignore
  media.down.mini`
    font-size: 0.9rem;
  `};

  @media only screen and (max-width: 390px) {
    font-size: 0.9rem;
  }
`;

const NavLink = styled(Link).attrs({
  className: 'nav-link',
})`
  &.active {
    background: rgba(23, 80, 109, 0.25);
  }
`;
