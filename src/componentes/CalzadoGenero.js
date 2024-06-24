import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Buscador from "./Buscador"; 
import Footer from './Footer';


function CalzadoGenero() {
  const { genero } = useParams();
  const [productosGenero, setproductosGenero] = useState({});
  const [productosFiltrados, setProductosFiltrados] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Define la cantidad de productos por página
  const [isMobile, setIsMobile] = useState(false);
  const [imagenActual, setImagenActual] = useState('');
  // Calcula el índice inicial y final de los productos a mostrar
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Cambia de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const db = firebase.firestore();
        const productosSnapshot = await db.collection('producto').where('genero', '==', genero).get();
        const productosData = productosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        agruparproductosGenero(productosData);
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
  }, [genero]);

  useEffect(() => {
    // Cuando cambia la búsqueda, actualiza los productos filtrados
    setProductosFiltrados(productosGenero);
  }, [productosGenero]);

  const agruparproductosGenero = (productos) => {
    const productosGeneroTemp = {};
    productos.forEach(producto => {
      if (!(producto.marca in productosGeneroTemp)) {
        productosGeneroTemp[producto.marca] = [];
      }
      productosGeneroTemp[producto.marca].push(producto);
    });
    setproductosGenero(productosGeneroTemp);
  };

  const handleBuscar = (busqueda) => {
    const productosFiltrados = {};
    Object.keys(productosGenero).forEach(marca => {
      const productosFiltradosPorMarca = productosGenero[marca].filter(producto =>
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
        // alert(`Incremented click count for product ${producto.referencia}`);
    } catch (error) {
        alert('Error incrementing click count:', error);
    }
  };

  const cambiarImagen = (id, rutaImagen) => {
    document.getElementById(id).src = rutaImagen;
    setImagenActual(rutaImagen);
  };

  const allProductos = Object.keys(productosFiltrados).reduce((acc, genero) => acc.concat(productosFiltrados[genero]), []);

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
                        <Card.Title>
                          {producto.marca.charAt(0).toUpperCase() + producto.marca.slice(1)}
                        </Card.Title>
                        <Card.Text>
                          <strong>Precio:</strong> {producto.precio}<br />
                          <strong>Genero:</strong> {producto.genero}<br />
                          <strong>Envío Gratis</strong>
                        </Card.Text>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '5px', marginLeft:'10%' }}>
                      {producto.imagenUrls.map((imagen, index) => (
                        <Col key={`Miniatura-${idx}-${index}`} xs="auto" className="p-0">
                          <label className='form-control m-1 p-1'>
                            <img key={index} src={imagen} alt={`Miniatura ${index}`}
                              onClick={() => cambiarImagen(`imagenGrande-${idx}`, imagen)}
                              onMouseMove={!isMobile ? () => cambiarImagen(`imagenGrande-${idx}`, imagen) : null}
                              style={{ width: '30px', height: '30px', cursor: 'pointer', borderRadius: '5px' }}
                            />
                          </label>
                        </Col>
                      ))}
                    </div>
                        {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                          {producto.imagenUrls.map((imagen, index) => (
                            <img key={index} src={imagen} alt={`Miniatura ${index}`} style={{ width: '24px', height: '24px', marginRight: '5px', borderRadius: '5px' }} />
                          ))}
                        </div> */}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
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

export default CalzadoGenero;
