import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import VistaPrincipal from './VistaPrincipal';
import VistaAdministrador from './VistaAdministrador';
import LoginAdmin from './VistaAdministrador/LoginAdmin';
import GestionPuestos from './VistaAdministrador/GestionPuestos';
import GestionSucursales from './VistaAdministrador/GestionSucursales';
import GestionTratamientosSpa from './VistaAdministrador/GestionTratamientosSpa';
import GestionPlanillas from './VistaAdministrador/GestionPlanillas';
import LoginCliente from './VistaCliente/LoginCliente';


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={ <VistaPrincipal/> }/>
            <Route path='/administrador' element={ <VistaAdministrador/> }/>
            <Route path='/loginadmin' element={ <LoginAdmin/> }/>
            <Route path='/gestionpuestos' element={ <GestionPuestos/> }/>
            <Route path='/gestionsucursales' element={ <GestionSucursales/> }/>
            <Route path='/gestiontratamientosspa' element={ <GestionTratamientosSpa/> }/>
            <Route path='/gestionplanillas' element={ <GestionPlanillas/> }/>


            <Route path='/logincliente' element={ <LoginCliente/> }/>
          </Routes>
      </Router>
      
    </div>
  );
}

export default App;