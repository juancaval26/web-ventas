import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import '../App.css';
import Destacados from './Destacados';

function DetallesCalzado() {
  const [productos, setProductos] = useState([]);
  const [imagenActual, setImagenActual] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Función para obtener la referencia de la URL
  const obtenerReferenciaURL = () => {
    // Obtener la parte de la URL después de la última barra
    const url = window.location.href;
    const ultimaBarraIndex = url.lastIndexOf('/');
    const referencia = url.substring(ultimaBarraIndex + 1);
    return referencia;
  };

  const referenciaURL = obtenerReferenciaURL();


  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const db = firebase.firestore();
        const productosSnapshot = await db.collection('producto').where('referencia', '==', referenciaURL).get();
        const productosData = productosSnapshot.docs.map((doc) => doc.data());
        setProductos(productosData);

        // Establecer la primera imagen como imagen actual
        if (productosData.length > 0) {
          setImagenActual(productosData[0].imagenUrls[0]);
        }
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

  const currentURL = window.location.href;

  // Filtrar productos basados en la coincidencia de la referencia con la URL
  const productosFiltrados = productos.filter(producto => {
    // Verificar si la referencia del producto está presente en la URL
    return currentURL.includes(producto.referencia);
  });

  const cambiarImagen = (rutaImagen) => {
    document.getElementById('imagenGrande').src = rutaImagen;
    setImagenActual(rutaImagen);
  };

  const phoneNumber = '573502133562';
  const message = 'Estoy interesado en: ';
  const messageWithImage = `${message} ${imagenActual}`;
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(messageWithImage)}`;

  return (
    <div style={{ marginTop: '70px' }}>
      <Container>
        <Row>
          {/* Columna de imágenes */}
          <Col xs={12} sm={6} lg={6} className=''>
            {/* Imagen grande */}
            <Row className="justify-content-center">
              <Col xs={12} sm={6} lg={12}>
                {productosFiltrados.length > 0 && (
                  <Image id="imagenGrande" src={imagenActual} style={{ width: '100%', height: '400px' }} rounded />
                )}
              </Col>
            </Row>
            {/* Imágenes pequeñas */}
            <Row style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '5px', marginLeft:'10%' }}>
              {productosFiltrados.map((producto, index) => (
                producto.imagenUrls.map((url, idx) => (
                  <Col key={`${index}-${idx}`} xs="auto" className="p-0">
                    <label className='form-control m-1 p-1'>
                      <Image
                        src={url}
                        onClick={() => cambiarImagen(url)}
                        onMouseMove={!isMobile ? () => cambiarImagen(url) : null}
                        alt={`Imagen ${index}-${idx}`}
                        style={{ width: '50px', height: '50px', cursor: 'pointer', borderRadius: '10px' }}
                      />
                    </label>
                  </Col>
                ))
              ))}
            </Row>
          </Col>

          {/* Columna de referencias */}
          <Col xs={12} lg={6} sm={6} className='justify-content-center align-items-center'>
            <h3 className=''>Detalles</h3>
            {productosFiltrados.map((producto, index) => (
              <Card key={index} style={{ marginBottom: '10px' }} >
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>
                    <strong>Precio:</strong> {producto.precio}<br />
                    <strong>Color:</strong> Variado<br />
                    <strong>Talla:</strong> {producto.talla}<br />
                    <strong>Marca:</strong> {producto.marca}<br />
                    <strong>Referencia:</strong> {producto.referencia}<br />
                    <strong>Descripción:</strong> {producto.descripcion}<br />
                    <strong>Mas Información</strong>
                    <a href={url} target="_blank" style={{ width: '192px', height: '192px' }}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png" style={{ width: '10%' }} alt="" />
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>

      {/* Descripción */}
      <Container>
        <Row>
          <Col xs={12} md={12} style={{ marginTop: '40px' }}>
            <hr />
            <h2>Descripción</h2>
            <label>
              BIENVENIDO A LA TIENDA OFICIAL DE DIAMOND MARKET
              <br></br>
              <br></br>
              {productosFiltrados.map((producto, index) => (
                <Card key={index} style={{ marginBottom: '10px' }} >
                  <Card.Body>
                    <Card.Text>
                      <strong></strong> {producto.descripcion}<br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
              Material Interno: Textil <br />
              Tipo de Plantilla: Fija <br />
              Origen: Industria Nacional <br />
              Fotos 100% reales <br />
              Recomendación: Puedes probártelos antes de solicitar el cambio.
              <br></br>
              <br></br>
              PROCESO DE COMPRA:
              <br></br>
              1. Elige tu producto, revisa las tallas disponibles guiándote por la tabla de detalles!
              <br></br>
              2. pago seguro de tu producto Unicamente Contra Entrega.
              <br></br>
              3. Para Validar el pedido, escribenos al whatsapp
              <br></br>
              <br></br>

              La garantía inicia a partir de la fecha de entrega del producto.
              <br></br>
              No aplica garantía: Ruptura de materiales, partes que integran el zapato y demás accesorios
              ocasionados por mal uso.
              <br></br>
              Para cambio, los zapatos deben de estar en perfectas condiciones de higiene.
              <br></br>
              <br></br>
              Horario de Atención Servicio al Cliente:
              <br></br>
              Lunes a Sábado de 9:00 a.m. a 8:00 p.m.
              <br></br>
              <br></br>

              IMPORTANTE: Si tienes algún cambio nos puedes escribir por interno y con gusto hacemos cualquier cambio!.
              <br></br>
              Tallas disponibles las que vez al momento de seleccionar.
              <br></br>

            </label>
          </Col>
        </Row>
      </Container>
      <h1 style={{ margin: '10px', textAlign: 'center' }}>Calzado Destacado</h1>
      <Destacados />
    </div>
  );
}

export default DetallesCalzado;
