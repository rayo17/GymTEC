/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
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
  //var id_puesto
  axios
      .get("http://localhost:5236/api/empleado/"+ced+'/'+pass, {
        
      })
      .then((response) => {
        // Actualizar el estado de los pacientes con los nuevos datos ingresados
        var id_puesto = response.data.puesto;
        axios.get("http://localhost:5236/api/puesto/"+id_puesto, {

          })
          .then((response) => {
            alert("¡Bienvenido, "+response.data.descripcion+"!")
            window.location = "/administrador"
          })
      })
      .catch((error) => {
        alert("El usuario y la contraseña no coinciden")
      });
}

function LoginAdmin() {
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
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginAdmin;