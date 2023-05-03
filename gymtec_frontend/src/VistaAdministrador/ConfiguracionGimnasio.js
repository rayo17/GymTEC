import React from 'react';
import {
    obtenerMaquinas, obtenerSucursales, asisgnarMaquina, asignarProducto, obtenerSucursalClase, asignarClase, eliminarSucursalClase, SucursalTodo,
    obtenerSucursalProducto, obtenerSucursalTratamiento, asignarTratamiento, eliminarAsoMaquina, eliminarSucursalProducto, eliminarSucursalTratamiento
} from '../api';
import './GestionProductos.css';
import { Navbar } from "../Templates/Navbar"


class ConfiguracionGimnasio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sucursalTodo: [],
            sucursales: [],
            maquinas: [],
            tratamientoSucursal: [],
            productoSucursal: [],
            clases: [],
            formValues: { sucursal: '', maquina: '', clase: '', producto: '', tratamiento: '' },
            formMode: 'agregar',
            currentProductId: '',
            currentSucursal: '1',
            currentSucu: [],
            showPopup: ''
        };
        this.handleOuterClick = this.handleOuterClick.bind(this);
    }

    // Función para obtener los gimnasios desde la API
    getProductos = async () => {
        const tds = await SucursalTodo();
        const clas = await obtenerSucursalClase();
        const maq = await obtenerMaquinas();
        const suc = await obtenerSucursales();
        const ts = await obtenerSucursalTratamiento();
        const ps = await obtenerSucursalProducto();
        this.setState({ maquinas: maq });
        this.setState({ sucursales: suc });
        this.setState({ tratamientoSucursal: ts });
        this.setState({ productoSucursal: ps });
        this.setState({ clases: clas });
        this.setState({ sucursalTodo: tds });
    };

    // Función para manejar el envío del formulario
    handleSubmit = async (event, tipo, objeto) => {
        console.log(objeto)
        if (tipo === 1) {
            console.log(this.state.currentSucursal);
            await asisgnarMaquina(this.state.currentProductId, this.state.currentSucursal);

            this.getProductos();
        }
        if (tipo === 2) {
            await asignarProducto(this.state.currentProductId, this.state.currentSucursal);

            this.getProductos();
        }
        if (tipo === 3) {
            await asignarTratamiento(this.state.currentProductId, this.state.currentSucursal);

            this.getProductos();
        }
        if (tipo === 4) {
            await asignarClase(this.state.currentProductId, this.state.currentSucursal);

            this.getProductos();
        }
        if (tipo === 5) {
            objeto.productos.forEach(async (producto) => {
                await asignarProducto(producto, this.state.currentSucursal);
            });
            objeto.tratamientos.forEach(async (tratamiento) => {
                await asignarTratamiento(tratamiento, this.state.currentSucursal);
            });
            objeto.clases.forEach(async (clase) => {
                await asignarClase(clase, this.state.currentSucursal);
            });

            this.getProductos();
        }
        event.preventDefault();

        this.getProductos();
        this.setState({ formValues: { sucursal: '', maquina: '', clase: '', producto: '', tratamiento: '' }, formMode: 'agregar', showPopup: false });
    };

    // Función para manejar el cambio de los inputs del formulario
    handleInputChange = (event) => {
        const { value } = event.target;
        this.setState({ currentSucursal: value });
    };

    // Función para manejar el clic en el botón de editar de una fila de la tabla
    handleEditClick = (objeto, tipo) => {
        if (tipo === 1) {
            this.setState({ formValues: objeto, formMode: 'asignar', currentProductId: objeto.numero_serie, showPopup: 1 });
        }
        if (tipo === 2) {
            this.setState({ formValues: objeto, formMode: 'asignar', currentProductId: objeto.codigo_barras, showPopup: 2 });

        }
        if (tipo === 3) {
            this.setState({ formValues: objeto, formMode: 'asignar', currentProductId: objeto.identificador, showPopup: 3 });

        }
        if (tipo === 4) {
            this.setState({ formValues: objeto, formMode: 'asignar', currentProductId: objeto.identificador, showPopup: 4 });
        }
        if (tipo === 5) {
            this.setState({ formValues: objeto, formMode: 'asignar', currentProductId: objeto.id, showPopup: 5, currentSucu: objeto });
        }
        else {
            this.getProductos();
        }
    };
    handleDeleteClick = async (objeto, tipo) => {
        if (tipo === 1) {
            await eliminarAsoMaquina(objeto);
            this.getProductos();
        }
        if (tipo === 2) {
            objeto.sucursales.forEach(async (sucursal) => {
                await eliminarSucursalProducto(sucursal, objeto.codigo_barras);
            });
            this.getProductos();

        }
        if (tipo === 3) {
            objeto.sucursales.forEach(async (sucursal) => {
                await eliminarSucursalTratamiento(sucursal, objeto.identificador);
            });
            this.getProductos();

        }
        if (tipo === 4) {
            objeto.sucursales.forEach(async (sucursal) => {
                await eliminarSucursalClase(sucursal, objeto.identificador);
            });
            this.getProductos();
        }
        this.getProductos();
    };
    handleOuterClick(event) {
        this.getProductos();
        const container = document.querySelector('.popup');
        if (container && !container.contains(event.target)) {
            this.setState({ showPopup: false });
            this.setState({ formValues: { sucursal: '', maquina: '', clase: '', producto: '', tratamiento: '' }, formMode: 'agregar', showPopup: false });
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
        this.setState({ formValues: { sucursal: '', maquina: '', clase: '', producto: '', tratamiento: '' }, formMode: 'agregar', showPopup: false });
        this.setState({ showPopup: false });
        document.removeEventListener('mousedown', this.handleOuterClick);
    }
    render() {
        const { maquinas, sucursales, showPopup, formMode, formValues, tratamientoSucursal, productoSucursal, clases, sucursalTodo } = this.state;
        return (
            <div className="gestion-productos-container">
                <Navbar />
                <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Configuracion de Gimnasio</h1>
                <h2 style={{ margin: '0px', fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '0px', marginRight: '1170px' }}>Asociacion con Sucursales</h2>

                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th style={{ padding: '10px' }}>Sucursal</th>
                            <th style={{ padding: '10px' }}>Maquina</th>
                            <th style={{ padding: '10px' }}>Producto</th>
                            <th style={{ padding: '10px' }}>Tratamiento</th>
                            <th style={{ padding: '10px' }}>Clase</th>
                            <th style={{ padding: '10px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clases.map((clase) => (
                            <tr key={clase.identificador}>
                                <td style={{ padding: '10px' }}>{clase.sucursales.length > 0 ? clase.sucursales.join(", ") : "No asociado"} </td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}>#{clase.identificador}</td>


                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(clase, 4)}>Asignar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(clase, 4)}>Eliminar asignacion</button>
                                </td>
                            </tr>
                        ))}
                        {productoSucursal.map((producto) => (
                            <tr key={producto.codigo_barras}>
                                <td style={{ padding: '10px' }}>{producto.sucursales.length > 0 ? producto.sucursales.join(", ") : "No asociado"} </td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}>{producto.nombre}</td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>


                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(producto, 2)}>Asignar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(producto, 2)}>Eliminar asignacion</button>
                                </td>
                            </tr>
                        ))}
                        {maquinas.map((maquina) => (
                            <tr key={maquina.numero_serie}>
                                <td style={{ padding: '10px' }}>{maquina.sucursal ? maquina.sucursal : "No asociado"}</td>
                                <td style={{ padding: '10px' }}>{maquina.tipo}</td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>

                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(maquina, 1)}>Asignar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(maquina.numero_serie, 1)}>Eliminar asignacion</button>

                                </td>
                            </tr>
                        ))}
                        {tratamientoSucursal.map((tratamiento) => (
                            <tr key={tratamiento.identificador}>
                                <td style={{ padding: '10px' }}>{tratamiento.sucursales.length > 0 ? tratamiento.sucursales.join(", ") : "No asociado"}</td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}>{tratamiento.nombre}</td>
                                <td style={{ padding: '10px' }}></td>

                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(tratamiento, 3)}>Asignar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(tratamiento, 3)}>Eliminar asignacion</button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                    {showPopup === 1 && (
                        <div className="popup-container">
                            <div className="popup">
                                <h2>{'Asociar Maquina'}</h2>
                                <form onSubmit={(event) => this.handleSubmit(event, 1)}>
                                    <div>
                                        <label htmlFor="numero_serie">Numero de serie:</label>
                                        <input type="text" id="numero_serie" name="numero_serie" value={formValues.numero_serie} disabled onChange={this.handleInputChange} placeholder="numero_serie" />
                                    </div>
                                    <label htmlFor="selectedGym">Sucursal:</label>
                                    <select id="selectedSucursal" value={this.currentSucursal} onChange={this.handleInputChange} className="select-box">
                                        <option value="">Selecciona una sucursal</option>
                                        {sucursales.map(gym => (
                                            <option className="minimalist-option" key={gym.nombre} value={gym.nombre}>
                                                {gym.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    <button type="submit" className="btn-submit">{formMode === 'agregar' ? 'Agregar' : 'Actualizar'}</button>
                                    {formMode === 'editar' && (<button type="button" className="btn-cancelar" onClick={() => this.setState({ showPopup: false })}>Cancelar</button>)}
                                </form>
                            </div>
                        </div>
                    )}
                    {showPopup === 2 && (
                        <div className="popup-container">
                            <div className="popup">
                                <h2>{'Asociar Producto'}</h2>
                                <form onSubmit={(event) => this.handleSubmit(event, 2)}>
                                    <div>
                                        <label htmlFor="numero_serie">Codigo de barras:</label>
                                        <input type="text" id="numero_serie" name="numero_serie" value={formValues.codigo_barras} disabled onChange={this.handleInputChange} placeholder="numero_serie" />
                                    </div>
                                    <label htmlFor="selectedGym">Sucursal:</label>
                                    <select id="selectedSucursal" value={this.currentSucursal} onChange={this.handleInputChange} className="select-box">
                                        <option value="">Selecciona una sucursal</option>
                                        {sucursales.map(gym => (
                                            <option className="minimalist-option" key={gym.nombre} value={gym.nombre}>
                                                {gym.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    <button type="submit" className="btn-submit">{formMode === 'agregar' ? 'Agregar' : 'Actualizar'}</button>
                                    {formMode === 'editar' && (<button type="button" className="btn-cancelar" onClick={() => this.setState({ showPopup: false })}>Cancelar</button>)}
                                </form>
                            </div>
                        </div>
                    )}
                    {showPopup === 3 && (
                        <div className="popup-container">
                            <div className="popup">
                                <h2>{'Asociar Tratamiento'}</h2>
                                <form onSubmit={(event) => this.handleSubmit(event, 3)}>
                                    <div>
                                        <label htmlFor="numero_serie">Identificador:</label>
                                        <input type="text" id="numero_serie" name="numero_serie" value={formValues.identificador} disabled onChange={this.handleInputChange} placeholder="numero_serie" />
                                    </div>
                                    <label htmlFor="selectedGym">Sucursal:</label>
                                    <select id="selectedSucursal" value={this.currentSucursal} onChange={this.handleInputChange} className="select-box">
                                        <option value="">Selecciona una sucursal</option>
                                        {sucursales.map(gym => (
                                            <option className="minimalist-option" key={gym.nombre} value={gym.nombre}>
                                                {gym.nombre}
                                            </option>

                                        ))}
                                    </select>
                                    <button type="submit" className="btn-submit">{formMode === 'agregar' ? 'Agregar' : 'Actualizar'}</button>
                                    {formMode === 'editar' && (<button type="button" className="btn-cancelar" onClick={() => this.setState({ showPopup: false })}>Cancelar</button>)}
                                </form>
                            </div>
                        </div>
                    )}
                    {showPopup === 4 && (
                        <div className="popup-container">
                            <div className="popup">
                                <h2>{'Asociar Clase'}</h2>
                                <form onSubmit={(event) => this.handleSubmit(event, 4)}>
                                    <div>
                                        <label htmlFor="numero_serie">Identificador:</label>
                                        <input type="text" id="numero_serie" name="numero_serie" value={formValues.identificador} disabled onChange={this.handleInputChange} placeholder="numero_serie" />
                                    </div>
                                    <label htmlFor="selectedGym">Sucursal:</label>
                                    <select id="selectedSucursal" value={this.currentSucursal} onChange={this.handleInputChange} className="select-box">
                                        <option value="">Selecciona una sucursal</option>
                                        {sucursales.map(gym => (
                                            <option className="minimalist-option" key={gym.nombre} value={gym.nombre}>
                                                {gym.nombre}
                                            </option>

                                        ))}
                                    </select>
                                    <button type="submit" className="btn-submit">{formMode === 'agregar' ? 'Agregar' : 'Actualizar'}</button>
                                    {formMode === 'editar' && (<button type="button" className="btn-cancelar" onClick={() => this.setState({ showPopup: false })}>Cancelar</button>)}
                                </form>
                            </div>
                        </div>
                    )}
                    {showPopup === 5 && (
                        <div className="popup-container">
                            <div className="popup">
                                <h2>{'Copiar Sucursal'}</h2>
                                <form onSubmit={(event) => this.handleSubmit(event, 5, formValues)}>
                                    <div>
                                        <label htmlFor="numero_serie">Sucursal:</label>
                                        <input type="text" id="numero_serie" name="numero_serie" value={formValues.id} disabled onChange={this.handleInputChange} placeholder="numero_serie" />
                                    </div>
                                    <label htmlFor="selectedGym">Sucursal a copiar:</label>
                                    <select id="selectedSucursal" value={this.currentSucursal} onChange={this.handleInputChange} className="select-box">
                                        <option value="">Selecciona una sucursal</option>
                                        {sucursales.map(gym => (
                                            <option className="minimalist-option" key={gym.nombre} value={gym.nombre}>
                                                {gym.nombre}
                                            </option>

                                        ))}
                                    </select>
                                    <button type="submit" className="btn-submit">{formMode === 'agregar' ? 'Agregar' : 'Copiar'}</button>
                                    {formMode === 'editar' && (<button type="button" className="btn-cancelar" onClick={() => this.setState({ showPopup: false })}>Cancelar</button>)}
                                </form>
                            </div>
                        </div>
                    )}
                </table>
                <h2 style={{ margin: '20px', fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '0px', marginRight: '1400px' }}>Sucursales</h2>
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th style={{ padding: '10px' }}>Sucursal</th>
                            <th style={{ padding: '10px' }}>Productos</th>
                            <th style={{ padding: '10px' }}>Tratamientos</th>
                            <th style={{ padding: '10px' }}>Clases</th>
                            <th style={{ padding: '10px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sucursalTodo.map((sucursal) => (
                            <tr key={sucursal.codigo_barras}>
                                <td style={{ padding: '10px' }}>{sucursal.id} </td>
                                <td style={{ padding: '10px' }}>{sucursal.productos.length > 0 ? sucursal.productos.join(", ") : "No asociado"}</td>
                                <td style={{ padding: '10px' }}>{sucursal.tratamientos.length > 0 ? sucursal.tratamientos.join(", ") : "No asociado"}</td>
                                <td style={{ padding: '10px' }}>{sucursal.clases.length > 0 ? sucursal.clases.join(", ") : "No asociado"}</td>

                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(sucursal, 5)}>Copiar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        );
    }
}
export default ConfiguracionGimnasio;
