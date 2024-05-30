import React, { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Sidebar() {
    const [showCategories, setShowCategories] = useState(false);
    const [marcas, setMarcas] = useState([]);
    const [showGenero, setShowGenero] = useState(false);
    const [showMarca, setShowMarca] = useState(false);

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

    const toggleCategories = () => {
        setShowCategories(!showCategories);
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
        <Container className="">
            <div className="d-flex align-items-center">
                <div className={`filter-icon d-sm-none ${showCategories ? 'd-none' : ''}`}>
                    <FiFilter onClick={toggleCategories} />
                </div>
            </div>
            <ul className={`list-group ${showCategories ? '' : 'd-none d-sm-block'}`}>
                <div onMouseEnter={handleMouseEnterGenero} onMouseLeave={handleMouseLeaveGenero}>
                    <label style={{ 'fontFamily': 'cursive' }}>Género</label>
                    <NavDropdown show={showGenero} title="">
                        <NavDropdown.Item as="div">
                            <Link to="/hombre" style={{ textDecoration: 'none', color: 'black', 'fontFamily': "Gill Sans, sans-serif" }}>Hombre</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item as="div">
                            <Link to="/mujer" style={{ textDecoration: 'none', color: 'black', 'fontFamily': "Gill Sans, sans-serif" }}>Mujer</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
                <div onMouseEnter={handleMouseEnterMarca} onMouseLeave={handleMouseLeaveMarca}>
                    <label style={{ 'fontFamily': 'cursive' }}>Marca</label>
                    <NavDropdown show={showMarca} title="">
                        {marcas.map((marca, index) => (
                            <NavDropdown.Item key={index} as="div">
                                <Link to={`/GaleriaGeneral/${marca}`} style={{ textDecoration: 'none', color: 'black', 'fontFamily': "Gill Sans, sans-serif" }}>
                                    {marca.charAt(0).toUpperCase() + marca.slice(1)}
                                </Link>
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                </div>
            </ul>
        </Container>
    );
}

export default Sidebar;
