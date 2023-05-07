import React, { Component } from 'react';
import { Navbar } from "../Templates/Navbar"
import axios from 'axios';

import { CSSTransition } from 'react-transition-group';

import NuevoPuestoFormulario from '../Forms/NuevoPuestoFormulario';
import EditarPuestoFormulario from '../Forms/EditarPuestoFormulario';


class GestionPuestos extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      puestos: [], // lista de sucursales obtenidos desde el API
      
      showForm: false, // variable para mostrar/ocultar el formulario para agregar sucursales
      showtwoForm: false, // variable para mostrar/ocultar el formulario para añadir información adicional a un paciente existente
      showthreeForm: false,

      showDialog: false, // variable para mostrar/ocultar el diálogo para agregar nuevos sucursales
      showtwoDialog: false, // variable para mostrar/ocultar el diálogo para añadir información adicional a un paciente existente
      showthreeDialog: false,

      error: null, // variable para guardar posibles errores del API
    };
  }

  /* FORMS */

  /* PARA AGREGAR TRATAMIENTOS */
  // Función para alternar la visibilidad del formulario para agregar tratamiento
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

  getPuesto = (x) => {
    this.setState({puesto: x})
    this.toggletD()
  }

  deletePuesto = (puest) => {
    axios
      .delete("http://localhost:5236/api/Puesto/"+puest, {
        
      })
      .then((response) => {
        // Actualizar el estado de los pacientes con los nuevos datos ingresados
        this.handlePuesto();
      })
      .catch((error) => {
        alert("No ha sido posible eliminar este puesto")
      });

    console.log("Puesto eliminado");
  };

  /* PARA COMPONENTES */
  // función que se ejecuta cuando se carga el componente
  componentDidMount() {
    this.handlePuesto(); // se obtiene la lista de sucursales
  }

  // función para obtener la lista de sucursales, y teléfonos desde el API
  handlePuesto = () => {
    axios.get('http://localhost:5236/api/Puesto') // obtiene la lista de sucursales desde el API
      .then(response => {
        this.setState({ puestos: response.data }); // guarda la lista de sucursales en el estado
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
  const { puestos, error, showDialog, showtwoDialog } = this.state;

  return (
    <div style={{ backgroundColor: '#fff', textAlign: 'center' }}>
        <Navbar/>
  <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Puestos de empleados</h1>
      {error && <div>Error: {error}</div>}
      <table style={{ borderCollapse: 'collapse', width: '80%', margin: '0 auto'}} className="table border shadow">
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Identificador</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Puesto</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Editar</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {puestos.map(puesto => (
            <tr key={puesto.identificador}>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{puesto.identificador}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{puesto.descripcion}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}> 
                <button style={{ borderRadius: '5px', backgroundColor: '#fff', color: '#ccdb19', border: '2px solid #ccdb19', cursor: 'pointer' }} 
                onClick={() => this.getPuesto(puesto)}>Editar</button> 
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}> 
                <button style={{ borderRadius: '5px', backgroundColor: '#fff', color: '#c92d15', border: '2px solid #c92d15', cursor: 'pointer' }} 
                onClick={() => this.deletePuesto(puesto.identificador)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#fff', color: '#4CAF50', border: '2px solid #4CAF50', cursor: 'pointer' }} 
      onClick={this.toggleDialog}>Crear puesto</button>
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
            <NuevoPuestoFormulario 
              onClose={this.toggleDialog}
              onNewPuesto={this.handlePuesto}
            />
            
          </div>
        </CSSTransition>
          </div>
        </div>
        )}

      
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
            <EditarPuestoFormulario
              editName={this.state}
              onClose={this.toggletD}
              onEditPuesto={this.handlePuesto}
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

export default GestionPuestos;