import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import VistaPrincipal from './VistaPrincipal';
import LoginAdmin from './VistaAdministrador/LoginAdmin';
import LoginCliente from './VistaCliente/LoginCliente';


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={ <VistaPrincipal/> }/>
            <Route path='/loginadmin' element={ <LoginAdmin/> }/>
            <Route path='/logincliente' element={ <LoginCliente/> }/>
          </Routes>
      </Router>
      
    </div>
  );
}

export default App;