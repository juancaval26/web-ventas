import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './componentes/BarraNav';
import Home from './componentes/Home';
import CalzadoGeneral from './componentes/CalzadoGeneral';
import DetallesCalzado from './componentes/DetallesCalzado';
import Hogar from './componentes/Hogar';
import CalzadoHombre from './componentes/CalzadoHombre';
import CalzadoMujer from './componentes/CalzadoMujer';
import CarruselDetalle from './componentes/CarruselDetalle';
import CalzadoNuevo from './componentes/CalzadoNuevo';
import Destacados from './componentes/Destacados';
import LoginRegistro from './componentes/LoginRegistro';
import Login from './componentes/login';
import GaleriaGeneral from './componentes/GaleriaGeneral';
import GaleriaImagenes from './componentes/GaleriaImagenes';
import ListarProductos from './componentes/ListarProductos';
import CrearProducto from './componentes/CrearProductos';
import Producto from "./componentes/Productos";
import LogoutButton from "./componentes/Logout";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
          setIsAuthenticated(true);
      } else {
          setIsAuthenticated(false);
      }
  });

  // Limpiar el efecto al desmontar el componente
  return unsubscribe;
}, []);


    return (
      <Router>
        <Navbar isAuthenticated={isAuthenticated}/> 
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/CalzadoGeneral" element={<CalzadoGeneral />} />
          <Route path="/Hogar" element={<Hogar />} />
          <Route path='/CalzadoHombre' element={<CalzadoHombre />} />
          <Route path='/CalzadoMujer' element={<CalzadoMujer />} />
          <Route path='/DetallesCalzado/:marca' element={<DetallesCalzado />} />
          <Route path='/CarruselDetalle' element={<CarruselDetalle />} />
          <Route path='/CalzadoNuevo' element={<CalzadoNuevo />} />
          <Route path='/Destacados' element={<Destacados />} />
          <Route path='/LoginRegistro' element={<LoginRegistro />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/GaleriaGeneral' element={<GaleriaGeneral />} />
          <Route path='/GaleriaImagenes' element={<GaleriaImagenes />} />
          <Route path='/ListarProductos' element={<ListarProductos />} />
          <Route path='/CrearProducto' element={<CrearProducto />} />
          <Route path='/Producto' element={<Producto />} />
          <Route path='/LogoutButton' element={<LogoutButton />} />
          
        </Routes>
    </Router>
    );
}
export default App;