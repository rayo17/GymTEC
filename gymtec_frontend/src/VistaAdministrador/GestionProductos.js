import React from 'react';
import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } from '../api';
import './GestionProductos.css';

class GestionProductos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      formValues: { codigo_barras: '', nombre: '', descripcion: '', costo: '' },
      formMode: 'agregar',
      currentProductId: '',
      showPopup: false
    };
    this.handleOuterClick = this.handleOuterClick.bind(this);
  }

  // Función para obtener los productos desde la API
  getProductos = async () => {
    const data = await obtenerProductos();
    this.setState({ productos: data });
  };

  // Función para manejar el envío del formulario
  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.formMode === 'agregar') {
      await agregarProducto(this.state.formValues);
    } else {
      await actualizarProducto(this.state.currentProductId, this.state.formValues);
    }
    this.getProductos();
    this.setState({ formValues: { codigo_barras: '', nombre: '', descripcion: '', costo: '' }, formMode: 'agregar', showPopup: false });
  };

  // Función para manejar el cambio de los inputs del formulario
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ formValues: { ...this.state.formValues, [name]: value } });
  };

  // Función para manejar el clic en el botón de editar de una fila de la tabla
  handleEditClick = (producto) => {
    this.setState({ formValues: producto, formMode: 'editar', currentProductId: producto.codigo_barras, showPopup: true });
  };

  // Función para manejar el clic en el botón de eliminar de una fila de la tabla
  handleDeleteClick = async (codigo_barras) => {
    await eliminarProducto(codigo_barras);
    this.getProductos();
  };
  handleOuterClick(event) {
    const container = document.querySelector('.popup');
    if (container && !container.contains(event.target)) {
      this.setState({ showPopup: false });
      this.setState({ formValues: { codigo_barras: '', nombre: '', descripcion: '', costo: '' }, formMode: 'agregar', showPopup: false });
    }
  };
  // Se ejecuta al cargar el componente
  componentDidMount() {
    this.getProductos();
    document.addEventListener('mousedown', this.handleOuterClick);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOuterClick);
  };

  handleCerrarClick = () => {
    this.setState({ formValues: { codigo_barras: '', nombre: '', descripcion: '', costo: '' }, formMode: 'agregar', showPopup: false });
    this.setState({ showPopup: false });
    document.removeEventListener('mousedown', this.handleOuterClick);
  }
render() {
  const { productos, formValues, formMode, showPopup } = this.state;
  return (
    <div className="gestion-productos-container">
      <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Gestión de productos</h1>
      <table className="tabla-productos">
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>Código de barras</th>
            <th style={{ padding: '10px' }}>Nombre</th>
            <th style={{ padding: '10px' }}>Descripción</th>
            <th style={{ padding: '10px' }}>Precio</th>
            <th style={{ padding: '10px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codigo_barras}>
              <td style={{ padding: '10px' }}>{producto.codigo_barras}</td>
              <td style={{ padding: '10px' }}>{producto.nombre}</td>
              <td style={{ padding: '10px' }}>{producto.descripcion}</td>
              <td style={{ padding: '10px' }}>${producto.costo}</td>
              <td>
                <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(producto)}>Editar</button>
                <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(producto.codigo_barras)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-agregar" onClick={() => this.setState({ showPopup: true })}>Agregar</button>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>{formMode === 'agregar' ? 'Agregar Producto' : 'Actualizar Producto'}</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="codigo_barras">Código de barras:</label>
                <input type="text" id="codigo_barras" name="codigo_barras" value={formValues.codigo_barras} disabled={formMode === 'editar'} onChange={this.handleInputChange} />
              </div>
              <div>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={formValues.nombre} onChange={this.handleInputChange} />
              </div>
              <div>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" value={formValues.descripcion} onChange={this.handleInputChange}></textarea>
              </div>
              <div>
                <label htmlFor="costo">Costo:</label> 
                <input type="number" id="costo" name="costo" value={formValues.costo} onChange={this.handleInputChange} />
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
export default GestionProductos;
