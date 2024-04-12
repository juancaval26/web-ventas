import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Footer from './Footer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function DetallesCalzado() {
  const [productos, setProductos] = useState([]);
  const [imagenActual, setImagenActual] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const db = firebase.firestore();
        const productosSnapshot = await db.collection('producto').get();
        const productosData = productosSnapshot.docs.map((doc) => doc.data());
        setProductos(productosData);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const currentURL = window.location.href;

// Filtrar productos basados en la coincidencia de la referencia con la URL
const productosFiltrados = productos.filter(producto => {
  // Verificar si la referencia del producto está presente en la URL
  return currentURL.includes(producto.referencia);
});

function cambiarImagen(rutaImagen) {
  document.getElementById('imagenGrande').src = rutaImagen;
  setImagenActual(rutaImagen);

}

const phoneNumber = '573232059679'; 
  const message = 'Estoy interesado en: '; 
  const messageWithImage = `${message} ${imagenActual}`;
  console.log(imagenActual);
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(messageWithImage)}`;
  
  return (
    <div style={{ float: 'left' }}>
      <Container style={{ marginLeft: '0', marginRight: '0', 'display': 'flex', 'height': '100vh', alignItems: 'center' }} >
        <Row style={{ marginLeft: '0', marginRight: '0', justifyContent: 'center', 'display': 'flex' }}>
          <Col xs={6} sm={2}>
            {productosFiltrados.map((producto, index) => (
              <div key={index}>
                {producto.imagenUrls.map((url, idx) => (
                  <Image key={idx} src={url} onMouseMove={() => cambiarImagen(url)} alt={`Imagen ${index}-${idx}`} style={{ width: '60%', cursor:'pointer', marginBottom: '5px', margin: '5px', borderRadius: '10px'  }} title={`${index}-${idx}`} />
                ))}
              </div>
            ))}
          </Col>
          <Col xs={6} sm={6} >
            <Image id="imagenGrande" src={productosFiltrados.imagenUrls} style={{ width: '100%', height: '80%' }} rounded />
          </Col>
          <Col xs={6} md={4}>
          {productosFiltrados.map((producto, index) => (
              <Card key={index}>
                <Card.Body>
                  <Card.Title>referencia: {producto.referencia}</Card.Title>
                  <Card.Text>
                    <label>{`Precio: ${producto.precio}`}</label><br />
                    <label>{`Talla: ${producto.talla}`} Euro 36 al 39 Dama</label><br />
                    <label>{`Talla: ${producto.talla}`} Euro 36 al 39 Caballero</label>
                    <label>Por tu primer compra tiene Envío Gratis</label>
                <label>
                  <h4>
                  Medios de pago 
                  (Contra Entrega)
                  </h4>
                </label>
                <label htmlFor="">Nequi</label><br />
                <label htmlFor="">Efectivo</label><br />
                <label htmlFor="">Ahorro a la mano</label>
                  </Card.Text>
                  <label htmlFor="">Mas Información: </label>
{/* <a href={`https://wa.me/573232059679/?text=Estoy%20interesado%20en%20estos%20zapatos&source=&image=${imagen}`} target="_blank" style={{ width: '192px', height: '192px'}}> */}
              <a href={url} target="_blank" style={{ width: '192px', height: '192px'}}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"  style={{ width: '10%'}} alt="" />
              </a>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
      <Container>
      <Row>
        <Col>
          <h2>Descripción</h2>
          <p>
            BIENVENIDO A LA TIENDA OFICIAL DE DIAMOND MARKET
          <br></br>
          <br></br>

          Fabricación Colombiana, queremos brindarte siempre los mejores productos a los mejores precios. 
          Siéntete cómod@ y a la moda con nuestros estilos y combínalos de la manera que tú quieras, 
          los productos están elaborados en los mejores materiales.
          <br></br>
          <br></br>
          DETALLES DEL PRODUCTO
          <br></br>
          Bota Tipo Outdoor Uso casual: Café, Negro, Gris
          <br></br>
          Tipo de Punta: Ovalada
          <br></br>
          Ajuste: Cordones
          <br></br>
          Material Externo: Cuero Sintético*Textil
          <br></br>
          Material Interno: Textil
          <br></br>
          Tipo de Lengüeta: Corrida
          <br></br>
          Tipo de Plantilla: Fija
          <br></br>
          Origen: Industria Naciona
          <br></br>
          Tallaje: Numeración Colombiana
          <br></br>
          Fotos 100% reales
          <br></br>
          Recomendación: Puedes probártelos antes de solicitar el cambio.
          <br></br>
          ------------------------------------------------------------------------------------------------
          <br></br>
          PROCESO DE COMPRA:
          <br></br>
          1. Elige tu producto, solicita tu talla guiándote por la tabla de detalles!
          <br></br>
          2. Realiza el pago seguro de tu producto Unicamente Contra Entrega.
          <br></br>
          3. Asegúrate de ingresar correctamente los datos para el envío (Dirección Completa, Barrio, Celular.
            <br></br>
          4. Tu pedido será entregado un día hábil después del pedido. 
          <br></br>

          Garantía x meses: La garantía inicia a partir de la fecha de entrega del producto. x días calendario en calzado.
          No aplica garantía: Ruptura de materiales, partes que integran el zapato y demás accesorios ocasionados por mal uso.
          Para cambio, los zapatos deben de estar en perfectas condiciones de higiene.
          <br></br>
          <br></br>
          Horario de Atención Servicio al Cliente:
          Lunes a Sábado de 9:00 a.m. a 7:00 p.m.
          <br></br>

          IMPORTANTE: Si tienes algún cambio nos puedes escribir por interno y con gusto hacemos cualquier cambio!, Tallas disponibles las que vez al momento de seleccionar.
          <br></br>
          Garantía del vendedor: x meses
          <br></br>

          </p>
        </Col>
      </Row>
    </Container>
      <div><Footer /></div>
    </div>
  );
}

export default DetallesCalzado;
