import React from 'react';
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
    <GaleriaGeneral />
    <Footer />
  </div>
  );
}

export default Home;
