import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { Form, Button, Spinner } from 'react-bootstrap';

const CrearResenia = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [referencia, setReferencia] = useState('');
  const [calificacion, setCalificacion] = useState(1);
  const [comentario, setComentario] = useState('');
  const [imagen, setImagen] = useState(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleGuardarResena = async (e) => {
    e.preventDefault();

    let imagenURL = '';

    if (imagen) {
      setSubiendoImagen(true);
      try {
        const storageRef = firebase.storage().ref();
        const imagenRef = storageRef.child(`resenias/${imagen.name}`);
        await imagenRef.put(imagen);
        imagenURL = await imagenRef.getDownloadURL();
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        alert('Hubo un error al subir la imagen. Por favor intenta de nuevo más tarde.');
        setSubiendoImagen(false);
        return;
      }
      setSubiendoImagen(false);
    }

    try {
      const db = firebase.firestore();
      await db.collection('resenia').add({
        referencia,
        usuario: nombreUsuario,
        calificacion,
        comentario,
        fecha: firebase.firestore.FieldValue.serverTimestamp(),
        imagenURL,
      });

      alert('¡Comentario enviado con éxito!');
      setNombreUsuario('');
      setReferencia('');
      setCalificacion(1);
      setComentario('');
      setImagen(null);
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
      alert('Hubo un error al enviar el comentario. Por favor intenta de nuevo más tarde.');
    }
  };

  // Verificar el estado de autenticación cuando el componente se monta
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      window.location.href = '/Login';
    }
  });

  const handleImagenChange = (e) => {
    if (e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  // Renderizar solo si el usuario está autenticado
  if (!authenticated) {
    return null; // o un mensaje de acceso denegado, etc.
  }
  return (
    <div>
      <h2>Deja tu Comentario</h2>
      <Form onSubmit={handleGuardarResena}>
        <Form.Group controlId="nombreUsuario">
          <Form.Label>Nombre de Usuario:</Form.Label>
          <Form.Control
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="referencia">
          <Form.Label>Referencia:</Form.Label>
          <Form.Control
            type="text"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="calificacion">
          <Form.Label>Calificación:</Form.Label>
          <Form.Control
            as="select"
            value={calificacion}
            onChange={(e) => setCalificacion(parseInt(e.target.value))}
            required
          >
            <option value={1}>1 - Muy malo</option>
            <option value={2}>2 - Malo</option>
            <option value={3}>3 - Regular</option>
            <option value={4}>4 - Bueno</option>
            <option value={5}>5 - Excelente</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="comentario">
          <Form.Label>Comentario:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="imagen">
          <Form.Label>Subir Imagen:</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImagenChange} />
        </Form.Group>
        {subiendoImagen && <Spinner animation="border" />}
        <Button variant="primary" type="submit" disabled={subiendoImagen}>
          Enviar Comentario
        </Button>
      </Form>
    </div>
  );
};

export default CrearResenia;
