import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import handleLogout from './Logout';
import LogoutButton from './Logout';
import { useTheme } from './ThemeContext'; // Asumiendo que useTheme está configurado correctamente

function BarraNav({ isAuthenticated }) {
  const [showGenero, setShowGenero] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleMouseEnterGenero = () => {
    setShowGenero(true);
  };

  const handleMouseLeaveGenero = () => {
    setShowGenero(false);
  };

  useEffect(() => {
    document.body.className = `${theme}-mode`; // Cambia la clase del body según el tema
  }, [theme]);

  return (
    <Navbar expand="sm" className={`app-container ${theme}-mode`}>
      <Container>
        <img src={logo} id='logo' alt='logo'></img>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="Género"
              id="basic-nav-dropdown"
              style={{ margin: '5px', fontFamily: 'Segoe UI Historic, Segoe UI' }}
              onMouseEnter={handleMouseEnterGenero}
              onMouseLeave={handleMouseLeaveGenero}
              show={showGenero}
            >
              <NavDropdown.Item as={Link} to="/CalzadoGenero/hombre">Hombre</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/CalzadoGenero/mujer">Mujer</NavDropdown.Item>
            </NavDropdown>
            <Link to="/" style={{ margin: '12px', fontFamily: 'Segoe UI Historic, Segoe UI', textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
            <Link to="/CalzadoNuevo" style={{ margin: '12px', fontFamily: 'Segoe UI Historic, Segoe UI', textDecoration: 'none', color: 'inherit' }}>Nuevo</Link>
            {isAuthenticated && (
              <>
                <Link to="/Productos" style={{ margin: '12px', fontFamily: 'Segoe UI Historic, Segoe UI', textDecoration: 'none', color: 'inherit' }}>Productos</Link>
                <Link to="/CrearResenia" style={{ margin: '12px', fontFamily: 'Segoe UI Historic, Segoe UI', textDecoration: 'none', color: 'inherit' }}>Comentarios</Link>
              </>
            )}
            <NavDropdown title={isAuthenticated ? "Mi Cuenta (Conectado)" : "Mi Cuenta"} id="basic-nav-dropdown" style={{ margin: '5px', fontFamily: 'Segoe UI Historic, Segoe UI' }}>
              {isAuthenticated ? (
                <NavDropdown.Item onClick={handleLogout}><LogoutButton /></NavDropdown.Item>
              ) : (
                <NavDropdown.Item as={Link} to="/Login">Iniciar sesión</NavDropdown.Item>
              )}
            </NavDropdown>
            <Button onClick={toggleTheme} style={{ padding: '0.1rem' }} className={`${theme === 'light' ? 'btn btn-dark btn-sm' : 'btn btn-light btn-sm'}`}>
              {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraNav;
