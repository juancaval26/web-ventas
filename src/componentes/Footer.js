import React from 'react';
import Nav from 'react-bootstrap/Nav';


function Footer() {
  return (
    <div className="container">
      <footer class="text-center text-white" style={{ backgroundColor: '#ffffff' }}>
        <div className="container mb-4">
          <section className="mb-4">
            <Nav.Link href="" style={{'fontFamily': "Gill Sans, sans-serif", color: 'black', 'text-decoration': 'none'}}>Facebook</Nav.Link>
            <Nav.Link href="" style={{'fontFamily': "Gill Sans, sans-serif", color: 'black', 'text-decoration': 'none'}}>Instagram</Nav.Link>
            <Nav.Link style={{'fontFamily': "Gill Sans, sans-serif", color: 'black', 'text-decoration': 'none'}}>juancamilovalderrama@gmail.com</Nav.Link>
          </section>

          <section className="mb-4">
          <Nav.Link href="https://www.termsfeed.com/live/f533fc70-3525-4010-a9f4-6ed6d7e24d6a" style={{ 'text-decoration': 'none', color: 'black', }} target='blank'>Política de Privacidad</Nav.Link>
          <Nav.Link href="https://www.termsfeed.com/live/1198691b-b59a-4f5b-a1eb-9fa961583df6" style={{ 'text-decoration': 'none', color: 'black', }} target='blank'>Términos de Uso</Nav.Link>
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