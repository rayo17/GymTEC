import React from 'react';
import { obtenertipoEquipos, agregarTEquipo, actualizarTEquipo, eliminarTEquipoid } from '../api';
import './GestionProductos.css';
import { Navbar } from "../Templates/Navbar"


class GestionTiposEquipo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equipos: [],
      formValues: { identificador:'', descripcion:''},
      formMode: 'agregar',
      currentProductId: '',
      showPopup: false
    };
    this.handleOuterClick = this.handleOuterClick.bind(this);
  }

  // Función para obtener los formValues: { identificador:'', descripcion:''} desde la API
  getequipos = async () => {
    const data = await obtenertipoEquipos();
    this.setState({ equipos: data });
  };

  // Función para manejar el envío del formulario
  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.formMode === 'agregar') {
      await agregarTEquipo(this.state.formValues);
    } else {
      await actualizarTEquipo(this.state.currentProductId, this.state.formValues);
    }
    this.getequipos();
    this.setState({ formValues: { identificador:'', descripcion:''}, formMode: 'agregar', showPopup: false });
  };

  // Función para manejar el cambio de los inputs del formulario
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ formValues: { ...this.state.formValues, [name]: value } });
  };

  // Función para manejar el clic en el botón de editar de una fila de la tabla
  handleEditClick = (producto) => {
    this.setState({ formValues: producto, formMode: 'editar', currentProductId: producto.identificador, showPopup: true });
  };

  // Función para manejar el clic en el botón de eliminar de una fila de la tabla
  handleDeleteClick = async (identificador) => {
    await eliminarTEquipoid(identificador);
    this.getequipos();
  };
  handleOuterClick(event) {
    const container = document.querySelector('.popup');
    if (container && !container.contains(event.target)) {
      this.setState({ showPopup: false });
      this.setState({ formValues: { identificador:'', descripcion:''}, formMode: 'agregar', showPopup: false });
    }
  };
  // Se ejecuta al cargar el componente
  componentDidMount() {
    this.getequipos();
    document.addEventListener('mousedown', this.handleOuterClick);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOuterClick);
  };

  handleCerrarClick = () => {
    this.setState({ formValues: { identificador:'', descripcion:''}, formMode: 'agregar', showPopup: false });
    this.setState({ showPopup: false });
    document.removeEventListener('mousedown', this.handleOuterClick);
  }
render() {
  const { equipos, formValues, formMode, showPopup } = this.state;
  return (
    <div className="gestion-productos-container">
      <Navbar/>
      <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Gestión de tipos de equipo</h1>
      <table className="tabla-productos">
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>identificador</th>
            <th style={{ padding: '10px' }}>Descripción</th>
            <th style={{ padding: '10px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((producto) => (
            <tr key={producto.identificador}>
              <td style={{ padding: '10px' }}>{producto.identificador}</td>
              <td style={{ padding: '10px' }}>{producto.descripcion}</td>
              <td>
                <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(producto)}>Editar</button>
                <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(producto.identificador)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-agregar" onClick={() => this.setState({ showPopup: true })}>Agregar</button>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>{formMode === 'agregar' ? 'Agregar Tipo de Equipo' : 'Actualizar Tipo de Equipo'}</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="identificador">Identificador:</label>
                <input type="text" id="identificador" name="identificador" value={formValues.identificador} disabled={formMode === 'editar'} onChange={this.handleInputChange} />
              </div>
              <div>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" value={formValues.descripcion} onChange={this.handleInputChange}></textarea>
              </div>
              <button type="submit" className="btn-submit">{formMode === 'agregar' ? 'Agregar' : 'Actualizar'}</button> 
              {formMode === 'editar' && (<button type="button" className="btn-cancelar" onClick={() => this.setState({ showPopup: false })}>Cancelar</button>)}
            </form> 
          </div> 
        </div> 
      )}
    </div> 
  );
}
}
export default GestionTiposEquipo;
