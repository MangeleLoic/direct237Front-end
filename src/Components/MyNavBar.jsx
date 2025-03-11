import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './MyNavBar.css';

function MyNavBar() {
  return (
    <Navbar className="navbar-custom" variant="dark" expand="lg" fixed="top">

      <Container>
        <Navbar.Brand as={Link} to="/">Direct 237</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            <Nav.Link as={Link} to="/aboutUs">Chi siamo</Nav.Link>
            <a href="#footer" className="nav-link">Contact</a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
