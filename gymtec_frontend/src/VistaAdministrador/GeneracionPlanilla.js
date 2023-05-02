/* eslint-disable */
import React, { Component } from 'react';
import { Navbar } from "../Templates/Navbar"
import axios from 'axios';


class GeneracionPlanilla extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      empleados: [],
      planillas: [], // lista de sucursales obtenidos desde el API

      error: null, // variable para guardar posibles errores del API
    };
  }

  
  /* PARA COMPONENTES */
  // función que se ejecuta cuando se carga el componente
  componentDidMount() {
    this.handleEmpleados(); // se obtiene la lista de sucursales
  }

  // función para obtener la lista de sucursales, y teléfonos desde el API
  handleEmpleados = () => {
    axios.get('http://localhost:5236/api/empleado') // obtiene la lista de sucursales desde el API
      .then(response => {
        this.setState({ empleados: response.data }); // guarda la lista de sucursales en el estado
      })
      .catch(error => {
        this.setState({ error: error.message }); // guarda el error en el estado en caso de que haya alguno
      });

      axios.get('http://localhost:5236/api/planillas') // obtiene la lista de teléfonos para cada paciente desde el API
      .then(response => {
        const planillas = {};
        response.data.forEach(planilla => {
          if (!planillas[planilla.identificador]) { // si no existe una entrada para el paciente actual en la lista de teléfonos, se crea una
            planillas[planilla.identificador] = [];
          }
          planillas[planilla.identificador].push(planilla.tipo); // se agrega el teléfono actual a la lista de teléfonos del paciente
        });
        this.setState({ planillas }); // se guarda la lista de teléfonos en el estado
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
  const { empleados, error } = this.state;

  return (
    <div style={{ backgroundColor: '#fff', textAlign: 'center' }}>
        <Navbar/>
  <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Planillas de empleados</h1>
      {error && <div>Error: {error}</div>}
      <table style={{ borderCollapse: 'collapse', width: '80%', margin: '0 auto'}} className="table border shadow">
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Sucursal</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Identificador de empleado</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Nombre completo</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Tipo de planilla</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Salario</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Clases impartidas/Horas trabajadas</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>Monto a pagar</th>
            
          </tr>
        </thead>
        <tbody>
          {empleados.map(empleado => (
            <tr key={empleado.cedula}>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{empleado.sucursal}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{empleado.cedula}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{empleado.primer_nombre} {empleado.segundo_nombre} {empleado.primer_apellido}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{this.state.planillas[empleado.cedula]}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56' }}>{this.state.planillas[empleado.cedula] == "Mensual" ? empleado.salario : this.state.planillas[empleado.cedula] == "Por hora" ? empleado.salario + " c/h" : empleado.salario + " c/c"}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56', textAlign: 'center'}}>{empleado.clases_impartidas}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #1c3a56', textAlign: 'center'}}>{this.state.planillas[empleado.cedula] == "Mensual" ? empleado.salario : empleado.salario * empleado.clases_impartidas}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    );
  }
}

export default GeneracionPlanilla;