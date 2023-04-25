import React from 'react';
import { obtenerMaquinas, agregarMaquina, actualizarMaquina, eliminarMaquinaid } from '../api';
import './GestionProductos.css';
import { Navbar } from "../Templates/Navbar"

class GestionInventario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maquinas: [],
            formValues: { tipo:'', marca: '', numero_serie:'', costo:'' },
            formMode: 'agregar',
            currentMaquinaId: '',
            showPopup: false
        };
        this.handleOuterClick = this.handleOuterClick.bind(this);
    }

    // Función para obtener los maquinas desde la API
    getProductos = async () => {
        const data = await obtenerMaquinas();
        this.setState({ maquinas: data });
    };

    // Función para manejar el envío del formulario
    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.formMode === 'agregar') {
            await agregarMaquina(this.state.formValues);
        } else {
            await actualizarMaquina(this.state.currentMaquinaId, this.state.formValues);
        }
        this.getProductos();
        this.setState({ formValues: { tipo:'', marca: '', numero_serie:'', costo:'' }, formMode: 'agregar', showPopup: false });
    };

    // Función para manejar el cambio de los inputs del formulario
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ formValues: { ...this.state.formValues, [name]: value } });
    };

    // Función para manejar el clic en el botón de editar de una fila de la tabla
    handleEditClick = (maquina) => {
        this.setState({ formValues: maquina, formMode: 'editar', currentMaquinaId: maquina.numero_serie, showPopup: true });
    };

    // Función para manejar el clic en el botón de eliminar de una fila de la tabla
    handleDeleteClick = async (numero_serie) => {
        await eliminarMaquinaid(numero_serie);
        this.getProductos();
    };
    handleOuterClick(event) {
        const container = document.querySelector('.popup');
        if (container && !container.contains(event.target)) {
            this.setState({ showPopup: false });
            this.setState({ formValues: { tipo:'', marca: '', numero_serie:'', costo:'' }, formMode: 'agregar', showPopup: false });
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
        this.setState({ formValues: { tipo:'', marca: '', numero_serie:'', costo:'' }, formMode: 'agregar', showPopup: false });
        this.setState({ showPopup: false });
        document.removeEventListener('mousedown', this.handleOuterClick);
    }
    render() {
        const { maquinas, formValues, formMode, showPopup } = this.state;
        return (
            <div className="gestion-productos-container">
                <Navbar/>
                <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Gestión de maquinas</h1>
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th style={{ padding: '10px' }}>Numero de serie</th>
                            <th style={{ padding: '10px' }}>Marca</th>
                            <th style={{ padding: '10px' }}>Tipo</th>
                            <th style={{ padding: '10px' }}>Costo</th>
                            <th style={{ padding: '10px' }}>asociado</th>
                            <th style={{ padding: '10px' }}>Sucursal</th>
                            <th style={{ padding: '10px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maquinas.map((maquina) => (
                            <tr key={maquina.numero_serie}>
                                <td style={{ padding: '10px' }}>{maquina.numero_serie}</td>
                                <td style={{ padding: '10px' }}>{maquina.marca}</td>
                                <td style={{ padding: '10px' }}>{maquina.tipo}</td>
                                <td style={{ padding: '10px' }}>₡{maquina.costo}</td>
                                <td style={{ padding: '10px' }}>{maquina.sucursal ? "Si" : "No"}</td>
                                <td style={{ padding: '10px' }}>{maquina.sucursal}</td>
                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(maquina)}>Editar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(maquina.numero_serie)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn-agregar" onClick={() => this.setState({ showPopup: true })}>Agregar</button>
                {showPopup && (
                    <div className="popup-container">
                        <div className="popup">
                            <h2>{formMode === 'agregar' ? 'Agregar Maquina' : 'Actualizar Maquina'}</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label htmlFor="numero_serie">Numero de serie:</label>
                                    <input type="text" id="numero_serie" name="numero_serie" value={formValues.numero_serie} disabled={formMode === 'editar'} onChange={this.handleInputChange} placeholder="numero_serie" />
                                </div>
                                <div>
                                    <label htmlFor="marca">Marca:</label>
                                    <input type="text" id="marca" name="marca" value={formValues.marca} onChange={this.handleInputChange} placeholder="Primer nombre" />
                                </div>
                                <div>
                                    <label htmlFor="tipo">Tipo:</label>
                                    <input type="text" id="tipo" name="tipo" value={formValues.tipo} onChange={this.handleInputChange} placeholder="tipo" />
                                </div>
                                <div>
                                    <label htmlFor="costo">Costo:</label>
                                    <input type="number" id="costo" name="costo" value={formValues.costo} onChange={this.handleInputChange} placeholder="costo" />
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
export default GestionInventario;
