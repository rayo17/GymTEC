import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// Administrador
import VistaPrincipal from './VistaPrincipal';
import VistaAdministrador from './VistaAdministrador/VistaAdministrador';
import LoginAdmin from './VistaAdministrador/LoginAdmin';
import GestionPuestos from './VistaAdministrador/GestionPuestos';
import GestionSucursales from './VistaAdministrador/GestionSucursales';
import GestionTratamientosSpa from './VistaAdministrador/GestionTratamientosSpa';
import GestionPlanillas from './VistaAdministrador/GestionPlanillas';
import GestionProductos from './VistaAdministrador/GestionProductos';
import GestionInventario from './VistaAdministrador/GestionInventario';
import GestionTiposEquipo from './VistaAdministrador/GestionTiposEquipo';
import GestionServicios from './VistaAdministrador/GestionServicios';
import GestionEmpleados from './VistaAdministrador/GestionEmpleados';
import ConfigGimnasio from './VistaAdministrador/ConfiguracionGimnasio';

import GeneracionPlanilla from './VistaAdministrador/GeneracionPlanilla';


// Cliente
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
            <Route path='/gestionproductos' element={ <GestionProductos/> }/>
            <Route path='/gestioninventario' element={ <GestionInventario/> }/>
            <Route path='/gestiontiposequipo' element={ <GestionTiposEquipo/> }/>
            <Route path='/gestionservicios' element={ <GestionServicios/> }/>
            <Route path='/gestionempleados' element={ <GestionEmpleados/> }/>
            <Route path= '/configGimnasio' element={<ConfigGimnasio />}/>
            <Route path='/gestionempleados' element={ <GestionEmpleados/> }/>

            <Route path='/generacionplanilla' element={ <GeneracionPlanilla/> }/>





            <Route path='/logincliente' element={ <LoginCliente/> }/>
          </Routes>
      </Router>
      
    </div>
  );
}

export default App;