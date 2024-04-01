import React from 'react';
import { Button } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function LogoutButton(){
    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            console.log("Usuario cerró sesión de manera global");
        }).catch((error) => {
            console.error("Error al cerrar sesión:", error.message);
        });
    };

    return (
        <Button variant="danger" onClick={handleLogout}>Cerrar sesión</Button>
    );
};

export default LogoutButton;