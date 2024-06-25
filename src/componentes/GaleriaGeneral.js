import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Buscador from "./Buscador";

function GaleriaGeneral() {
  const [productosPorMarca, setProductosPorMarca] = useState({});
  const [productosFiltrados, setProductosFiltrados] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [imagenActual, setImagenActual] = useState('');
  const productsPerPage = 30; // Define la cantidad de productos por página
  const [isMobile, setIsMobile] = useState(false);

  // Calcula el índice inicial y final de los productos a mostrar
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Cambia de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const db = firebase.firestore();
        const productosSnapshot = await db.collection('producto').get();
        const productosData = productosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        agruparProductosPorMarca(productosData);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();

    // Detectar si el dispositivo es móvil
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Cambiar a 768 o al ancho que necesites para considerar como móvil
    };

    handleResize(); // Llamar al método una vez para establecer el estado inicial
    window.addEventListener('resize', handleResize); // Escuchar cambios en el tamaño de la ventana

    return () => {
      window.removeEventListener('resize', handleResize); // Limpiar el listener en la fase de desmontaje
    };
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
    const productosFiltrados = {};
    Object.keys(productosPorMarca).forEach(marca => {
      const productosFiltradosPorMarca = productosPorMarca[marca].filter(producto =>
        producto.marca.toLowerCase().includes(busqueda.toLowerCase()) || producto.referencia.toLowerCase().includes(busqueda.toLowerCase())
      );
      if (productosFiltradosPorMarca.length > 0) {
        productosFiltrados[marca] = productosFiltradosPorMarca;
      }
    });
    setProductosFiltrados(productosFiltrados);
  };

  const handleImageClick = async (producto) => {
    const db = firebase.firestore();
    const productoRef = db.collection('producto').doc(producto.id);

    try {
      await productoRef.update({
        clickCount: firebase.firestore.FieldValue.increment(1)
      });
      // console.log(`Incremented click count for product ${producto.referencia}`);
    } catch (error) {
      alert('Error incrementing click count:', error);
    }
  };

  const cambiarImagen = (id, rutaImagen) => {
    document.getElementById(id).src = rutaImagen;
    setImagenActual(rutaImagen);
  };

  // Obtener todos los productos en un solo array
  const allProductos = Object.keys(productosFiltrados).reduce((acc, marca) => acc.concat(productosFiltrados[marca]), []);

  return (
    <Container fluid>
      <Row>
        <Col lg={2} md={3} sm={5} className="position-fixed" style={{ marginTop: '50px' }}>
        </Col>
        <Col lg={10} md={9} sm={7} style={{ marginLeft: 'auto', marginRight: '80px', marginTop: '40px' }}>
          {/* Agrega el buscador */}
          <Buscador onBuscar={handleBuscar} />
          <Row>
            {allProductos.slice(indexOfFirstProduct, indexOfLastProduct).map((producto, idx) => (
              <Col key={idx} xs={6} sm={6} md={4} lg={3}>
                <Card style={{ marginBottom: '10px' }}>
                  <Link to={`/DetallesCalzado/${producto.referencia}`} onClick={() => handleImageClick(producto)}>
                    <Card.Img variant="top" id={`imagenGrande-${idx}`} src={producto.imagenUrls[0]} style={{ height: '301px', borderRadius: '10px' }} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{producto.referencia.toUpperCase()}</Card.Title>
                    <Card.Text>
                      <strong>Precio:</strong> {producto.precio}<br />
                      <strong>Genero:</strong> {producto.genero}<br />
                      <strong>Envío Gratis</strong>
                    </Card.Text>
                    {/* miniaturas */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                      {producto.imagenUrls.map((imagen, index) => (
                        <Col key={`Miniatura-${idx}-${index}`} xs="auto" className="p-0">
                          <label className='form-control p-1'>
                            <img key={index} src={imagen} alt={`Miniatura ${index}`} title='Puedes cambiar la imagen, pasando el mouse/click'
                              onClick={() => cambiarImagen(`imagenGrande-${idx}`, imagen)}
                              onMouseMove={!isMobile ? () => cambiarImagen(`imagenGrande-${idx}`, imagen) : null}
                              style={{ height: '33px', cursor: 'pointer', borderRadius: '5px' }}
                            />
                          </label>
                        </Col>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {/* Agrega el paginador */}
          <Pagination style={{ justifyContent: 'center' }}>
            {Array.from({ length: Math.ceil(allProductos.length / productsPerPage) }).map((_, index) => (
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
