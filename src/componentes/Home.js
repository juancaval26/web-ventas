import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import FirebaseConfig from './FirebaseConfig';
import GaleriaGeneral from './GaleriaGeneral';
import Footer from './Footer';

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

const db = firebase.firestore();

function Home() {

  return (
    <div>
    {/* <CarruselInicio /> */}
    {/* <button onClick={() => handleChangeRuta('/img/adidas')}>Adidas</button> */}
    {/* <button onClick={() => handleChangeRuta('/img/armani')}>Armani</button> */}
    {/* <button onClick={() => handleChangeRuta('/img/balance')}>Balance</button> */}
    {/* <button onClick={() => handleChangeRuta('/img/bona')}>Bona</button> */}
    {/* <button onClick={() => handleChangeRuta('/img/jordan')}>Jordan</button> */}
    {/* <button onClick={() => handleChangeRuta('/img/nike')}>Nike</button> */}
    {/* <button onClick={() => handleChangeRuta('/img/skecher')}>Skecher</button> */}

    {/* <GaleriaGeneral rutaImagenes={rutaImagenes} /> */}
    <GaleriaGeneral />
    {/* <GaleriaInicio /> */}
    <Footer />
  </div>
  );
}

export default Home;
