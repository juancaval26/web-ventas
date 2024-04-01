import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Container } from 'react-bootstrap';


function CarruselInicio() {
  return (
    <Container>
      <div className='container' style={{ textAlign: "center", justifyItems: "center" }}><span><b>Marcas Nacionales y AAA</b></span></div>
        <Carousel>
          <Carousel.Item style={{ marginLeft: "10%" }}>
          <img src="https://bona.com.co/cdn/shop/files/logo_chiqui.svg?v=1694800907" style={{ margin: '5px', width: '10%' }} alt="Bona"  title="Bona"/>
          <img src="https://http2.mlstatic.com/D_Q_NP_778406-MLA74531996448_022024-G.webp" style={{ margin: '5px' }} alt="Nike AAA"  title="Nike AAA"/>
          <img src="https://http2.mlstatic.com/D_Q_NP_748421-MLA74657666077_022024-G.webp" style={{ margin: '5px' }} alt="Adidas" title="Adidas"/>
          <img src="https://http2.mlstatic.com/D_Q_NP_879538-MLA74657488917_022024-G.webp" style={{ margin: '5px' }} alt="Mujer"  title="New Balance"/>
          <img src="https://www.shutterstock.com/image-vector/chattogram-bangladesh-july-09-2023-260nw-2328983121.jpg" style={{ margin: '5px', width: '15%','clip-path': 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)' }} alt="Jordan"  title="Jordan"/>
          <img src="https://www.armani.com/content/images/cms/ycm/resource/blob/590102/02fa606cc50ce12567353e17016de290/wwad-logo-1980-data.jpg/w1920.jpg" style={{ margin: '5px', width: '10%' ,'clip-path': 'polygon(0 0, 80% 0, 100% 80%, 0% 80%)' }} alt="Armani"  title="Armani"/>
          </Carousel.Item>
        </Carousel>
        <Container>
            <Carousel>
              <Carousel.Item style={{ marginLeft: "30%" }}>
              <a href="/CalzadoHombre">
                <img src="https://http2.mlstatic.com/D_Q_NP_971827-MLA74634995211_022024-G.webp" style={{ margin: '5px' }} alt="Hombre"  title="Hombre"/>
              </a>
              <a href="/CalzadoMujer">
                <img src="https://http2.mlstatic.com/D_Q_NP_949648-MLA74634822855_022024-G.webp" style={{ margin: '5px' }} alt="Mujer"  title="Mujer"/>
              </a>
              </Carousel.Item>
            </Carousel>
        </Container>
      </Container>
  );
}

export default CarruselInicio;