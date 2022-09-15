import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './nav-bar.scss';

export const NavBar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className="stripes"
      variant="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Brand>
          <Link className="nav-link" to="/">
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="justify-content-end">
            <Link className="nav-link" to="/users/username">
              Profile
            </Link>

            <Link className="nav-link" to="/register">
              Signup
            </Link>

            <Link className="nav-link" to="/">
              Signout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};