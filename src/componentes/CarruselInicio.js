import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar los estilos de Bootstrap

function CarruselInicio() {
  return (
    <Container fluid>
      <Carousel controls={false} indicators={false} interval={0} pause={false}>
        <Carousel.Item>
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <img src="https://bona.com.co/cdn/shop/files/logo_chiqui.svg?v=1694800907" style={{ margin: '5px', width: '75px',  'object-fit': 'cover' }} alt="Bona" title="Bona" />
            <img src="https://http2.mlstatic.com/D_Q_NP_778406-MLA74531996448_022024-G.webp" style={{ margin: '5px', width: '75px', }} alt="Nike" title="Nike AAA" />
            <img src="https://http2.mlstatic.com/D_Q_NP_748421-MLA74657666077_022024-G.webp" style={{ margin: '5px', width: '75px', }} alt="Adidas" title="Adidas" />
            <img src="https://http2.mlstatic.com/D_Q_NP_879538-MLA74657488917_022024-G.webp" style={{ margin: '5px', width: '75px', }} alt="Mujer" title="New Balance" />
            <img src="https://jobs.nike.com/media/images/logo-jordan-wordmark-BLK.original.png" style={{ margin: '5px', width: '75px' }} alt="Jordan" title="Jordan" />
            <img src="https://www.armani.com/content/images/cms/ycm/resource/blob/590102/02fa606cc50ce12567353e17016de290/wwad-logo-1980-data.jpg/w1920.jpg" style={{ margin: '5px', width: '75px' }} alt="Armani" title="Armani" />
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default CarruselInicio;
