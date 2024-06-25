import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Footer from './Footer';

function Destacados() {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    const fetchProductosDestacados = async () => {
      try {
        const db = firebase.firestore();
        const productosSnapshot = await db.collection('producto').orderBy('clickCount', 'desc').limit(10).get();
        const productosData = productosSnapshot.docs.map((doc) => doc.data());
        setProductosDestacados(productosData);
      } catch (error) {
        console.error('Error al obtener los productos destacados:', error);
      }
    };

    fetchProductosDestacados();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Row>
            {productosDestacados.map((producto, index) => (
              <Col key={index} xs={6} sm={6} md={4} lg={3}>
                <div style={{ marginBottom: '15px' }}>
                  <Card.Img variant="top" src={producto.imagenUrls[0]} style={{ height: '301px', borderRadius: '10px' }} />
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
