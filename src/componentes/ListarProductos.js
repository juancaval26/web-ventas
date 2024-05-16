import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import FirebaseConfig from './FirebaseConfig';
import { Modal, Button, Form } from 'react-bootstrap';

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

const db = firebase.firestore();

function ListarProductos() {
  const [productos, setProductos] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
      const productoAEliminar = productos.find((producto) => producto.id === id);
      const imagenesUrls = productoAEliminar.imagenUrls;
      
      await db.collection('producto').doc(id).delete();
      
      imagenesUrls.forEach(async (url) => {
        const imagenRef = firebase.storage().refFromURL(url);
        await imagenRef.delete();
      });
  
      setProductos(productos.filter((producto) => producto.id !== id));
      
      console.log('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleEditarProducto = (producto) => {
    setProductoEditado(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setProductoEditado(null);
    setShowModal(false);
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

  const productsPerPage = 7;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Referencia</th>
            <th>Marca</th>
            <th>Talla</th>
            {/* <th>Color</th> */}
            <th>Precio</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Género</th>
            <th style={{ textAlign: 'center' }}>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.referencia}</td>
              <td>{producto.marca}</td>
              <td>{producto.talla}</td>
              {/* <td>{producto.color}</td> */}
              <td>{producto.precio}</td>
              <td>{producto.fecha}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.genero}</td>
              <td>
                {producto.imagenUrls.map((imagenUrl, index) => (
                  <img
                    key={index}
                    src={imagenUrl}
                    alt={`Imagen ${index}`}
                    style={{ width: '50px', height: '50px', borderRadius: '100%', marginRight: '5px' }} 
                  />
                ))}
              </td>
              <td>
                <button onClick={() => handleEliminarProducto(producto.id)} className='btn btn-danger' style={{ margin: '5px'}}>Eliminar</button>
                <button onClick={() => handleEditarProducto(producto)} className='btn btn-primary'>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="pagination" style={{ justifyContent: 'center' }}>
        {Array.from({ length: Math.ceil(productos.length / productsPerPage) }, (_, i) => (
          <li key={i} className={i + 1 === currentPage ? 'page-item active' : 'page-item'}>
            <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
          </li>
        ))}
      </ul>

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
            {/* <Form.Group controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control type="text" value={productoEditado?.color || ''} onChange={(e) => setProductoEditado({ ...productoEditado, color: e.target.value })} />
            </Form.Group> */}
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="text" value={productoEditado?.precio || ''} onChange={(e) => setProductoEditado({ ...productoEditado, precio: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formGénero">
              <Form.Label>Género</Form.Label>
              <Form.Control type="text" value={productoEditado?.genero || ''} onChange={(e) => setProductoEditado({ ...productoEditado, genero: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as='textarea' rows={5} value={productoEditado?.descripcion || ''} onChange={(e) => setProductoEditado({ ...productoEditado, descripcion: e.target.value })} />
            </Form.Group>
            {/* <Form.Group controlId="formImagen">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type='text' accept="image/*" multiple value={productoEditado?.imagenUrls || ''} onChange={(e) => setProductoEditado({ ...productoEditado, imagenUrls: e.target.value })} />
            </Form.Group> */}
            <Form.Group controlId="formImagen">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" accept="image/*" multiple onChange={productoEditado} name="imagen"/>
                {productoEditado?.imagenUrls.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={`Imagen ${index}`} style={{ width: '20%', marginTop: '15px', marginBottom: '10px', margin: '3px' }}/>
                ))}
            </Form.Group>
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
