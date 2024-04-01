import React from 'react';
import { Link } from 'react-router-dom';
import GaleriaGeneral from './GaleriaGeneral';
import Footer from './Footer'; 
import { Carousel } from 'react-bootstrap';


function CalzadoGeneral() {
  return (
    <div>
       {/* <Carousel style={{ marginTop: '40px',marginLeft:'10px', background: '#d2b48c' }}> */}
        {/* <Carousel.Item>
          <div style={{ justifyContent: 'center', display: 'flex', marginBottom: '10px' }}>
            <Link to="/detallesCalzado/imagen1"><img src={} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" /></Link>
            <Link to="/detallesCalzado/imagen2"><img src={} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" /></Link>
            <Link to="/detallesCalzado/imagen3"><img src={} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" /></Link>
            <Link to="/detallesCalzado/imagen4"><img src={} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" /></Link>
          </div>
        </Carousel.Item> */}
        {/* <Carousel.Item>
          <div style={{ justifyContent: 'center', display: 'flex', marginBottom: '10px' }}>
          <Link to="./detallesCalzado/calzado3"><img src={calzado3} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px',  }} alt="Calzado" title="Calzado" /></Link>
          <Link to="./detallesCalzado/calzado2"><img src={calzado2} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" /></Link>
          <Link to="./detallesCalzado/calzado1"><img src={calzado1} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" /></Link>
          <Link to="./detallesCalzado/calzado"><img src={calzado} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" /></Link>
          </div>
        </Carousel.Item> */}
      {/* </Carousel> */}
      <Footer></Footer> 
      </div> 

  );
}

export default CalzadoGeneral;
