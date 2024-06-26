import React, { useState } from 'react';
import { format } from 'date-fns';
import { Form, Button, Modal, Spinner } from 'react-bootstrap';  // Importa Spinner
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import FirebaseConfig from './FirebaseConfig';
import { handleImageChange } from './Utilidades'; // Importa la función

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

const db = firebase.firestore();
const fechaInstancia = new Date();
const fecha = format(fechaInstancia, 'yyyy-MM-dd');

function CrearProducto({ ProductoCreado }) {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    referencia: '',
    marca: '',
    tallas: {
      Mujer: '36-39',
      Hombre: '40-44'
    },
    precio: '',
    descripcion: '',
    genero: ["Hombre", "Mujer"],
    tipo: 'Replica AAA',
    fecha: fecha,
    imagenUrls: [],
  });
  const [loading, setLoading] = useState(false);  // Estado del spinner
  const [generoSeleccionado, setGeneroSeleccionado] = useState("Hombre");  // Estado del género seleccionado

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const GeneroChange = (e) => {
    const { value } = e.target;
    setGeneroSeleccionado(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productoConImagenes = { ...nuevoProducto, talla: nuevoProducto.tallas[generoSeleccionado] };
      await db.collection('producto').add(productoConImagenes);
      alert('Producto creado exitosamente');

      ProductoCreado(productoConImagenes);

      //limpiar campos
      setNuevoProducto({
        nombre: '',
        referencia: '',
        marca: "",
        tallas: {
          Mujer: '36-39',
          Hombre: '40-44'
        },
        precio: '',
        descripcion: '',
        genero: ["Hombre", "Mujer"],
        tipo: 'Replica AAA',
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
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleChange} placeholder='Nombre'/>
            </Form.Group>
            <Form.Group controlId="formReferencia">
              <Form.Label>Referencia</Form.Label>
              <Form.Control type="text" name="referencia" value={nuevoProducto.referencia} onChange={handleChange} placeholder='Referencia'/>
            </Form.Group>
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control type="text" name="marca" value={nuevoProducto.marca} onChange={handleChange} placeholder='Marca'/>
            </Form.Group>
            <Form.Group controlId="formGenero">
              <Form.Label>Género</Form.Label>
              <Form.Select name="genero" value={generoSeleccionado} onChange={GeneroChange}>
                {nuevoProducto.genero.map((generos, index) => (
                  <option key={index} value={generos}>{generos}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formTalla">
              <Form.Label>Talla</Form.Label>
              <Form.Control type="text" name="talla" value={nuevoProducto.tallas[generoSeleccionado]} readOnly placeholder='Talla'/>
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="precio" value={nuevoProducto.precio} onChange={handleChange} placeholder='Precio'/>
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="descripcion"
                value={
                  nuevoProducto.descripcion ||
                  'Fabricación Colombiana, queremos brindarte siempre los mejores productos a los mejores precios Siéntete cómod@ y a la moda con nuestros estilos y combínalos de la manera que tú quieras, los productos están elaborados en los mejores materiales.'
                }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formImagen">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" accept="image/*" multiple onChange={(e) => handleImageChange(e, nuevoProducto, setNuevoProducto, setLoading)} name="imagen" />
              {loading && <Spinner animation="border" />}
              {nuevoProducto.imagenUrls.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Imagen ${index}`} style={{ width: '20%', marginTop: '15px', marginBottom: '10px', margin: '3px' }} />
              ))}
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-2'>
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
