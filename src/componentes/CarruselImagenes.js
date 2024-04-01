import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

function CarruselImagenes({ imagenes }) {
  return (
    <Carousel style={{ marginTop: '40px', marginLeft: '10px', background: '#d2b48c' }} interval={2000}>
      <Carousel.Item>
        <div style={{ justifyContent: 'center', display: 'flex', marginBottom: '10px' }}>
          {imagenes.map((imagen, index) => (
            <Link key={index} to={`/detallesCalzado/${imagen}`}>
              <img src={require(`../img/${imagen}.jpeg`).default} style={{ width: '12rem', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }} alt="Calzado" title="Calzado" />
            </Link>
          ))}
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarruselImagenes;
