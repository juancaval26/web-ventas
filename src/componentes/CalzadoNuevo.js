import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Footer from './Footer';
import Buscador from "./Buscador"; // Importa el componente de buscador

function GaleriaGeneral({ rutaImagenes }) {
  const [productosPorMarca, setProductosPorMarca] = useState({});
  const [productosFiltrados, setProductosFiltrados] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Define la cantidad de productos por página
  const [searchTerm, setSearchTerm] = useState('');
  // Calcula el índice inicial y final de los productos a mostrar
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Cambia de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const db = firebase.firestore();
        const productosSnapshot = await db.collection('producto').orderBy('fecha', 'desc').limit(100).get(); // Limita a 100 productos
        const productosData = productosSnapshot.docs.map((doc) => doc.data());
        agruparProductosPorMarca(productosData);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);


  useEffect(() => {
    // Cuando cambia la búsqueda, actualiza los productos filtrados
    setProductosFiltrados(productosPorMarca);
  }, [productosPorMarca]);

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

  const handleBuscar = (busqueda) => {
    const searchTermTrimmed = busqueda.trim().substring(0, 12); // Limita la búsqueda a 15 caracteres
    setSearchTerm(searchTermTrimmed);
    const productosFiltrados = {};
    Object.keys(productosPorMarca).forEach(marca => {
      const productosFiltradosPorMarca = productosPorMarca[marca].filter(producto =>
        producto.marca.toLowerCase().includes(searchTermTrimmed.toLowerCase())
      );
      if (productosFiltradosPorMarca.length > 0) {
        productosFiltrados[marca] = productosFiltradosPorMarca;
      }
    });
    setProductosFiltrados(productosFiltrados);
  };

  return (
    <Container fluid>
    <Row>
      <Col lg={2} md={3} sm={5} className="position-fixed" style={{ marginTop: '50px' }}>
      </Col>
      <Col lg={10} md={9} sm={7} style={{ marginLeft: 'auto', marginRight: 'auto', marginRight: '80px', marginTop: '40px' }}>
        {/* Agrega el buscador */}
        <Buscador onBuscar={handleBuscar} />
        {Object.keys(productosFiltrados).length > 0 ? (
          Object.keys(productosFiltrados).map((marca, index) => (
            <div key={index}>
              <Row>
                {productosFiltrados[marca].slice(indexOfFirstProduct, indexOfLastProduct).map((producto, idx) => (
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
          ))
        ) : (
          <div>No se encontraron resultados</div>
        )}
        {/* Agrega el paginador */}
        <Pagination style={{ justifyContent: 'center' }}>
          {Array.from({ length: Math.ceil(Object.keys(productosFiltrados).reduce((acc, marca) => acc.concat(productosFiltrados[marca]), []).length / productsPerPage) }).map((_, index) => (
            <Pagination.Item key={index} onClick={() => paginate(index + 1)} active={index + 1 === currentPage}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Col>
    </Row>
    <Footer />
  </Container>
);
}

export default GaleriaGeneral;
