// src/components/Footer.js

import React, { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useTheme } from './ThemeContext';
import '../TemaOscuro.css'; // Importa tus estilos de tema

function Footer() {
  const { theme } = useTheme(); // Estado para el tema

  useEffect(() => {
    document.body.className = theme + '-mode'; // Cambia la clase del body
  }, [theme]);

  return (
    <div className={`container ${theme}-mode`}>
      <footer className={`text-center ${theme}-mode-footer`}>
        <div className="container mb-4">
          <section className="mb-4">
            <Nav.Link href="" style={{ fontFamily: "Segoe UI Historic, Segoe UI", color: 'inherit', textDecoration: 'none' }}>Facebook</Nav.Link>
            <Nav.Link href="" style={{ fontFamily: "Segoe UI Historic, Segoe UI", color: 'inherit', textDecoration: 'none' }}>Instagram</Nav.Link>
            <Nav.Link style={{ fontFamily: "Segoe UI Historic, Segoe UI", color: 'inherit', textDecoration: 'none' }}>juancamilovalderrama@gmail.com</Nav.Link>
          </section>
          <section className="mb-4">
            <Nav.Link href="https://www.termsfeed.com/live/f533fc70-3525-4010-a9f4-6ed6d7e24d6a" style={{ textDecoration: 'none', color: 'inherit',fontFamily: "Segoe UI Historic, Segoe UI" }} target='blank'>Política de Privacidad</Nav.Link>
            <Nav.Link href="https://www.termsfeed.com/live/1198691b-b59a-4f5b-a1eb-9fa961583df6" style={{ textDecoration: 'none', color: 'inherit', fontFamily: "Segoe UI Historic, Segoe UI" }} target='blank'>Términos de Uso</Nav.Link>
          </section>
        </div>
        <div className="text-center text-light p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', fontFamily: "Segoe UI Historic, Segoe UI" }}>
          © 2020 Copyright:
          <a className="text-light" href="https://mdbootstrap.com/" style={{ color: 'inherit', fontFamily: "Segoe UI Historic, Segoe UI" }}>MDBootstrap.com</a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
