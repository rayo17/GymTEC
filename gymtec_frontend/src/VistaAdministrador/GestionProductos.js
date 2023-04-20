import React, { useState, useEffect } from 'react';
import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } from '../api';
import './GestionProductos.css';

function GestionProductos() {
  const [productos, setProductos] = useState([]);
  const [formValues, setFormValues] = useState({ codigo_barras: '', nombre: '', descripcion: '', costo: '' });
  const [formMode, setFormMode] = useState('agregar');
  const [currentProductId, setCurrentProductId] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Función para obtener los productos desde la API
  const getProductos = async () => {
    const data = await obtenerProductos();
    setProductos(data);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formMode === 'agregar') {
      await agregarProducto(formValues);
    } else {
      await actualizarProducto(currentProductId, formValues);
    }
    getProductos();
    setFormValues({ codigo_barras: '', nombre: '', descripcion: '', costo: '' });
    setFormMode('agregar');
    setShowPopup(false);
  };

  // Función para manejar el cambio de los inputs del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Función para manejar el clic en el botón de editar de una fila de la tabla
  const handleEditClick = (producto) => {
    setFormValues(producto);
    setFormMode('editar');
    setCurrentProductId(producto.codigo_barras);
    setShowPopup(true);
  };

  // Función para manejar el clic en el botón de eliminar de una fila de la tabla
  const handleDeleteClick = async (codigo_barras) => {
    await eliminarProducto(codigo_barras);
    getProductos();
  };

  // Se ejecuta al cargar el componente
  useEffect(() => {
    getProductos();

  }, []);

  const handleCerrarClick = () => {
    setShowPopup(false);
  }
  return (
    <div className="gestion-productos-container">
      <h1>Gestión de productos</h1>
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Código de barras</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codigo_barras}>
              <td>{producto.codigo_barras}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>${producto.costo}</td>
              <td>
                <button className="btn-accion btn-editar" onClick={() => handleEditClick(producto)}>Editar</button>
                <button className="btn-accion btn-eliminar" onClick={() => handleDeleteClick(producto.codigo_barras)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-agregar" onClick={() => setShowPopup(true)}>Agregar</button>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Agregar producto</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="codigo_barras">Código de barras:</label>
                <input type="text" id="codigo_barras" name="codigo_barras" value={formValues.codigo_barras} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={formValues.nombre} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" value={formValues.descripcion} onChange={handleInputChange}></textarea>
              </div>
              <div>
                <label htmlFor="costo">Costo:</label>
                <input type="number" id="costo" name="costo" value={formValues.costo} onChange={handleInputChange} />
              </div>
              <button type="submit">{formMode === 'agregar' ? 'Agregar' : 'Actualizar'}</button>
              {formMode === 'editar' && <button type="button" className="btn-cancelar" onClick={() => setShowPopup(false)}>Cancelar</button>}
            </form>
          </div>
        </div>
      )}
      <div className="popup-container" style={{ display: showPopup ? 'flex' : 'none' }}>
        <div className="popup">
          <h2>Agregar producto</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="codigo_barras">Código de barras:</label>
              <input type="text" id="codigo_barras" name="codigo_barras" value={formValues.codigo_barras} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={formValues.nombre} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="descripcion">Descripción:</label>
              <textarea id="descripcion" name="descripcion" value={formValues.descripcion} onChange={handleInputChange}></textarea>
            </div>
            <div>
              <label htmlFor="costo">Costo:</label>
              <input type="number" id="costo" name="costo" value={formValues.costo} onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn-submit">{formMode === 'agregar' ? 'Agregar' : 'Actualizar'}</button>
            <button type="button" className="btn-cancelar" onClick={handleCerrarClick}>Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  );

}
export default GestionProductos;
