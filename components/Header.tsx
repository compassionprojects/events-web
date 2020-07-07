import React, { useState } from 'react';
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
import { APP_NAME } from '../constants';
import data from '../data';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md" id="header">
      <Container>
        <NavbarBrand href="/#">{APP_NAME}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto py-md-3" navbar>
            <NavItem className="pl-md-4">
              <NavLink
                href="/#about"
                onClick={() => scrollTo('#about')}
                className="text-primary">
                About
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar className="pl-md-4">
              <DropdownToggle nav caret className="text-primary">
                Course
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => scrollTo('#course')}>
                  Course
                </DropdownItem>
                <DropdownItem onClick={() => scrollTo('#language')}>
                  Language
                </DropdownItem>
                <DropdownItem onClick={() => scrollTo('#what-to-expect')}>
                  What to expect?
                </DropdownItem>
                <DropdownItem onClick={() => scrollTo('#what-you-need')}>
                  What you need?
                </DropdownItem>
                <DropdownItem onClick={() => scrollTo('#course-content')}>
                  Course Content
                </DropdownItem>
                <DropdownItem onClick={() => scrollTo('#fee')}>
                  Participation fee
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem className="pl-md-4">
              <NavLink
                href="/#faq"
                onClick={() => scrollTo('#faq')}
                className="text-primary">
                FAQ&apos;s
              </NavLink>
            </NavItem>
            <NavItem className="pl-md-4">
              <NavLink
                href="/#trainers"
                onClick={() => scrollTo('#trainers')}
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
