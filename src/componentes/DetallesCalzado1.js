import React from 'react';
import { useParams } from 'react-router-dom';

import calzado1 from '../img/calzado1.jpeg';
import calzado2 from '../img/calzado2.jpeg';
import calzado3 from '../img/calzado3.jpeg';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Footer from './Footer';

function cambiarImagen(rutaImagen) {
  document.getElementById('imagenGrande').src = rutaImagen;
}

function DetallesCalzado() {
  // const { id } = useParams(); // Obtén el parámetro de la ruta

  // let imagen;
  // switch (id) {
  //   case 'calzado1':
  //     imagen = calzado1;
  //     break;
  //   case 'calzado2':
  //     imagen = calzado2;
  //     break;
  //   case 'calzado3':
  //     imagen = calzado3;
  //     break;
  //   default:
  //     imagen = calzado1; // Si el id no coincide con ninguno, muestra la primera imagen por defecto
  // }
  return (
    <div>
    <Container style={{ marginLeft: '0', marginRight: '0',justifyContent: 'center','display': 'flex', 'height': '100vh',alignItems: 'center' }} >
      <Row style={{marginLeft: '0', marginRight: '0',justifyContent: 'center','display': 'flex'}}>
        <Col xs={6} sm={2}>
          <Image src={calzado1} onMouseMove={() => cambiarImagen(calzado1)} style={{ width: '60%', cursor:'pointer', marginBottom: '10px'}} rounded />
          <Image src={calzado2} onMouseMove={() => cambiarImagen(calzado2)} style={{ width: '60%', cursor:'pointer', marginBottom: '10px'}} rounded />
          <Image src={calzado3} onMouseMove={() => cambiarImagen(calzado3)} style={{ width: '60%', cursor:'pointer', marginBottom: '10px' }} rounded />
        </Col>
        <Col xs={6} sm={6} style={{ marginLeft: '0', marginRight: '0',justifyContent: 'center','display': 'flex' }} className='image-container'>
          <Image id="imagenGrande" src={calzado1} style={{ width: '120%', height: '450px' }} rounded />
        </Col>
        <Col xs={6} sm={4}>
        <Card>
        <Card.Body>
          <Card.Title>ADIDAS SIKAIGE</Card.Title>
          <Card.Text>
            <label>Precio: 175.000</label> 
            <label>Talla: Euro 36 al 39 Dama</label>
            <label>Talla: Euro 40 al 44 Caballero</label>
          </Card.Text>
          {/* <a href="./detallesCalzado"><Button variant="primary">Detalles</Button></a> */}
        </Card.Body>
        </Card>
        </Col>
      </Row>
    </Container>
      <div><Footer /></div>
    </div>
  );
}
export default DetallesCalzado;