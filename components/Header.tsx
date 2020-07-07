import React, { useState } from 'react';
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
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import scrollTo from 'scroll-to-element';
import media from './Media';
import { APP_NAME } from '../constants';
import data from '../data';

export const o = { duration: 300, offset: -70 };

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar
      color="light"
      light
      expand="md"
      id="header"
      fixed="top"
      className="border-bottom">
      <Container>
        <Brand href="/#">
          <Logo />
          {APP_NAME}
        </Brand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto py-md-3" navbar>
            <NavItem className="pl-md-4">
              <NavLink
                href="/#about"
                onClick={() => scrollTo('#about', o)}
                className="text-primary">
                About
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar className="pl-md-4">
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
                <DropdownItem onClick={() => scrollTo('#what-to-expect', o)}>
                  What to expect?
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
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem className="pl-md-4">
              <NavLink
                href="/#faq"
                onClick={() => scrollTo('#faq', o)}
                className="text-primary">
                FAQ&apos;s
              </NavLink>
            </NavItem>
            <NavItem className="pl-md-4">
              <NavLink
                href="/#trainers"
                onClick={() => scrollTo('#trainers', o)}
                className="text-primary">
                Trainers
              </NavLink>
            </NavItem>
            <NavItem className="pl-md-4">
              <NavLink
                href={`mailto:${data.contact_email}`}
                className="text-primary">
                Contact
              </NavLink>
            </NavItem>
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

const Brand = styled(NavbarBrand)`
  ${// @ts-ignore
  media.down.mini`
    font-size: 1rem;
  `}
`;
