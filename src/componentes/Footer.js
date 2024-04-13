import React from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';

function Footer() {
  return (
    // <div className="container">
    //   <footer className="py-3 my-4">
    //       <div className="row">
    //         <div className="col-md-4">
    //           <h4>Contacto</h4>
    //           <li><a href='https://wa.me/573235062841'>Whatsapp</a></li>
    //         </div>
    //         <div className="col-md-4">
    //           <h4>Información Legal</h4>
    //           <ul>
    //             <li><a href="https://www.termsfeed.com/live/f533fc70-3525-4010-a9f4-6ed6d7e24d6a" target='blank'>Política de Privacidad</a></li>
    //             <li><a href="https://www.termsfeed.com/live/1198691b-b59a-4f5b-a1eb-9fa961583df6" target='blank'>Términos de Uso</a></li>
    //           </ul>
    //         </div>
    //         <div className="col-md-4">
    //           <h4>Redes Sociales</h4>
    //           <ul>
    //             <li><a href="#">Facebook</a></li>
    //             <li><a href="#">Instagram</a></li>
    //           </ul>
    //         </div>
    //       </div>
    //   </footer>
    //   </div>

    // <div>

    <div className="container">
      <footer class="text-center text-white" style={{ backgroundColor: '#ffffff' }}>
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <a href="https://www.termsfeed.com/live/f533fc70-3525-4010-a9f4-6ed6d7e24d6a" target='blank'>Política de Privacidad</a><br />
            <a href="https://www.termsfeed.com/live/1198691b-b59a-4f5b-a1eb-9fa961583df6" target='blank'>Términos de Uso</a>

          </section>
        </div>
        <div className="text-center text-dark p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
          © 2020 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
      </footer>

    </div>

  );
}

export default Footer;