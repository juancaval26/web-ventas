import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Carousel } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';


function GaleriaGeneral({ rutaImagenes }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const db = firebase.firestore();
        const productosSnapshot = await db.collection('producto').get();
        const productosData = productosSnapshot.docs.map((doc) => doc.data());
        setProductos(productosData);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const getImageUrlFromStorage = async (imageName) => {
    const storage = firebase.storage();
    const storageRef = ref(storage, `${rutaImagenes}/${imageName}`);
    return getDownloadURL(storageRef);
  };
  
  const getImageUrls = async () => {
    const storage = firebase.storage();
    const storageRef = storage.ref(rutaImagenes);
    const imagenes = await storageRef.listAll();
    const imageNames = imagenes.items.map((item) => item.name);
    if (!imageNames || imageNames.length === 0) {
      console.error('No se encontraron imágenes.');
      return [];
    }
    const urls = await Promise.all(imageNames.map(imageName => getImageUrlFromStorage(imageName)));
    return urls;
  };

  return (
    <Container>
  {productos.map((producto, index) => (
              <div key={index}>
      <Link to={`/DetallesCalzado/${producto.marca}`}>
                
                {producto.imagenUrls.map((url, idx) => (
                  <Image key={idx} src={url} alt={`Imagen ${index}-${idx}`} style={{ width: '100px' }} />
                ))}
            </Link>
              </div>
            ))}

{/* <div key={index}>
      <Link to={`/DetallesCalzado/${producto.marca}`}>
  <img src={url} alt={`Imagen ${index}`} style={{ width: '20%', height: '20%', margin: '5px', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }}/>
</Link>
    </div> */}
      {/* <Carousel>
        {imageUrls.map((url, index) => (
          <Carousel.Item key={index}>
            <img src={url} className="d-block" alt={`Imagen ${index + 1}`} style={{ width: '20%', height: '20%', margin: '5px', marginTop: '5%', marginRight: '5px', borderRadius: '10px' }}/>
          </Carousel.Item>
        ))}
      </Carousel> */}
    </Container>
  );
};

export default GaleriaGeneral;
