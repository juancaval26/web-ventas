import React, { useState, useEffect }  from 'react';
import Footer from './Footer'; 
import ListarProductos from './ListarProductos';
import CrearProducto from './CrearProductos';
import FirebaseConfig from './FirebaseConfig';
import firebase from 'firebase/compat/app';
// import Container from 'react-bootstrap/Container';

if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig);
  }
  const db = firebase.firestore();

function Destacados() {


  return (
    <div>
      <Footer></Footer> 
      </div> 

  );
}

export default Destacados;
