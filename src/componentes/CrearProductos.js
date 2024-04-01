import React, { useState } from 'react';
import { format } from 'date-fns';
import { Form, Button, Modal } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import firebaseConfig from './FirebaseConf';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const fechaInstancia = new Date();
const fecha = format(fechaInstancia, 'yyyy-MM-dd');
function CrearProducto({ ProductoCreado }) {
  

  const [nuevoProducto, setNuevoProducto] = useState({
    referencia: '',
    marca: '',
    talla: '',
    color: '',
    precio: '',
    fecha: fecha,
    imagenUrls: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const fileList = Array.from(e.target.files);

    if (fileList.length > 0) {
      const storageRef = firebase.storage().ref();

      const urlsPromises = fileList.map((file) => {
        const imageRef = storageRef.child(`img/${nuevoProducto.marca}/${file.name}`);
        return imageRef.put(file).then(() => imageRef.getDownloadURL());
      });

      const urls = await Promise.all(urlsPromises);

      setNuevoProducto((prevProducto) => ({
        ...prevProducto,
        imagenUrls: prevProducto.imagenUrls.concat(urls),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productoConImagenes = { ...nuevoProducto };
      await db.collection('producto').add(productoConImagenes);
      console.log('Producto creado exitosamente con imágenes');

      ProductoCreado(productoConImagenes);
      
      setNuevoProducto({
        referencia: '',
        marca: '',
        talla: '',
        color: '',
        precio: '',
        fecha: fecha,
        imagenUrls: [],
      });

      setShowModal(false);
    } catch (error) {
      console.error('Error al crear el producto con imágenes:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <h1>Productos</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Crear Producto
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formReferencia">
              <Form.Label>Referencia</Form.Label>
              <Form.Control type="text" name="referencia" value={nuevoProducto.referencia} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control type="text" name="marca" value={nuevoProducto.marca} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formTalla">
              <Form.Label>Talla</Form.Label>
              <Form.Control type="text" name="talla" value={nuevoProducto.talla} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control type="text" name="color" value={nuevoProducto.color} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="precio" value={nuevoProducto.precio} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formImagen">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" accept="image/*" multiple onChange={handleImageChange} name="imagen"/>
                {nuevoProducto.imagenUrls.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={`Imagen ${index}`} style={{ width: '20%', marginTop: '15px', marginBottom: '10px', margin: '3px' }}/>
                ))}
            </Form.Group>
            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CrearProducto;
