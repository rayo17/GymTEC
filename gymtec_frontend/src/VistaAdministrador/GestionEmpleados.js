import React from 'react';
import { obtenerEmpleados, agregarEmpleado, actualizarEmpleado, eliminarEmpleado } from '../api';
import './GestionProductos.css';
import { Navbar } from "../Templates/Navbar"


class GestionEmpleados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            empleados: [],
            formValues: { cedula: '', primer_nombre: '', segundo_nombre: '', primer_apellido: '', segundo_apellido: '', distrito: '', canton: '', provincia: '', salario: '', correo_electronico: '', contrasenna:'', sucursal: null, puesto:'', planilla:'', clases_impartidas: 0 },
            formMode: 'agregar',
            currentProductId: '',
            showPopup: false
        };
        this.handleOuterClick = this.handleOuterClick.bind(this);
    }

    // Función para obtener los empleados desde la API
    getProductos = async () => {
        const data = await obtenerEmpleados();
        this.setState({ empleados: data });
    };

    // Función para manejar el envío del formulario
    handleSubmit = async (event) => {

        
        event.preventDefault();
        if (this.state.formMode === 'agregar') {
            if(this.state.formValues.sucursal === ''){
                this.setState({formValues: {sucursal: null}});
                console.log(this.state.formValues);
                await agregarEmpleado(this.state.formValues);
            }
            console.log(this.state.formValues);
            await agregarEmpleado(this.state.formValues);
        } else {
            await actualizarEmpleado(this.state.currentProductId, this.state.formValues);
        }
        this.getProductos();
        this.setState({ formValues: { cedula: '', primer_nombre: '', segundo_nombre: '', primer_apellido: '', segundo_apellido: '', distrito: '', canton: '', provincia: '', salario: '', correo_electronico: '', contrasenna:'', sucursal: null, puesto:'', planilla:'', clases_impartidas: 0 }, formMode: 'agregar', showPopup: false });
    };

    // Función para manejar el cambio de los inputs del formulario
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ formValues: { ...this.state.formValues, [name]: value } });
    };

    // Función para manejar el clic en el botón de editar de una fila de la tabla
    handleEditClick = (empleado) => {
        this.setState({ formValues: empleado, formMode: 'editar', currentProductId: empleado.cedula, showPopup: true });
    };

    // Función para manejar el clic en el botón de eliminar de una fila de la tabla
    handleDeleteClick = async (cedula) => {
        await eliminarEmpleado(cedula);
        this.getProductos();
    };
    handleOuterClick(event) {
        const container = document.querySelector('.popup');
        if (container && !container.contains(event.target)) {
            this.setState({ showPopup: false });
            this.setState({ formValues: { cedula: '', primer_nombre: '', segundo_nombre: '', primer_apellido: '', segundo_apellido: '', distrito: '', canton: '', provincia: '', salario: '', correo_electronico: '', contrasenna:'', sucursal: null, puesto:'', planilla:'', clases_impartidas: 0 }, formMode: 'agregar', showPopup: false });
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
        this.setState({ formValues: { cedula: '', primer_nombre: '', segundo_nombre: '', primer_apellido: '', segundo_apellido: '', distrito: '', canton: '', provincia: '', salario: '', correo_electronico: '', contrasenna:'', sucursal: null, puesto:'', planilla:'', clases_impartidas: 0 }, formMode: 'agregar', showPopup: false });
        this.setState({ showPopup: false });
        document.removeEventListener('mousedown', this.handleOuterClick);
    }
    render() {
        const { empleados, formValues, formMode, showPopup } = this.state;
        return (
            <div className="gestion-productos-container">
                <Navbar/>
                <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Gestión de empleados</h1>
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th style={{ padding: '10px' }}>Cedula</th>
                            <th style={{ padding: '10px' }}>Nombre Completo</th>
                            <th style={{ padding: '10px' }}>Ubicacion</th>
                            <th style={{ padding: '10px' }}>Puesto</th>
                            <th style={{ padding: '10px' }}>Sucursal</th>
                            <th style={{ padding: '10px' }}>Planilla</th>
                            <th style={{ padding: '10px' }}>salario</th>
                            <th style={{ padding: '10px' }}>Correo</th>
                            <th style={{ padding: '10px' }}>Contraseña</th>
                            <th style={{ padding: '10px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((empleado) => (
                            <tr key={empleado.cedula}>
                                <td style={{ padding: '10px' }}>{empleado.cedula}</td>
                                <td style={{ padding: '10px' }}>{empleado.primer_nombre} {empleado.segundo_nombre} {empleado.primer_apellido} {empleado.segundo_apellido}</td>
                                <td style={{ padding: '10px' }}>{empleado.distrito} / {empleado.canton} / {empleado.provincia}</td>
                                <td style={{ padding: '10px' }}>{empleado.puesto}</td>
                                <td style={{ padding: '10px' }}>{empleado.sucursal}</td>
                                <td style={{ padding: '10px' }}>{empleado.planilla}</td>

                                <td style={{ padding: '10px' }}>₡{empleado.salario}</td>
                                <td style={{ padding: '10px' }}>{empleado.correo_electronico}</td>
                                <td style={{ padding: '10px' }}>{empleado.contrasenna}</td>
                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(empleado)}>Editar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(empleado.cedula)}>Eliminar</button>
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
                                    <label htmlFor="cedula">Cedula:</label>
                                    <input type="text" id="cedula" name="cedula" value={formValues.cedula} disabled={formMode === 'editar'} onChange={this.handleInputChange} placeholder="Cedula" />
                                </div>
                                <div>
                                    <label htmlFor="nombre">Nombre completo:</label>
                                    <input type="text" id="primer_nombre" name="primer_nombre" value={formValues.primer_nombre} onChange={this.handleInputChange} placeholder="Primer nombre" />
                                    <input type="text" id="segundo_nombre" name="segundo_nombre" value={formValues.segundo_nombre} onChange={this.handleInputChange} placeholder="Segundo nombre" />
                                    <input type="text" id="primer_apellido" name="primer_apellido" value={formValues.primer_apellido} onChange={this.handleInputChange} placeholder="Primer apellido" />
                                    <input type="text" id="segundo_apellido" name="segundo_apellido" value={formValues.segundo_apellido} onChange={this.handleInputChange} placeholder="Segundo apellido" />
                                </div>
                                <div>
                                    <label htmlFor="ubicacion">Ubicacion:</label>
                                    <input type="text" id="distrito" name="distrito" value={formValues.distrito} onChange={this.handleInputChange} placeholder="distrito" />
                                    <input type="text" id="canton" name="canton" value={formValues.canton} onChange={this.handleInputChange} placeholder="canton" />
                                    <input type="text" id="provincia" name="provincia" value={formValues.provincia} onChange={this.handleInputChange} placeholder="provincia" />
                                </div>
                                <div>
                                    <label htmlFor="salario">Salario:</label>
                                    <input type="number" id="salario" name="salario" value={formValues.salario} onChange={this.handleInputChange} placeholder="salario" />
                                </div>
                                <div>
                                    <label htmlFor="sucursal">Sucursal:</label>
                                    <input type="string" id="sucursal" name="sucursal" value={formValues.sucursal} onChange={this.handleInputChange} placeholder="sucrsal" />
                                </div>
                                <div>
                                    <label htmlFor="planilla">Planilla:</label>
                                    <input type="number" id="planilla" name="planilla" value={formValues.planilla} disabled={formMode === 'editar'} onChange={this.handleInputChange} placeholder="planilla" />
                                </div>
                                <div>
                                    <label htmlFor="puesto">Puesto:</label>
                                    <input type="number" id="puesto" name="puesto" value={formValues.puesto} disabled={formMode === 'editar'} onChange={this.handleInputChange} placeholder="puesto" />
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
export default GestionEmpleados;
