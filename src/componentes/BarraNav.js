import React, { useState, useEffect } from 'react';
import logo from '../img/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import handleLogout from './Logout';
import LogoutButton from './Logout';

function BarraNav({ isAuthenticated }) {
  const [showGenero, setShowGenero] = useState(false);
  const [showMarca, setShowMarca] = useState(false);
  const [marcas, setMarcas] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null); // Estado para el género seleccionado
  const [selectedGenderName, setSelectedGenderName] = useState(""); // Estado para el nombre del género seleccionado

  const handleGenderClick = (gender, genderName) => {
    setSelectedGender(gender); // Actualizar el género seleccionado
    setSelectedGenderName(genderName); // Actualizar el nombre del género seleccionado
  };

  const handleMouseEnterGenero = () => {
    setShowGenero(true);
  };

  const handleMouseLeaveGenero = () => {
    setShowGenero(false);
  };

  const handleMouseEnterMarca = () => {
    setShowMarca(true);
  };

  const handleMouseLeaveMarca = () => {
    setShowMarca(false);
  };

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const db = firebase.firestore();
        const productosSnapshot = await db.collection('producto').get();
        const marcasArray = [];
        productosSnapshot.forEach(doc => {
          const marca = doc.data().marca;
          if (!marcasArray.includes(marca)) {
            marcasArray.push(marca);
          }
        });
        setMarcas(marcasArray);
      } catch (error) {
        console.error('Error al obtener las marcas:', error);
      }
    };

    fetchMarcas();
  }, []);

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
                    <Link to="/hombre" style={{ textDecoration: 'none', color: 'black', fontFamily: "Gill Sans, sans-serif" }}>Hombre</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleGenderClick('mujer', 'Mujer')}>
                    <Link to="/mujer" style={{ textDecoration: 'none', color: 'black', fontFamily: "Gill Sans, sans-serif" }}>Mujer</Link>
                  </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown 
              title="Marca" 
              id="basic-nav-dropdown" 
              style={{ margin: '5px', fontFamily: 'cursive' }}
              show={showMarca}
              onMouseEnter={handleMouseEnterMarca} 
              onMouseLeave={handleMouseLeaveMarca}

            >
                  {marcas.map((marca, index) => (
                    <NavDropdown.Item key={index}>
                      <Link to={`/GaleriaGeneral/${marca}`} style={{ textDecoration: 'none', color: 'black', fontFamily: "Gill Sans, sans-serif" }}>
                        {marca.charAt(0).toUpperCase() + marca.slice(1)}
                      </Link>
                    </NavDropdown.Item>
                  ))}
            </NavDropdown>
            <div>{selectedGenderName}</div>
            <Nav.Link href="/" style={{ margin: '5px', fontFamily: 'cursive' }}>Inicio</Nav.Link>
            <Nav.Link href="/CalzadoNuevo" style={{ margin: '5px', fontFamily: 'cursive' }}>Nuevo</Nav.Link>
            {isAuthenticated && (
              <Nav.Link href="/Producto" style={{ margin: '5px', fontFamily: 'cursive' }}>
                Productos
              </Nav.Link>
            )}
            <NavDropdown title={isAuthenticated ? "Mi Cuenta (Conectado)" : "Mi Cuenta"} id="basic-nav-dropdown" style={{ margin: '5px', fontFamily: 'cursive' }}>
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
