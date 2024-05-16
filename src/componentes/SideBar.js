import React, { useState, useEffect } from 'react';
    import { FiFilter } from 'react-icons/fi';
    import { Link } from 'react-router-dom';
    import { Container } from 'react-bootstrap';
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/firestore';

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
        <Container className="">
            <div className="d-flex align-items-center">
            <div className={`filter-icon d-sm-none ${showCategories ? 'd-none' : ''}`}>
                <FiFilter onClick={toggleCategories} />
            </div>
            </div>
        <ul className={`list-group ${showCategories ? '' : 'd-none d-sm-block'}`}>
        <label style={{ 'fontFamily': 'cursive' }}>Género</label><br />
     
            <li>
                <Link  style={{ textDecoration: 'none', color: 'black', 'fontFamily': "Gill Sans, sans-serif" }}>Hombre</Link><br />
                <Link  style={{ textDecoration: 'none', color: 'black', 'fontFamily': "Gill Sans, sans-serif" }}>Mujer</Link><br /><br />
                <label style={{ 'fontFamily': 'cursive' }}>Marca</label>
            </li>
            <li className="">
                <div onClick={toggleCategories} style={{ textDecoration: 'none', cursor: 'pointer', 'fontFamily': 'cursive' }}>
                    {marcas.map((marca, index) => (
                        <li key={index}><br />
                            <Link to={`/GaleriaGeneral/${ marca}`} style={{ textDecoration: 'none', color: 'black', 'fontFamily': "Gill Sans, sans-serif" }}>{marca.charAt(0).toUpperCase() + marca.slice(1)}</Link>
                        </li>
                    ))}
                </div>
            </li>
        </ul>
        </Container>
    );
    }

    export default Sidebar;