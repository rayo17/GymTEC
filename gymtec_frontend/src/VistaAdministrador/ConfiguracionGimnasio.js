import React from 'react';
import {
    obtenerGimnasios, obtenerProductos, obtenerMaquinas, obtenerClases, obtenerTratamientos, obtenerSucursales,
    agregarEmpleado, actualizarEmpleado, eliminarEmpleado
} from '../api';
import './GestionProductos.css';
import { Navbar } from "../Templates/Navbar"


class ConfiguracionGimnasio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sucursales: [],
            gimnasios: [],
            productos: [],
            maquinas: [],
            clases: [],
            tratamientos: [],
            formValues: { sucursal: '', maquina: '', clase: '', producto: '', tratamiento: '' },
            formMode: 'agregar',
            currentProductId: '',
            showPopup: false
        };
        this.handleOuterClick = this.handleOuterClick.bind(this);
    }

    // Función para obtener los gimnasios desde la API
    getProductos = async () => {
        const data = await obtenerGimnasios();
        const datap = await obtenerProductos();
        const maq = await obtenerMaquinas();
        const clas = await obtenerClases();
        const trat = await obtenerTratamientos();
        const suc = await obtenerSucursales();
        this.setState({ productos: datap });
        this.setState({ gimnasios: data });
        this.setState({ maquinas: maq });
        this.setState({ clases: clas });
        this.setState({ tratamientos: trat });
        this.setState({ sucursales: suc });
        console.log(data)
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
        const { gimnasios, productos, clases, maquinas, tratamientos, sucursales } = this.state;
        return (
            <div className="gestion-productos-container">
                <Navbar />
                <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Configuracion de Gimnasio</h1>
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th style={{ padding: '10px' }}>Sucursal</th>
                            <th style={{ padding: '10px' }}>Maquina</th>
                            <th style={{ padding: '10px' }}>Clase</th>
                            <th style={{ padding: '10px' }}>Producto</th>
                            <th style={{ padding: '10px' }}>Tratamiento</th>
                            <th style={{ padding: '10px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gimnasios.map((gimnasio) => (
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
                        {productos.map((producto) => (
                            <tr key={producto.codigo_barras}>
                                <td style={{ padding: '10px' }}>{producto.codigo_barras}</td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}>{producto.nombre}</td>
                                <td style={{ padding: '10px' }}></td>

                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(producto)}>Asignar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(producto.codigo_barras)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {clases.map((clase) => (
                            <tr key={clase.codigo_barras}>
                                <td style={{ padding: '10px' }}>{clase.identificador}</td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}>{clase.nombre}</td>
                                <td style={{ padding: '10px' }}></td>
                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(clase)}>Asignar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(clase.identificador)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {maquinas.map((maquina) => (
                            <tr key={maquina.numero_serie}>
                                <td style={{ padding: '10px' }}>{maquina.numero_serie}</td>
                                <td style={{ padding: '10px' }}>{maquina.tipo}</td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(maquina)}>Asignar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(maquina.numero_serie)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {tratamientos.map((tratamiento) => (
                            <tr key={tratamiento.identificador}>
                                <td style={{ padding: '10px' }}>{tratamiento.identificador}</td>
                                <td style={{ padding: '10px' }}>{tratamiento.nombre}</td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.handleEditClick(tratamiento)}>Asignar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.handleDeleteClick(tratamiento.numero_serie)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {sucursales.map(sucursale => (
                            <tr key={sucursale.nombre}>
                                <td style={{ padding: '10px' }}>{sucursale.nombre}</td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}></td>
                                <td style={{ padding: '10px' }}>
                                    <button className="btn-accion btn-editar"
                                        onClick={() => this.getSucursal(sucursale.nombre)}>Editar</button>
                                    <button className="btn-accion btn-editar"
                                        onClick={() => this.deleteSucursal(sucursale.nombre)}>Eliminar</button>
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
