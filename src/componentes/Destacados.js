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
              <Col key={index} xs={6} sm={4} md={3} lg={2}>
                <Card style={{ marginBottom: '10px' }}>
                  <Card.Img variant="top" src={producto.imagenUrls[0]} style={{ height: '180px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
                  <Card.Body>
                    <Card.Title>{producto.marca.charAt(0).toUpperCase() + producto.marca.slice(1)}</Card.Title>
                    <Card.Text>
                      <strong>Precio:</strong> {producto.precio}<br />
                      <strong>Envío Gratis</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
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
