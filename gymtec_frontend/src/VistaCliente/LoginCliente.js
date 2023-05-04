import React from 'react';
import axios from "axios";
import Logo from '../Imgs/Logo.png'

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';

function login(){
  
  var ced = document.getElementById("cedula").value
  var pass = document.getElementById("password").value

  axios
      .get("http://localhost:5236/api/cliente/"+ced+'/'+pass, {
        
      })
      .then((response) => {
        // Actualizar el estado de los pacientes con los nuevos datos ingresados
        console.log("Entrando..")
        window.location = "/cliente"
      })
      .catch((error) => {
          console.log("Todo mal bro");
          alert("Usuario no encontrado");
      });
}

function signup(){
    window.location = "/signup"
}

function LoginCliente() {
  return (
    <MDBContainer className="my-5 gradient-form">

      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src={Logo} width='155px'/>
              <h4 className="mt-1 mb-5 pb-1">Gym TEC</h4>
            </div>

            <MDBInput wrapperClass='mb-4' label='Cédula' placeholder='Cédula'  id='cedula' type='id'/>
            <MDBInput wrapperClass='mb-4' label='Contraseña' placeholder='Contraseña' id='password' type='password'/>

            <div className="text-center pt-1 mb-5 pb-1">
              <button style={{ color: '#FFF', backgroundColor: '#008CBA', borderRadius: '12px', padding: '12px', border: '2px solid #008CBA' }} onClick={login}>Iniciar sesión</button>
            </div>
          </div>

        </MDBCol>
        <button style={{ color: '#FFF', backgroundColor: '#008CBA', borderRadius: '12px', padding: '12px', border: '2px solid #008CBA' }} onClick={signup}>Crear cuenta</button>
      </MDBRow>
      
    </MDBContainer>
  );
}

export default LoginCliente;