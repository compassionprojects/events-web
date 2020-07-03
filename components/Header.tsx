import React, { useState } from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import scrollTo from 'scroll-to-element';
import { APP_NAME } from '../constants';

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
              <NavLink href="/#about" onClick={() => scrollTo('#about')}>
                About
              </NavLink>
            </NavItem>
            <NavItem className="pl-md-4">
              <NavLink href="/#course" onClick={() => scrollTo('#course')}>
                Course
              </NavLink>
            </NavItem>
            <NavItem className="pl-md-4">
              <NavLink href="/#faq" onClick={() => scrollTo('#faq')}>
                FAQ&apos;s
              </NavLink>
            </NavItem>
            <NavItem className="pl-md-4">
              <NavLink href="/#trainers" onClick={() => scrollTo('#trainers')}>
                Trainers
              </NavLink>
            </NavItem>
            <NavItem className="pl-md-4">
              <NavLink href="#">Contact</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
