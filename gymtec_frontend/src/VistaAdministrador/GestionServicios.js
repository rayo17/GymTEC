import React from 'react';
import { obtenerServicios, agregarServicio, actualizarServicio, eliminarServicio } from '../api';
import './GestionProductos.css';
import { Navbar } from "../Templates/Navbar"


class GestionServicios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servicios: [],
      formValues: {  descripcion:'', identificador: null},
      formMode: 'agregar',
      currentProductId: '',
      showPopup: false
    };
    this.handleOuterClick = this.handleOuterClick.bind(this);
  }

  // Función para obtener los formValues: {  descripcion:'', identificador: null} desde la API
  getServicios = async () => {
    const data = await obtenerServicios();
    this.setState({ servicios: data });
  };

  // Función para manejar el envío del formulario
  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.formMode === 'agregar') {
      await agregarServicio(this.state.formValues);
    } else {
      console.log(this.state)
      await actualizarServicio(this.state.currentProductId, this.state.formValues);
    }
    this.getServicios();
    this.setState({ formValues: {  descripcion:'', identificador: null}, formMode: 'agregar', showPopup: false });
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
    await eliminarServicio(identificador);
    this.getServicios();
  };
  handleOuterClick(event) {
    const container = document.querySelector('.popup');
    if (container && !container.contains(event.target)) {
      this.setState({ showPopup: false });
      this.setState({ formValues: {  descripcion:'', identificador: null}, formMode: 'agregar', showPopup: false });
    }
  };
  // Se ejecuta al cargar el componente
  componentDidMount() {
    this.getServicios();
    document.addEventListener('mousedown', this.handleOuterClick);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOuterClick);
  };

  handleCerrarClick = () => {
    this.setState({ formValues: {  descripcion:'', identificador: null}, formMode: 'agregar', showPopup: false });
    this.setState({ showPopup: false });
    document.removeEventListener('mousedown', this.handleOuterClick);
  }
render() {
  const { servicios, formValues, formMode, showPopup } = this.state;
  return (
    <div className="gestion-productos-container">
      <Navbar/>
      <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Gestión de Servicios</h1>
      <table className="tabla-productos">
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>Identificador</th>
            <th style={{ padding: '10px' }}>Descripción</th>
            <th style={{ padding: '10px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((producto) => (
            <tr key={producto.identificador}>
              <td style={{ padding: '10px' }}>{producto.identificador}</td>
              <td style={{ padding: '10px' }}>{producto.descripcion}</td>
              <td>
                <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(producto.identificador)}>Eliminar</button>
                <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(producto)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-agregar" onClick={() => this.setState({ showPopup: true })}>Agregar</button>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>{formMode === 'agregar' ? 'Agregar Servicio' : 'Actualizar Servicio'}</h2>
            <form onSubmit={this.handleSubmit}>
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
export default GestionServicios;