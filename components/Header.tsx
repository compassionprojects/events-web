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
import PropTypes from 'prop-types';
import classnames from 'classnames';
import scrollTo from 'scroll-to-element';

import Link from './Link';
import media from './Media';
import { APP_NAME } from '../constants';
import data from '../data';
import GetTickets from './GetTickets';
import { UserContext } from '../lib/UserContext';

export const o = { duration: 300, offset: -70 };

export default function HeaderLanding() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { user, signOut } = useContext(UserContext);

  let root = '/';
  if (user) root = '/home';

  return (
    <Navbar
      color="light"
      light
      expand="md"
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
              <NavLink
                href="/#about"
                onClick={() => scrollTo('#about', o)}
                className="text-primary">
                About
              </NavLink>
            </NavItem>
            {!user && (
              <UncontrolledDropdown nav inNavbar className="pl-md-2 pl-lg-4">
                <DropdownToggle nav caret className="text-primary">
                  Course
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => scrollTo('#course', o)}>
                    Course
                  </DropdownItem>
                  <DropdownItem onClick={() => scrollTo('#language', o)}>
                    Language
                  </DropdownItem>
                  <DropdownItem onClick={() => scrollTo('#what-you-need', o)}>
                    What you need?
                  </DropdownItem>
                  <DropdownItem onClick={() => scrollTo('#course-content', o)}>
                    Course Content
                  </DropdownItem>
                  <DropdownItem onClick={() => scrollTo('#fee', o)}>
                    Participation fee
                  </DropdownItem>
                  <DropdownItem onClick={() => scrollTo('#trainers', o)}>
                    Trainers
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
            <NavItem className="pl-md-2 pl-lg-4">
              <NavLink
                href="/#faq"
                onClick={() => scrollTo('#faq', o)}
                className="text-primary">
                FAQ&apos;s
              </NavLink>
            </NavItem>
            <NavItem className="pl-md-2 pl-lg-4">
              <_NavLink
                href={`mailto:${data.contact_email}`}
                className="text-primary">
                Contact
              </_NavLink>
            </NavItem>
            {!user && (
              <NavItem className="pl-md-2 pl-lg-4 mt-1">
                <GetTickets size="sm" nav title="Get" />
              </NavItem>
            )}
            {user && (
              <UncontrolledDropdown nav inNavbar className="pl-md-2 pl-lg-4">
                <DropdownToggle nav caret>
                  Logout
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>{user.email}</DropdownItem>
                  <DropdownItem onClick={signOut}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export function Header({ activePath }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { user, signOut } = useContext(UserContext);
  let root = '/';
  if (user) root = '/home';
  const isHome = activePath === '/home';

  return (
    <Navbar
      color="light"
      light
      expand="md"
      id="header"
      className="border-bottom">
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
                  <NavLink href="/#about" className="text-primary">
                    About
                  </NavLink>
                </NavItem>
                <NavItem className="pl-md-2 pl-lg-4">
                  <NavLink href="/#faq" className="text-primary">
                    FAQ&apos;s
                  </NavLink>
                </NavItem>
                <NavItem className="pl-md-2 pl-lg-4">
                  <_NavLink
                    href={`mailto:${data.contact_email}`}
                    className="text-primary">
                    Contact
                  </_NavLink>
                </NavItem>
              </>
            )}
            {user && (
              <>
                <NavItem className="pl-md-2 pl-lg-4">
                  <NavLink href="/#about" className="text-primary">
                    About
                  </NavLink>
                </NavItem>
                <NavItem className="pl-md-2 pl-lg-4">
                  <_NavLink
                    href={`mailto:${data.contact_email}`}
                    className="text-primary">
                    Contact
                  </_NavLink>
                </NavItem>
                <NavItem className="pl-md-2 pl-lg-4">
                  <NavLink
                    href="/home"
                    className={classnames('text-primary', {
                      'px-3 rounded-pill active': isHome,
                    })}>
                    Home
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar className="pl-md-2 pl-lg-4">
                  <DropdownToggle nav caret>
                    Logout
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.email}</DropdownItem>
                    <DropdownItem onClick={signOut}>Logout</DropdownItem>
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

Header.propTypes = {
  activePath: PropTypes.string,
};

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
    font-size: 1rem;
  `}
`;

const NavLink = styled(Link).attrs({
  className: 'nav-link',
})`
  &.active {
    background: rgba(23, 80, 109, 0.25);
  }
`;
