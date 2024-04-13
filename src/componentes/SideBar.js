    import React, { useState, useEffect } from 'react';
    import { FiFilter } from 'react-icons/fi';
    import { Link } from 'react-router-dom';
    import { Container } from 'react-bootstrap';
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/firestore';
    import Nav from 'react-bootstrap/Nav';


    function Sidebar() {
    const [showCategories, setShowCategories] = useState(false);
    const [marcas, setMarcas] = useState([]);

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
        <Container className="position-fixed" style={{ marginTop: '30px', left: '50px' }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
            <label style={{ 'font-family': 'cursive' }}>Categorias</label>
            <div className="d-flex align-items-center">
            <div className={`filter-icon d-sm-none ${showCategories ? 'd-none' : ''}`} style={{ position: 'relative' }}>
                <FiFilter onClick={toggleCategories} />
            </div>
            </div>
        </div>
        <ul className={`list-group ${showCategories ? '' : 'd-none d-sm-block'}`} style={{ listStyleType: 'none' }}>
            <li className="">
            <label style={{ 'font-family': 'cursive' }}>Genero</label>
            </li><br />
            <li>
            <Nav.Link href="/CalzadoNuevo" style={{'font-family': "Gill Sans, sans-serif"}}>Hombre</Nav.Link>
            <Nav.Link href="/CalzadoNuevo" style={{'font-family': "Gill Sans, sans-serif"}}>Mujer</Nav.Link>
            </li>
            <li className="">
            <div onClick={toggleCategories} style={{ textDecoration: 'none', cursor: 'pointer', 'font-family': 'cursive' }}>Marcas 
            {marcas.map((marca, index) => (
                <li key={index}><br />
                    <Link to={`/GaleriaGeneral/${marca}`} style={{ textDecoration: 'none', color: 'black', 'font-family': "Gill Sans, sans-serif" }}>{marca}</Link>
                </li>
                ))}
            </div>
            <ol>
            </ol>
            </li>
        </ul>
        <div className="filter-icon-container" style={{ position: 'absolute', right: '10px', top: '5px' }}>
            <div className={`filter-icon mt-3 d-sm-none ${showCategories ? '' : 'd-none'}`} >
            <FiFilter onClick={toggleCategories} />
            </div>
        </div>
        </Container>
    );
    }

    export default Sidebar;
