import React, { Component } from 'react'
import { NavbarCliente } from "../Templates/NavbarCliente"
import axios from 'axios'


class ClasesCliente extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        idCliente: sessionStorage.getItem("miId"),
        clases: [], // lista de sucursales obtenidos desde el API
        
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
  
    /* PARA AGREGAR CLASES */
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
    
    /* PARA COMPONENTES */
    // función que se ejecuta cuando se carga el componente
    componentDidMount() {
        console.log(this.state.idCliente)
      this.handleClases(); // se obtiene la lista de sucursales
    }
  
    // función para obtener la lista de sucursales, y teléfonos desde el API
    handleClases = () => {
      axios.get('http://localhost:5236/api/Clase/clasesClientes/'+this.state.idCliente) // obtiene la lista de sucursales desde el API
        .then(response => {
          this.setState({ clases: response.data }); // guarda la lista de sucursales en el estado
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
    const { clases, error } = this.state;
  
    return (
      <div style={{ backgroundColor: '#fff', textAlign: 'center' }}>
          <NavbarCliente/>
    <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Clase</h1>
        {error && <div>Error: {error}</div>}
        <table style={{ borderCollapse: 'collapse', width: '80%', margin: '0 auto'}} className="table border shadow">
          <thead>
            <tr>
              <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Clase</th>
            </tr>
          </thead>
          <tbody>
            {clases.map(clase => (
              <tr key={clase.clase}>
                <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{clase.clase.length > 0 ? clase.clase.join(", ") : "" }</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        
        
  
        </div>
      );
    }
  }
  
  export default ClasesCliente;
