import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Footer from './Footer';

function Destacados() {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductosDestacados = async () => {
      try {
        const db = firebase.firestore();
        const productosSnapshot = await db.collection('producto').orderBy('clickCount', 'desc').limit(10).get();
        const productosData = productosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProductosDestacados(productosData);
      } catch (error) {
        console.error('Error al obtener los productos destacados:', error);
      }
    };

    fetchProductosDestacados();
  }, []);

  const handleImageClick = async (producto, event) => {
    event.preventDefault(); // Evitar la navegación inmediata

    const db = firebase.firestore();
    const productoRef = db.collection('producto').doc(producto.id);

    try {
      await productoRef.update({
        clickCount: firebase.firestore.FieldValue.increment(1)
      });
      // Actualizar el estado localmente para reflejar el cambio sin recargar la página
      const updatedProductos = productosDestacados.map((p) =>
        p.id === producto.id ? { ...p, clickCount: p.clickCount + 1 } : p
      );
      setProductosDestacados(updatedProductos);

      // Navegar a la misma ruta con el nuevo estado
      navigate(`/DetallesCalzado/${producto.referencia}`, { state: { producto: { ...producto, clickCount: producto.clickCount + 1 } } });
    } catch (error) {
      console.log('Error incrementing click count:', error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Row>
            {productosDestacados.map((producto, index) => (
              <Col key={index} xs={6} sm={4} md={4} lg={3}>
                <div style={{ marginBottom: '15px' }}>
                  <Link to={`/DetallesCalzado/${producto.referencia}`} onClick={(event) => handleImageClick(producto, event)}>
                    <Card.Img variant="top" src={producto.imagenUrls[0]} style={{ height: '301px', borderRadius: '10px' }} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{producto.referencia.toUpperCase()}</Card.Title>
                    <Card.Text>
                      <strong>Precio:</strong> {producto.precio}<br />
                      <strong>Genero:</strong> {producto.genero}<br />
                      <strong>Envío Gratis</strong>
                    </Card.Text>
                  </Card.Body>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default Destacados;
