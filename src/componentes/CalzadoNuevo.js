import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'; // Import the Footer component
// import CarruselDetalle from './CarruselDetalle';
import { Carousel } from 'react-bootstrap';
// import Container from 'react-bootstrap/Container';

function CalzadoNuevo() {
  return (
    <div>
       {/* <Carousel style={{ marginTop: '40px',marginLeft:'10px', background: '#d2b48c' }}>
        <Carousel.Item>
          <div style={{ justifyContent: 'center', display: 'flex', marginBottom: '10px' }}>
          <Link to="/detallesCalzado/calzado"><img src={calzado} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" /></Link>
            <Link to="/detallesCalzado/calzado1"><img src={calzado1} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" /></Link>
            <Link to="/detallesCalzado/calzado2"><img src={calzado2} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" /></Link>
            <Link to="/detallesCalzado/calzado3"><img src={calzado3} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" /></Link>
          </div>
        </Carousel.Item>
      </Carousel> */}
      <Footer></Footer> 
      </div> 

  );
}

export default CalzadoNuevo;
