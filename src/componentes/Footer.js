import React from 'react';

function Footer() {
    return (
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h4>Contacto</h4>
                <li><a href='https://wa.me/573232059679'>Whatsapp</a></li>
              </div>
              <div className="col-md-4">
                <h4>Información Legal</h4>
                <ul>
                  <li><a href="/politica-privacidad">Política de Privacidad</a></li>
                  <li><a href="/terminos-uso">Términos de Uso</a></li>
                </ul>
              </div>
              <div className="col-md-4">
                <h4>Redes Sociales</h4>
                <ul>
                  <li><a href="#">Facebook</a></li>
                  <li><a href="#">Instagram</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      );
}

export default Footer;