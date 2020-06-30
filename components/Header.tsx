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
import { APP_NAME } from '../constants';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <Container>
        <NavbarBrand href="/">{APP_NAME}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto py-3" navbar>
            <NavItem className="pl-4">
              <NavLink href="#">About</NavLink>
            </NavItem>
            <NavItem className="pl-4">
              <NavLink href="#">FAQ&apos;s</NavLink>
            </NavItem>
            <NavItem className="pl-4">
              <NavLink href="#">Speakers</NavLink>
            </NavItem>
            <NavItem className="pl-4">
              <NavLink href="#">Contact</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
