import React, { Component } from 'react';
import { Navbar } from "../Templates/Navbar"
import axios from 'axios';

import { CSSTransition } from 'react-transition-group';

import NuevaSucursalFormulario from '../Forms/NuevaSucursalFormulario';
import EditarSucursalFormulario from '../Forms/EditarSucursalFormulario';
import EliminarSucursalFormulario from '../Forms/EliminarSucursalFormulario';

import NuevaSucursalTelefonoFormulario from '../Forms/NuevaSucursalTelefonoFormulario';
import EliminarSucursalTelefonoFormulario from '../Forms/EliminarSucursalTelefonoFormulario';


class GestionSucursales extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      sucursales: [], // lista de sucursales obtenidos desde el API
      telefonos: [], // lista de teléfonos para cada paciente
      showForm: false, // variable para mostrar/ocultar el formulario para agregar sucursales
      showtwoForm: false, // variable para mostrar/ocultar el formulario para añadir información adicional a un paciente existente
      showthreeForm: false,
      showTelForm: false,
      showTeltwoForm: false,

      showDialog: false, // variable para mostrar/ocultar el diálogo para agregar nuevos sucursales
      showtwoDialog: false, // variable para mostrar/ocultar el diálogo para añadir información adicional a un paciente existente
      showthreeDialog: false,
      showTelDialog: false, // variable para mostrar/ocultar el diálogo para agregar nuevos sucursales
      showTeltwoDialog: false, // variable para mostrar/ocultar el diálogo para añadir información adicional a un paciente existente

      error: null, // variable para guardar posibles errores del API
    };
  }

  /* FORMS */

  /* PARA AGREGAR SUCURSALES */
  // Función para alternar la visibilidad del formulario para agregar sucursal
  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  // Función para alternar la visibilidad del formulario para editar sucursal
  togglet = () => {
    this.setState({ showtwoForm: !this.state.showtwoForm });
  };

  // Función para alternar la visibilidad del formulario para eliminar sucursal
  toggleth = () => {
    this.setState({ showthreeForm: !this.state.showthreeForm });
  };

  /* PARA AGREGAR TELÉFONOS DE SUCURSALES */
  // Función para alternar la visibilidad del formulario para agregar sucursal
  toggleTelForm = () => {
    this.setState({ showTelForm: !this.state.showTelForm });
  };

  // Función para alternar la visibilidad del formulario para eliminar sucursal
  toggleTelt = () => {
    this.setState({ showTeltwoForm: !this.state.showTeltwoForm });
  };



  /* DIÁLOGOS */
  // Función para alternar la visibilidad del diálogo para agregar nueva sucursal
  toggleDialog = () => {
    this.setState(prevState => ({ showDialog: !prevState.showDialog }));
  };

  // Función para alternar la visibilidad del diálogo para editar sucursal
  toggletD = () => {
    this.setState(prevState => ({ showtwoDialog: !prevState.showtwoDialog }));
  };

  // Función para alternar la visibilidad del diálogo para eliminar sucursal
  togglethD = () => {
    this.setState(prevState => ({ showthreeDialog: !prevState.showthreeDialog }));
  };

  // Función para alternar la visibilidad del diálogo para agregar nueva sucursal
  toggleTelDialog = () => {
    this.setState(prevState => ({ showTelDialog: !prevState.showTelDialog }));
  };

  // Función para alternar la visibilidad del diálogo para editar sucursal
  toggleTeltD = () => {
    this.setState(prevState => ({ showTeltwoDialog: !prevState.showTeltwoDialog }));
  };



  /* PARA COMPONENTES */
  // función que se ejecuta cuando se carga el componente
  componentDidMount() {
    this.handleSucursal(); // se obtiene la lista de sucursales
  }

  // función para obtener la lista de sucursales, y teléfonos desde el API
  handleSucursal = () => {
    axios.get('http://localhost:5236/api/Sucursal') // obtiene la lista de sucursales desde el API
      .then(response => {
        this.setState({ sucursales: response.data }); // guarda la lista de sucursales en el estado
      })
      .catch(error => {
        this.setState({ error: error.message }); // guarda el error en el estado en caso de que haya alguno
      });

    axios.get('http://localhost:5236/api/SucursalTelefonos') // obtiene la lista de teléfonos para cada paciente desde el API
      .then(response => {
        const telefonos = {};
        response.data.forEach(telefono => {
          if (!telefonos[telefono.sucursal]) { // si no existe una entrada para el paciente actual en la lista de teléfonos, se crea una
            telefonos[telefono.sucursal] = [];
          }
          telefonos[telefono.sucursal].push(telefono.telefono); // se agrega el teléfono actual a la lista de teléfonos del paciente
        });
        this.setState({ telefonos }); // se guarda la lista de teléfonos en el estado
      })
      .catch(error => {
        this.setState({ error: error.message }); // guarda el error en el estado en caso de que haya alguno
      });
  }

  handleTelefono = () => {
    axios.get('http://localhost:5236/api/SucursalTelefonos') // obtiene la lista de sucursales desde el API
      .then(response => {
        this.setState({ telefonos: response.data }); // guarda la lista de sucursales en el estado
      })
      .catch(error => {
        this.setState({ error: error.message }); // guarda el error en el estado en caso de que haya alguno
      });
  }

  // función para abrir el diálogo para agregar nuevas sucursales
  openDialog() {
    this.setState({ isOpen: true });
    document.body.style.overflow = "hidden";
    document.getElementById("root").classList.add("blur");
    document.querySelector(".dialog").classList.add("dialog-enter");
  }

  // función para cerrar el diálogo para agregar nuevas sucursales
  closeDialog() {
    this.setState({ isOpen: false });
    document.body.style.overflow = "auto";
    document.getElementById("root").classList.remove("blur");
    document.querySelector(".dialog").classList.add("dialog-exit");
    setTimeout(() => {
      document.querySelector(".dialog").classList.remove("dialog-enter", "dialog-exit");
    }, 500); // espera a que termine la transición antes de remover las clases
  }

  // función que renderiza el componente
render() {
  const { sucursales, error, showDialog, showtwoDialog, showthreeDialog, showTelDialog, showTeltwoDialog } = this.state;

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
          {sucursales.map(sucursale => (
            <tr key={sucursale.nombre}>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursale.nombre}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursale.canton}, {sucursale.distrito}, {sucursale.provincia}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursale.fecha_apertura}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursale.horario_atencion}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursale.administrador}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursale.capacidad_maxima}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{this.state.telefonos[sucursale.nombre] ? this.state.telefonos[sucursale.nombre].join(', ') : ''}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursale.activacion_spa}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{sucursale.activacion_tienda}</td>
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
            <NuevaSucursalFormulario 
              onClose={this.toggleDialog}
              onNewSucursal={this.handleSucursal}
            />
            
          </div>
        </CSSTransition>
          </div>
        </div>
        )}

      <button style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#fff', color: '#ccdb19', border: '2px solid #ccdb19', cursor: 'pointer' }} 
      onClick={this.toggletD}>Editar sucursal</button>
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
            <EditarSucursalFormulario 
              onClose={this.toggletD}
              onEditSucursal={this.handleSucursal}
            />
            
          </div>
        </CSSTransition>
          </div>
        </div>
        )}

      <button style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#fff', color: '#c92d15', border: '2px solid #c92d15', cursor: 'pointer' }} 
      onClick={this.togglethD}>Eliminar sucursal</button>
      {showthreeDialog && (
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
            <EliminarSucursalFormulario 
              onClose={this.togglethD}
              onDeleteSucursal={this.handleSucursal}
            />
            
          </div>
        </CSSTransition>
          </div>
        </div>
        )}

      <button style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#fff', color: '#4CAF50', border: '2px solid #4CAF50', cursor: 'pointer' }} 
      onClick={this.toggleTelDialog}>Agregar teléfono</button>
      {showTelDialog && (
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
            <NuevaSucursalTelefonoFormulario 
              onClose={this.toggleTelDialog}
              onNewTelSucursal={this.handleTelefono}
            />
            
          </div>
        </CSSTransition>
          </div>
        </div>
        )}

      <button style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#fff', color: '#c92d15', border: '2px solid #c92d15', cursor: 'pointer' }} 
      onClick={this.toggleTeltD}>Eliminar Telefono</button>
      {showTeltwoDialog && (
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
            <EliminarSucursalTelefonoFormulario 
              onClose={this.toggleTeltD}
              onDeleteTelSucursal={this.handleTelefono}
            />
            
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