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

function sign(){

  var cedula = document.getElementById("cedula").value
  var primer_nombre = document.getElementById("primer_nombre").value
  var segundo_nombre = document.getElementById("segundo_nombre").value
  var primer_apellido = document.getElementById("primer_apellido").value
  var segundo_apellido = document.getElementById("segundo_apellido").value
  var peso = document.getElementById("peso").value
  var imc = document.getElementById("imc").value
  var distrito = document.getElementById("distrito").value
  var canton = document.getElementById("canton").value
  var provincia = document.getElementById("provincia").value
  var correo_electronico = document.getElementById("correo_electronico").value
  var contrasena = document.getElementById("contrasena").value

  axios
      .post("http://localhost:5236/api/cliente", {
        cedula: cedula,
        primer_nombre: primer_nombre,
        segundo_nombre: segundo_nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        peso: peso,
        imc: imc,
        distrito: distrito,
        canton: canton,
        provincia: provincia,
        correo_electronico: correo_electronico,
        contrasena: contrasena
      })
      .then((response) => {
        // Actualizar el estado de los pacientes con los nuevos datos ingresados
        alert("¡Registro exitoso!");
        window.location = "/logincliente"
      })
      .catch((error) => {
          alert("No ha sido posible su registro.");
      });
}

function Signup () {
    return (
        <MDBContainer className="my-5 gradient-form">
    
          <MDBRow>
            <MDBCol col='6' className="mb-5">
              <div className="d-flex flex-column ms-5">
    
                <div className="text-center">
                  <img src={Logo} width='155px'/>
                  <h4 className="mt-1 mb-5 pb-1">Gym TEC</h4>
                </div>
    
                <label>Cédula</label>
                <MDBInput wrapperClass='mb-4' placeholder='Cédula' id='cedula' type='id'/>

                <label>Nombre completo</label>
                <MDBInput wrapperClass='mb-1' placeholder='Primer nombre' id='primer_nombre' type='id'/>
                <MDBInput wrapperClass='mb-1' placeholder='Segundo nombre' id='segundo_nombre' type='id'/>
                <MDBInput wrapperClass='mb-1' placeholder='Primer apellido' id='primer_apellido' type='id'/>
                <MDBInput wrapperClass='mb-4' placeholder='Segundo apellido' id='segundo_apellido' type='id'/>
                
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  name="fecha_apertura"
                  required
                />
                
                <hr></hr>

                <label>Peso</label>
                <MDBInput wrapperClass='mb-4' placeholder='Peso'  id='peso' type='id'/>

                <label>IMC</label>
                <MDBInput wrapperClass='mb-4' placeholder='Imc'  id='imc' type='id'/>

                <label>Dirección</label>
                <MDBInput wrapperClass='mb-1' placeholder='Distrito'  id='distrito' type='id'/>
                <MDBInput wrapperClass='mb-1' placeholder='Cantón'  id='canton' type='id'/>
                <MDBInput wrapperClass='mb-4' placeholder='Provincia'  id='provincia' type='id'/>

                <label>Correo electrónico</label>
                <MDBInput wrapperClass='mb-4' placeholder='Correo electrónico'  id='correo_electronico' type='id'/>

                <label>Contraseña</label>
                <MDBInput wrapperClass='mb-4' placeholder='Contraseña'  id='contrasena' type='password'/>

                <div className="text-center pt-1 mb-5 pb-1">
                  <button style={{ color: '#FFF', backgroundColor: '#008CBA', borderRadius: '12px', padding: '12px', border: '2px solid #008CBA'}} onClick={sign}>Registrarse</button>
                </div>
              </div>
    
            </MDBCol>
            
          </MDBRow>
          
        </MDBContainer>
      );
}

export default Signup