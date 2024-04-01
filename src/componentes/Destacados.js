import React, { useState, useEffect }  from 'react';
import Footer from './Footer'; 
import ListarProductos from './ListarProductos';
import CrearProducto from './CrearProductos';
import firebaseConfig from './FirebaseConf';
import firebase from 'firebase/compat/app';
// import Container from 'react-bootstrap/Container';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
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
