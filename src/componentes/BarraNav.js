import React, { useState, useEffect } from 'react';
import logo from '../img/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import handleLogout from './Logout';
import LogoutButton from './Logout';

function BarraNav({ isAuthenticated }) {
  const navigate = useNavigate();
  const [showGenero, setShowGenero] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null); // Estado para el género seleccionado
  const [tipoGenero, settipoGenero] = useState(""); // Estado para el nombre del género seleccionado

  const handleGenderClick = (gender, genderName) => {
    setSelectedGender(gender);
    navigate(`/CalzadoGenero/${genderName}`);
  };

  useEffect(() => {
    if (tipoGenero) {
      navigate(`/CalzadoHombre/${tipoGenero}`);
    }
  }, [tipoGenero, navigate]);
  

  const handleMouseEnterGenero = () => {
    setShowGenero(true);
  };

  const handleMouseLeaveGenero = () => {
    setShowGenero(false);
  };

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <img src={logo} id='logo' alt='logo'></img>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="Género"
              id="basic-nav-dropdown"
              style={{ margin: '5px', fontFamily: 'cursive' }}
              onMouseEnter={handleMouseEnterGenero}
              onMouseLeave={handleMouseLeaveGenero}
              show={showGenero}
            >
              <NavDropdown.Item onClick={() => handleGenderClick('hombre', 'Hombre')}>
                <Link to="/CalzadoGenero" style={{ textDecoration: 'none', color: 'black', fontFamily: "Gill Sans, sans-serif" }}>Hombre</Link>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleGenderClick('mujer', 'Mujer')}>
                <Link to="/CalzadoGenero" style={{ textDecoration: 'none', color: 'black', fontFamily: "Gill Sans, sans-serif" }}>Mujer</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <div>{tipoGenero}</div>
            <Link to="/" style={{ margin: '12px', fontFamily: 'cursive', textDecoration: 'none', color: 'black', }}>Inicio</Link>
            <Link to="/CalzadoNuevo" style={{ margin: '12px', fontFamily: 'cursive', textDecoration: 'none', color: 'black' }}>Nuevo</Link>
            {isAuthenticated && (
              <Link to="/Producto" style={{ margin: '12px', fontFamily: 'cursive',textDecoration: 'none', color: 'black' }}>
                Productos
              </Link>
            )}
            <NavDropdown title={isAuthenticated ? "Mi Cuenta (Conectado)" : "Mi Cuenta"} id="basic-nav-dropdown" style={{ margin: '5px', fontFamily: 'cursive' }}>
              {isAuthenticated ? (
                <>
                  <NavDropdown.Item onClick={handleLogout}><LogoutButton /></NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item>
                  <Link to="/Login" style={{ textDecoration: 'none', color: 'black', fontFamily: "Gill Sans, sans-serif" }}>
                    Iniciar sesión
                  </Link>
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraNav;
