import React, { Component } from 'react';
import { Navbar } from "../Navigation/Navbar"
import axios from 'axios';
//import  Menu  from '../sites/Menu';
//import NuevoPacienteFormulario from "./NuevoPacienteFormulario.js";
import { CSSTransition } from 'react-transition-group';
//import AñadirData from './AñadirData';

class GestionSucursales extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      pacientes: [], // lista de pacientes obtenidos desde el API
      telefonos: [], // lista de teléfonos para cada paciente
      patologias: [], // lista de patologías para cada paciente
      direcciones: [], // lista de direcciones para cada paciente
      showForm: false, // variable para mostrar/ocultar el formulario para agregar pacientes
      error: null, // variable para guardar posibles errores del API
      showDialog: false, // variable para mostrar/ocultar el diálogo para agregar nuevos pacientes
      showtwoDialog: false, // variable para mostrar/ocultar el diálogo para añadir información adicional a un paciente existente
      showtwoForm: false, // variable para mostrar/ocultar el formulario para añadir información adicional a un paciente existente
    };
  }
  /*
  // función para alternar la visibilidad del formulario para agregar pacientes
  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  // función para alternar la visibilidad del diálogo para agregar nuevos pacientes
  toggleDialog = () => {
    this.setState(prevState => ({ showDialog: !prevState.showDialog }));
  };

  // función para alternar la visibilidad del formulario para añadir información adicional a un paciente existente
  togglet = () => {
    this.setState({ showtwoForm: !this.state.showtwoForm });
  };

  // función para alternar la visibilidad del diálogo para añadir información adicional a un paciente existente
  toggletD = () => {
    this.setState(prevState => ({ showtwoDialog: !prevState.showtwoDialog }));
  };

  // función que se ejecuta cuando se carga el componente
  componentDidMount() {
    this.handleNewPatient(); // se obtiene la lista de pacientes
  }

  // función para obtener la lista de pacientes, direcciones, teléfonos y patologías desde el API
  handleNewPatient = () => {
    axios.get('http://localhost:5004/api/paciente') // obtiene la lista de pacientes desde el API
      .then(response => {
        this.setState({ pacientes: response.data }); // guarda la lista de pacientes en el estado
      })
      .catch(error => {
        this.setState({ error: error.message }); // guarda el error en el estado en caso de que haya alguno
      });

    axios.get('http://localhost:5004/api/Paciente_Direcciones') // obtiene la lista de direcciones para cada paciente desde el API
      .then(response => {
        const direcciones = {};
        response.data.forEach(direccion => {
          if (!direcciones[direccion.paciente]) { // si no existe una entrada para el paciente actual en la lista de direcciones, se crea una
            direcciones[direccion.paciente] = [];
          }
          direcciones[direccion.paciente].push(direccion.ubicacion); // se agrega la dirección actual a la lista de direcciones del paciente
        });
        axios.get('http://localhost:5004/api/Paciente_Telefonos') // obtiene la lista de teléfonos para cada paciente desde el API
          .then(response => {
            const telefonos = {};
            response.data.forEach(telefono => {
              if (!telefonos[telefono.paciente]) { // si no existe una entrada para el paciente actual en la lista de teléfonos, se crea una
                telefonos[telefono.paciente] = [];
              }
              telefonos[telefono.paciente].push(telefono.telefono); // se agrega el teléfono actual a la lista de teléfonos del paciente
            });
            this.setState({ telefonos }); // se guarda la lista de teléfonos en el estado
          })
          .catch(error => {
            this.setState({ error: error.message }); // guarda el error en el estado en caso de que haya alguno
          });

        axios.get('http://localhost:5004/api/Patologia') // obtiene la lista de patologías para cada paciente desde el API
          .then(response => {
            const patologias = {};
            response.data.forEach(patologia => {
              if (!patologias[patologia.paciente]) { // si no existe una entrada para el paciente actual en la lista de patologías, se crea una
                patologias[patologia.paciente] = [];
              }
              patologias[patologia.paciente].push({ // se agrega la patología actual a la lista de patologías del paciente
                nombre: patologia.nombre,
                tratamiento: patologia.tratamiento
              });
            });
            this.setState({ patologias }); // se guarda la lista de patologías en el estado
          })
          .catch(error => {
            this.setState({ error: error.message }); // guarda el error en el estado en caso de que haya alguno
          });

        this.setState({ direcciones }); // se guarda la lista de direcciones en el estado
      })
      .catch(error => {
        this.setState({ error: error.message }); // guarda el error en el estado en caso de que haya alguno
      });
  }

  // función para abrir el diálogo para agregar nuevos pacientes
  openDialog() {
    this.setState({ isOpen: true });
    document.body.style.overflow = "hidden";
    document.getElementById("root").classList.add("blur");
    document.querySelector(".dialog").classList.add("dialog-enter");
  }

  // función para cerrar el diálogo para agregar nuevos pacientes
  closeDialog() {
    this.setState({ isOpen: false });
    document.body.style.overflow = "auto";
    document.getElementById("root").classList.remove("blur");
    document.querySelector(".dialog").classList.add("dialog-exit");
    setTimeout(() => {
      document.querySelector(".dialog").classList.remove("dialog-enter", "dialog-exit");
    }, 500); // espera a que termine la transición antes de remover las clases
  } */

  // función que renderiza el componente
render() {
  const { pacientes, direcciones, error, showDialog, showtwoDialog } = this.state;

  return (
    <div style={{ backgroundColor: '#fff', textAlign: 'center' }}>
        <Navbar/>
  <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Sucursales</h1>
      {error && <div>Error: {error}</div>}
      <table style={{ borderCollapse: 'collapse', width: '80%', margin: '0 auto'}} className="table border shadow">
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Nombre</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Dirección</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Fecha apertura</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Horario de atención</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Administrador</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Capacidad máxima</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Teléfonos</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Spa</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Tienda</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(sucursal => (
            <tr key={sucursal.cedula}>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursal.nombre}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{this.state.direcciones[sucursal.nombre] ? this.state.direcciones[sucursal.nombre].join(',') : ''}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursal.fecha_apertura}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursal.horario_atencion}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursal.administrador}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursal.capacidad}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{this.state.telefonos[sucursal.nombre] ? this.state.telefonos[sucursal.nombre].join(', ') : ''}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursal.activacion_spa}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursal.activacion_tienda}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#fff', color: '#4CAF50', border: '2px solid #4CAF50', cursor: 'pointer' }} 
      onClick={this.toggleDialog}>Nueva sucursal</button>
      {showDialog && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)", // fondo semitransparente
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999 // asegurarse de que el diálogo esté por encima del resto del contenido
            }}
          >
            <div>
          <CSSTransition in={this.state.isOpen} classNames="dialog" timeout={500}>
          <div
            className="dialog"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "80%",
              maxHeight: "80%",
              overflow: "auto",
              marginBottom: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // sombra para dar profundidad
            }}
          >
            {/* contenido del diálogo */}
            
          </div>
        </CSSTransition>
          </div>
        </div>
        )}
        <button style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#fff', color: '#e8ed4c', border: '2px solid #e8ed4c', cursor: 'pointer' }} 
      onClick={this.toggletD}>Editar datos de sucursal</button>
      {showtwoDialog && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)", // fondo semitransparente
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999 // asegurarse de que el diálogo esté por encima del resto del contenido
            }}
          >
            <div>
          <CSSTransition in={this.state.isOpen} classNames="dialog" timeout={500}>
          <div
            className="dialog"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "80%",
              maxHeight: "80%",
              overflow: "auto",
              marginBottom: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // sombra para dar profundidad
            }}
          >
            {/* contenido del diálogo */}
            
          </div>
        </CSSTransition>
          </div>
        </div>
        )}
        <button style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#fff', color: '#ff0000', border: '2px solid #ff0000', cursor: 'pointer' }} 
      onClick={this.toggleDialog}>Eliminar sucursal</button>
      {showDialog && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)", // fondo semitransparente
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999 // asegurarse de que el diálogo esté por encima del resto del contenido
            }}
          >
            <div>
          <CSSTransition in={this.state.isOpen} classNames="dialog" timeout={500}>
          <div
            className="dialog"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "80%",
              maxHeight: "80%",
              overflow: "auto",
              marginBottom: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // sombra para dar profundidad
            }}
          >
            {/* contenido del diálogo */}
            
          </div>
        </CSSTransition>
          </div>
        </div>
        )}


      </div>
    );
  }
}

export default GestionSucursales;