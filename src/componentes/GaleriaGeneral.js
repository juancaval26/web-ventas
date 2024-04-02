import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Importa Card, Row y Col de react-bootstrap
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function GaleriaGeneral({ rutaImagenes }) {
  const [productosPorMarca, setProductosPorMarca] = useState({});

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const db = firebase.firestore();
        const productosSnapshot = await db.collection('producto').get();
        const productosData = productosSnapshot.docs.map((doc) => doc.data());
        agruparProductosPorMarca(productosData);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const agruparProductosPorMarca = (productos) => {
    const productosPorMarcaTemp = {};
    productos.forEach(producto => {
      if (!(producto.marca in productosPorMarcaTemp)) {
        productosPorMarcaTemp[producto.marca] = [];
      }
      productosPorMarcaTemp[producto.marca].push(producto);
    });
    setProductosPorMarca(productosPorMarcaTemp);
  };

  return (
    <Container>
      {Object.keys(productosPorMarca).map((marca, index) => (
        <div key={index}>
          <h2 className='graffiti-text'>{marca}-AAA</h2>
          <Row>
            {productosPorMarca[marca].map((producto, idx) => (
              <Col key={idx} xs={12} sm={6} md={4} lg={3}> {/* Ajusta el número de columnas según tus necesidades */}
                <Card style={{ marginBottom: '20px' }}>
                  <Link to={`/DetallesCalzado/${marca}`}>
                    <Card.Img variant="top" src={producto.imagenUrls[0]} style={{ height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{producto.referencia}</Card.Title>
                    <Card.Text>
                      <strong>Talla:</strong> {producto.talla}<br />
                      <strong>Precio:</strong> {producto.precio}<br />
                      <strong>Colores:</strong> {producto.color}<br />
                      <div>
                        {producto.imagenUrls.map((imagen, index) => (
                          <img key={index} src={imagen} alt={`Miniatura ${index}`} style={{ width: '24px', height: '24px', marginRight: '5px', borderRadius: '5px' }} />
                        ))}
                      </div>
                      <strong>Envío Gratis</strong>
                      {/* Agrega más detalles del producto según tu modelo de datos */}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default GaleriaGeneral;
