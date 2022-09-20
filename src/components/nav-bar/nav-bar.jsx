import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './nav-bar.scss';

export const NavBar = ({user}) => {
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.open("/", "_self");
    props.onLoggedOut(user);
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

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
          {isAuth() && (
              <Nav.Link as={Link} to={`/users/${user}`}>
                {user}
              </Nav.Link>
            )}
            {isAuth() && (
              <Button className="logout" variant="link" onClick={handleLogOut}>
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Sign in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};