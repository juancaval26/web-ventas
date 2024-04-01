import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import handleLogout from './Logout'; 

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setIsAuthenticated(true);
                // Consultar el rol del usuario desde Firestore
                const userId = user.uid;
                const db = firebase.firestore();
                db.collection("rol").doc(userId).get().then((doc) => {
                    if (doc.exists) {
                        setUserRole(doc.data().role);
                    }
                });
            } else {
                setIsAuthenticated(false);
                setUserRole(null);
            }
        });

        return unsubscribe;
    }, []);

    const handleLogin = async () => {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            setIsAuthenticated(true);
            // Guardar el rol del usuario en Firestore
            const db = firebase.firestore();
            const userId = user.uid;
            db.collection("rol").doc(userId).set({
                role: "admin" // Aquí asigna el rol según tus necesidades
            });
        } catch (error) {
            console.error("Error al hacer login:", error.message);
        }
    };

    return (
        <Container>
            {!isAuthenticated && (
                <Form>
                    <Form.Group className="col-sm-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="col-sm-4">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button onClick={handleLogin} className="btn btn-success" style={{ marginTop: '10px' }}>Iniciar sesión</Button>
                </Form>
            )}

            {isAuthenticated && userRole === "admin" && (
                <Button onClick={handleLogout} className="btn btn-danger">Cerrar sesión</Button>
            )}
        </Container>
    );
}

export default Login;