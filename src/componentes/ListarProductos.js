import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import firebaseConfig from './FirebaseConf';
import { Modal, Button, Form } from 'react-bootstrap'; // Importa Modal y otros componentes de react-bootstrap

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

function ListarProductos() {
  const [productos, setProductos] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null); // Nuevo estado para almacenar el producto que se está editando
  const [showModal, setShowModal] = useState(false); // Nuevo estado para controlar la visibilidad del modal

  useEffect(() => {
    const fetchProductos = async () => {
      const snapshot = await db.collection('producto').get();
      const productosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProductos(productosData);
    };

    fetchProductos();
  }, []);

  const handleEliminarProducto = async (id) => {
    try {
      // Obtener el producto que se va a eliminar
      const productoAEliminar = productos.find((producto) => producto.id === id);
      // Obtener las URLs de las imágenes del producto
      const imagenesUrls = productoAEliminar.imagenUrls;
      
      // Eliminar el producto de la base de datos
      await db.collection('producto').doc(id).delete();
      
      // Eliminar cada imagen del storage de Firebase
      imagenesUrls.forEach(async (url) => {
        const imagenRef = firebase.storage().refFromURL(url);
        await imagenRef.delete();
      });
  
      // Actualizar el estado de productos eliminando el producto eliminado
      setProductos(productos.filter((producto) => producto.id !== id));
      
      console.log('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };
  

  const handleEditarProducto = (producto) => {
    setProductoEditado(producto); // Establece el producto seleccionado para edición
    setShowModal(true); // Muestra el modal
  };

  const handleCloseModal = () => {
    setProductoEditado(null); // Restablece el producto editado
    setShowModal(false); // Oculta el modal
  };

  const handleGuardarEdicion = async () => {
    try {
      if (productoEditado) {
        await db.collection('producto').doc(productoEditado.id).update(productoEditado);
        const updatedProductos = productos.map((p) => (p.id === productoEditado.id ? productoEditado : p));
        setProductos(updatedProductos);
        console.log('Cambios guardados exitosamente');
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Referencia</th>
            <th>Marca</th>
            <th>Talla</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Fecha</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.referencia}</td>
              <td>{producto.marca}</td>
              <td>{producto.talla}</td>
              <td>{producto.color}</td>
              <td>{producto.precio}</td>
              <td>{producto.fecha}</td>
              <td>
  {producto.imagenUrls.map((imagenUrl, index) => (
    <img key={index} src={imagenUrl} alt={`Imagen ${index}`} style={{ width: '100px', marginRight: '5px' }} />
  ))}
</td>
              <td>
                <button onClick={() => handleEliminarProducto(producto.id)} className='btn btn-danger'>Eliminar</button>
                <button onClick={() => handleEditarProducto(producto)} className='btn btn-primary'>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar producto */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formReferencia">
              <Form.Label>Referencia</Form.Label>
              <Form.Control type="text" value={productoEditado?.referencia || ''} onChange={(e) => setProductoEditado({ ...productoEditado, referencia: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control type="text" value={productoEditado?.marca || ''} onChange={(e) => setProductoEditado({ ...productoEditado, marca: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formTalla">
              <Form.Label>Talla</Form.Label>
              <Form.Control type="text" value={productoEditado?.talla || ''} onChange={(e) => setProductoEditado({ ...productoEditado, talla: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control type="text" value={productoEditado?.color || ''} onChange={(e) => setProductoEditado({ ...productoEditado, color: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" value={productoEditado?.precio || ''} onChange={(e) => setProductoEditado({ ...productoEditado, precio: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" value={productoEditado?.fecha || ''} onChange={(e) => setProductoEditado({ ...productoEditado, fecha: e.target.value })} />
            </Form.Group>
            {/* <Form.Group controlId="formImagen">
          <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" name="imagen" value={productoEditado?.imagen || ''} onChange={(e) => setProductoEditado({ ...productoEditado, imagen: e.target.value })} />
          </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarEdicion}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListarProductos;