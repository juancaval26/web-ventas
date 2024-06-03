import React, { useState, useEffect }  from 'react';
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

    useEffect(() => {
        const fetchProductos = async () => {
          const snapshot = await db.collection('producto').get();
          const productosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setProductos(productosData);
        };
    
        fetchProductos();
      }, []);   
    
      const ProductoCreado = (producto) => {
        setProductos([...productos, producto]); // Agrega el nuevo producto a la lista existente
      };

  return (
    <div>
      <div className='mb-2 m-2' >
      <CrearProducto  ProductoCreado={ProductoCreado}/>
      </div>
      <div className='mb-2 m-2' >
      <ListarProductos productos={productos}/>
      </div>
      <Footer></Footer> 
      </div> 

  );
}

export default Producto;
