import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import 'firebase/compat/storage';
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "./FirebaseConf";

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();

function LoginRegistro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleRegistro = async () => {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            // Registro exitoso
            const user = userCredential.user;
            console.log("Usuario registrado:", user);
            // Cerrar modal después de registro exitoso
            setShowModal(false);
        } catch (error) {
            // Manejar errores
            console.error("Error al registrar usuario:", error.message);
        }
    };

    return (
        <div>
            <Button onClick={() => setShowModal(true)}>Registrarse</Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registro de Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleRegistro}>Registrarse</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LoginRegistro;