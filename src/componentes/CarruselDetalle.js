import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarruselDetalle() {

  return (
    <div>
        <Carousel className='carousel-control-prev-icon'>
          <Carousel.Item>
          <img src="https://http2.mlstatic.com/D_Q_NP_786885-MLA74657360591_022024-G.webp" style={{ margin: '10px' }} alt="Calzado"  title="Calzado"/>
          <img src="https://http2.mlstatic.com/D_Q_NP_778406-MLA74531996448_022024-G.webp" style={{ margin: '10px' }} alt="Calzado"  title="Calzado"/>
          <img src="https://http2.mlstatic.com/D_Q_NP_677231-MLA74531643436_022024-G.webp" style={{ margin: '10px' }} alt="Calzado"  title="Calzado"/>
          <img src="https://http2.mlstatic.com/D_Q_NP_748421-MLA74657666077_022024-G.webp" style={{ margin: '10px' }} alt="Hombre" title="Hombre"/>
          <img src="https://http2.mlstatic.com/D_Q_NP_879538-MLA74657488917_022024-G.webp" style={{ margin: '10px' }} alt="Mujer"  title="Mujer"/>
          <img src="https://http2.mlstatic.com/D_Q_NP_717074-MLA74657498989_022024-G.webp" style={{ margin: '10px' }} alt="Niñ@"  title="Niñ@"/>
          </Carousel.Item>
        </Carousel>
      </div>
  );
}

export default CarruselDetalle;