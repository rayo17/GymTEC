import React from 'react';
import { obtenerClases, agregarClase, actualizarClase, eliminarClase } from '../api';
import './GestionProductos.css';
import { Navbar } from "../Templates/Navbar"

class Clases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clases: [],
            formValues: { tipo: '', instructor: '', grupal: '', capacidad: '', dia: '', hora_inicio: '', hora_fin: '', nombre: '', identificador: '' },
            formMode: 'agregar',
            currentClaseId: '',
            showPopup: false
        };
        this.handleOuterClick = this.handleOuterClick.bind(this);
    }

    // Función para obtener los clases desde la API
    getProductos = async () => {
        const data = await obtenerClases();
        this.setState({ clases: data });
    };

    // Función para manejar el envío del formulario
    handleSubmit = async (event) => {
        console.log(this.state.formValues);
        console.log(this.state.currentClaseId);
        event.preventDefault();
        if (this.state.formMode === 'agregar') {
            await agregarClase(this.state.formValues);
        } else {
            await actualizarClase(this.state.currentClaseId, this.state.formValues);
        }
        this.getProductos();
        this.setState({ formValues: { tipo: '', instructor: '', grupal: '', capacidad: '', dia: '', hora_inicio: '', hora_fin: '', nombre: '', identificador: '' }, formMode: 'agregar', showPopup: false });
    };

    // Función para manejar el cambio de los inputs del formulario
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ formValues: { ...this.state.formValues, [name]: value } });
    };

    // Función para manejar el clic en el botón de editar de una fila de la tabla
    handleEditClick = (clase) => {
        this.setState({ formValues: clase, formMode: 'editar', currentClaseId: clase.identificador, showPopup: true });
    };

    // Función para manejar el clic en el botón de eliminar de una fila de la tabla
    handleDeleteClick = async (grupal) => {
        await eliminarClase(grupal);
        this.getProductos();
    };
    handleOuterClick(event) {
        const container = document.querySelector('.popup');
        if (container && !container.contains(event.target)) {
            this.setState({ showPopup: false });
            this.setState({ formValues: { tipo: '', instructor: '', grupal: '', capacidad: '', dia: '', hora_inicio: '', hora_fin: '', nombre: '', identificador: '' }, formMode: 'agregar', showPopup: false });
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
        this.setState({ formValues: { tipo: '', instructor: '', grupal: '', capacidad: '', dia: '', hora_inicio: '', hora_fin: '', nombre: '', identificador: '' }, formMode: 'agregar', showPopup: false });
        this.setState({ showPopup: false });
        document.removeEventListener('mousedown', this.handleOuterClick);
    }
    render() {
        const { clases, formValues, formMode, showPopup } = this.state;
        return (
            <div className="gestion-productos-container">
                <Navbar />
                <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Gestión de clases</h1>
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th style={{ padding: '10px' }}>Grupal</th>
                            <th style={{ padding: '10px' }}>Instructor</th>
                            <th style={{ padding: '10px' }}>Tipo</th>
                            <th style={{ padding: '10px' }}>Capacidad</th>
                            <th style={{ padding: '10px' }}>Dia</th>
                            <th style={{ padding: '10px' }}>Hora Inicio</th>
                            <th style={{ padding: '10px' }}>Hora Fin</th>
                            <th style={{ padding: '10px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clases.map((clase) => (
                            <tr key={clase.grupal}>
                                <td style={{ padding: '10px' }}>{clase.grupal === 1 ? "Individual" : "Grupal"}</td>
                                <td style={{ padding: '10px' }}>{clase.instructor}</td>
                                <td style={{ padding: '10px' }}>{clase.tipo}</td>
                                <td style={{ padding: '10px' }}>{clase.capacidad}</td>
                                <td style={{ padding: '10px' }}>{clase.dia}</td>
                                <td style={{ padding: '10px' }}>{clase.hora_inicio}</td>
                                <td style={{ padding: '10px' }}>{clase.hora_fin}</td>

                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(clase)}>Editar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(clase.identificador)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn-agregar" onClick={() => this.setState({ showPopup: true })}>Agregar</button>
                {showPopup && (
                    <div className="popup-container">
                        <div className="popup">
                            <h2>{formMode === 'agregar' ? 'Agregar clase' : 'Actualizar clase'}</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label htmlFor="grupal">Grupal:</label>
                                    <select className="select-box" id="grupal" name="grupal" value={formValues.grupal} onChange={this.handleInputChange}>
                                        <option value="1">Individual</option>
                                        <option value="2">Grupal</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input type="text" id="nombre" name="nombre" value={formValues.nombre} onChange={this.handleInputChange} placeholder="nombre" />
                                </div>
                                <div>
                                    <label htmlFor="instructor">Instructor:</label>
                                    <input type="text" id="instructor" name="instructor" value={formValues.instructor} onChange={this.handleInputChange} placeholder="instructor" />
                                </div>
                                <div>
                                    <label htmlFor="tipo">Tipo:</label>
                                    <input type="text" id="tipo" name="tipo" value={formValues.tipo} onChange={this.handleInputChange} placeholder="tipo" />
                                </div>
                                <div>
                                    <label htmlFor="capacidad">Capacidad:</label>
                                    <input type="number" id="capacidad" name="capacidad" value={formValues.capacidad} onChange={this.handleInputChange} placeholder="capacidad" />
                                </div>
                                <div>
                                    <label htmlFor="dia">Dia:</label>
                                    <input type="text" id="dia" name="dia" value={formValues.dia} onChange={this.handleInputChange} placeholder="dia" />
                                </div>
                                <div>
                                    <label htmlFor="hora_inicio">Hora inicio:</label>
                                    <input type="time" id="hora_inicio" name="hora_inicio" value={formValues.hora_inicio} onChange={this.handleInputChange} placeholder="hora_inicio" />
                                </div>
                                <div>
                                    <label htmlFor="hora_fin">Hora fin:</label>
                                    <input type="time" id="hora_fin" name="hora_fin" value={formValues.hora_fin} onChange={this.handleInputChange} placeholder="hora_fin" />
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
export default Clases;
