import React, { useState } from 'react';
import Footer from './Footer';
import firebase from 'firebase/compat/app';
import GaleriaGeneral from './GaleriaGeneral';
import firebaseConfig from './FirebaseConf';


function Home() {
  firebase.initializeApp(firebaseConfig);
  // const [rutaImagenes, setRutaImagenes] = useState('');

  // const handleChangeRuta = (nuevaRuta) => {
  //   setRutaImagenes(nuevaRuta);
  // };

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