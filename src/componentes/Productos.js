import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import ListarProductos from './ListarProductos';
import CrearProducto from './CrearProductos';
import FirebaseConfig from './FirebaseConfig';
import firebase from 'firebase/compat/app';

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}
const db = firebase.firestore();

function Producto() {
  const [productos, setProductos] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      const snapshot = await db.collection('producto').get();
      const productosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProductos(productosData);
    };

    fetchProductos();

    // Verificar el estado de autenticación cuando el componente se monta
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        window.location.href = '/Login';
      }
    });
  }, []);

  const ProductoCreado = (producto) => {
    setProductos([...productos, producto]); // Agrega el nuevo producto a la lista existente
  };

  // Renderizar solo si el usuario está autenticado
  if (!authenticated) {
    return null; // o un mensaje de acceso denegado, etc.
  }

  return (
    <div>
      <div className='mb-2 m-2'>
        <CrearProducto ProductoCreado={ProductoCreado} />
      </div>
      <div className='mb-2 m-2'>
        <ListarProductos productos={productos} />
      </div>
      <Footer />
    </div>
  );
}

export default Producto;
