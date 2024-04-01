import React, { useState, useEffect }  from 'react';
import logo from '../img/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import handleLogout from './Logout';
import LogoutButton from './Logout';
import handleLogin from './login';

function BarraNav({ isAuthenticated }) {
  return (
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img src={logo} id='logo' alt='logo'></img>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ margin: '30px' }}>Inicio</Nav.Link>
            <Nav.Link href="/Destacados" style={{ margin: '30px' }}>Destacado</Nav.Link>
            <Nav.Link href="/CalzadoNuevo" style={{ margin: '30px' }}>Nuevo</Nav.Link>
            {isAuthenticated && (
              <Nav.Link href="/Producto" style={{ margin: '30px' }}>
                Productos
              </Nav.Link>
            )}
            <NavDropdown title={isAuthenticated ? "Mi Cuenta (Conectado)" : "Mi Cuenta"} id="basic-nav-dropdown" style={{ margin: '30px' }}>
              {isAuthenticated ? (
                <>
                  <NavDropdown.Item onClick={handleLogout}><LogoutButton/></NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item href="/Login">Iniciar sesión</NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraNav;