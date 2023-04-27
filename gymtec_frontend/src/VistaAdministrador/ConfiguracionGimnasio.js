import React from 'react';
import { obtenerGimnasios, agregarEmpleado, actualizarEmpleado, eliminarEmpleado } from '../api';
import './GestionProductos.css';
import { Navbar } from "../Templates/Navbar"


class ConfiguracionGimnasio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            empleados: [],
            formValues: { sucursal: '', maquina: '', clase: '', producto: '', tratamiento: '' },
            formMode: 'agregar',
            currentProductId: '',
            showPopup: false
        };
        this.handleOuterClick = this.handleOuterClick.bind(this);
    }

    // Función para obtener los empleados desde la API
    getProductos = async () => {
        const data = await obtenerGimnasios();
        this.setState({ empleados: data });
    };

    // Función para manejar el envío del formulario
    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.formMode === 'agregar') {
            await agregarEmpleado(this.state.formValues);
        } else {
            await actualizarEmpleado(this.state.currentProductId, this.state.formValues);
        }
        this.getProductos();
        this.setState({ formValues: { sucursal: '', maquina: '', clase: '', producto: '', tratamiento: '' }, formMode: 'agregar', showPopup: false });
    };

    // Función para manejar el cambio de los inputs del formulario
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ formValues: { ...this.state.formValues, [name]: value } });
    };

    // Función para manejar el clic en el botón de editar de una fila de la tabla
    handleEditClick = (gimnasio) => {
        this.setState({ formValues: gimnasio, formMode: 'editar', currentProductId: gimnasio.sucursal, showPopup: true });
    };

    // Función para manejar el clic en el botón de eliminar de una fila de la tabla
    handleDeleteClick = async (sucursal) => {
        await eliminarEmpleado(sucursal);
        this.getProductos();
    };
    handleOuterClick(event) {
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
        const { empleados, formValues, formMode, showPopup } = this.state;
        return (
            <div className="gestion-productos-container">
                <Navbar/>
                <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Configuracion de Gimnasio</h1>
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th style={{ padding: '10px' }}>Sucursal</th>
                            <th style={{ padding: '10px' }}>Maquina</th>
                            <th style={{ padding: '10px' }}>Clase</th>
                            <th style={{ padding: '10px' }}>Producto</th>
                            <th style={{ padding: '10px' }}>Tratamiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((gimnasio) => (
                            <tr key={gimnasio.sucursal}>
                                <td style={{ padding: '10px' }}>{gimnasio.sucursal}</td>
                                <td style={{ padding: '10px' }}>{gimnasio.maquina}</td>
                                <td style={{ padding: '10px' }}>{gimnasio.clase}</td>
                                <td style={{ padding: '10px' }}>{gimnasio.producto}</td>
                                <td style={{ padding: '10px' }}>{gimnasio.tratamiento}</td>
                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(gimnasio)}>Editar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(gimnasio.sucursal)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn-agregar" onClick={() => this.setState({ showPopup: true })}>Agregar</button>
                {showPopup && (
                    <div className="popup-container">
                        <div className="popup">
                            <h2>{formMode === 'agregar' ? 'Agregar Empleado' : 'Actualizar Empleado'}</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label htmlFor="sucursal">sucursal:</label>
                                    <input type="text" id="sucursal" name="sucursal" value={formValues.sucursal} disabled={formMode === 'editar'} onChange={this.handleInputChange} placeholder="sucursal" />
                                </div>
                                <div>
                                    <label htmlFor="nombre">Nombre completo:</label>
                                    <input type="text" id="maquina" name="maquina" value={formValues.maquina} onChange={this.handleInputChange} placeholder="Primer nombre" />
                                    <input type="text" id="clase" name="clase" value={formValues.clase} onChange={this.handleInputChange} placeholder="Segundo nombre" />
                                    <input type="text" id="producto" name="producto" value={formValues.producto} onChange={this.handleInputChange} placeholder="Primer apellido" />
                                    <input type="text" id="tratamiento" name="tratamiento" value={formValues.tratamiento} onChange={this.handleInputChange} placeholder="Segundo apellido" />
                                </div>
                                <div>
                                    <label htmlFor="ubicacion">Ubicacion:</label>
                                    <input type="text" id="distrito" name="distrito" value={formValues.distrito} onChange={this.handleInputChange} placeholder="distrito" />
                                    <input type="text" id="canton" name="canton" value={formValues.canton} onChange={this.handleInputChange} placeholder="canton" />
                                    <input type="text" id="provincia" name="provincia" value={formValues.provincia} onChange={this.handleInputChange} placeholder="provincia" />
                                </div>
                                <div>
                                    <label htmlFor="salario">salario:</label>
                                    <input type="number" id="salario" name="salario" value={formValues.salario} onChange={this.handleInputChange} placeholder="salario" />
                                </div>
                                <div>
                                    <label htmlFor="Correo">Correo:</label>
                                    <input type="text" id="correo_electronico" name="correo_electronico" value={formValues.correo_electronico} onChange={this.handleInputChange} placeholder="Correo electronico" />
                                </div>
                                <div>
                                    <label htmlFor="contrasenna">Contraseña:</label>
                                    <input type="text" id="contrasenna" name="contrasenna" value={formValues.contrasenna} disabled={formMode === 'editar'} onChange={this.handleInputChange} placeholder="Contraseña" />
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
export default ConfiguracionGimnasio;
