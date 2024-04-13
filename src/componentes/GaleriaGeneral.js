import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Sidebar from './SideBar';


function GaleriaGeneral({ rutaImagenes }) {
  const [productosPorMarca, setProductosPorMarca] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Define la cantidad de productos por página

  // Calcula el índice inicial y final de los productos a mostrar
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Object.keys(productosPorMarca).reduce((acc, marca) => {
    return acc.concat(productosPorMarca[marca]);
  }, []).slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambia de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <Container fluid>
      <Row>
        <Col lg={2} md={3} sm={5} className="position-fixed" style={{ marginTop: '50px' }}>
          {/* Aquí va tu sidebar */}
          <Sidebar />

        </Col>
        <Col lg={10} md={9} sm={7} style={{ marginLeft: 'auto', marginRight: 'auto', marginRight: '80px', marginTop: '40px' }}>
          {Object.keys(productosPorMarca).map((marca, index) => (
            <div key={index}>
              <Row>
                {productosPorMarca[marca].map((producto, idx) => (
                  <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                    <Card style={{ marginBottom: '10px' }}>
                      <Link to={`/DetallesCalzado/${producto.referencia}`}>
                        <Card.Img variant="top" src={producto.imagenUrls[0]} style={{ height: '180px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
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
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
          {/* Agrega el paginador */}
          <Pagination style={{ justifyContent: 'center' }}>
            {Array.from({ length: Math.ceil(Object.keys(productosPorMarca).reduce((acc, marca) => acc.concat(productosPorMarca[marca]), []).length / productsPerPage) }).map((_, index) => (
              <Pagination.Item key={index} onClick={() => paginate(index + 1)} active={index + 1 === currentPage}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default GaleriaGeneral;
