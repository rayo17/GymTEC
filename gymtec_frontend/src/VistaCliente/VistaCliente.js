import React from 'react';
import axios from 'axios';
import { obtenerClases, FiltroTipo, FiltroSucursal, FiltroRangoHora, FiltroRangoDia, obtenerSucursales, obtenerServicios, quitarCupo } from '../api';
import '../VistaAdministrador/GestionProductos.css';
import { NavbarCliente } from "../Templates/NavbarCliente"


class VistaCliente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clases: [],
            sucursales: [],
            servicios: [],
            formValues: { diaInit: '', hora_inicio: '', hora_fin: '', diaFin: '' },
            formMode: 'agregar',
            currentClaseId: '',
            filterValue: '',
            showPopup: ''
        };
        this.handleOuterClick = this.handleOuterClick.bind(this);
    }

    // Función para obtener los clases desde la API
    getProductos = async () => {
        const data = await obtenerClases();
        const suc = await obtenerSucursales();
        const ser = await obtenerServicios();
        this.setState({ servicios: ser });
        this.setState({ sucursales: suc });
        this.setState({ clases: data });
    };

    // Función para manejar el envío del formulario
    handleSubmit = async (event, tipo, name) => {
        event.preventDefault();
        if (tipo === 1) {
            const data = await FiltroSucursal(name);
            console.log(data)
            this.setState({ clases: data })
        }
        if (tipo === 2) {
            const data = await FiltroTipo(name);
            console.log(data)
            this.setState({ clases: data })
        }
        if (tipo === 3) {
            console.log(this.state.formValues.diaInit, this.state.formValues.diaFin)
            const data = await FiltroRangoDia(this.state.formValues.diaInit, this.state.formValues.diaFin)
            this.setState({ clases: data })
        }
        if (tipo === 4) {
            this.setState({ clases: [] })
            console.log(this.state.formValues.hora_fin, this.state.formValues.hora_inicio)
            const data = await FiltroRangoHora(this.state.formValues.hora_inicio, this.state.formValues.hora_fin)
            console.log(data)
            this.setState({ clases: data })
        }
    };

    // Función para manejar el cambio de los inputs del formulario
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ formValues: { ...this.state.formValues, [name]: value } });
    };

    // Función para manejar el clic en el botón de editar de una fila de la tabla
    handleEditClick = (tipo) => {
        this.setState({ showPopup: tipo });
    };
    // La función que maneja el evento onChange del elemento <select>
    handleFilterChange = (event) => {
        const value = event.target.value;
        this.setState({ filterValue: value });

        switch (value) {
            case 'sucursal':
                this.handleEditClick(3);
                break;
            case 'tipo':
                this.handleEditClick(4);
                break;
            case 'dia':
                this.handleEditClick(5);
                break;
            case 'hora':
                this.handleEditClick(6);
                break;
            default:
                break;
        }
    };

    // Función para manejar el clic en el botón de eliminar de una fila de la tabla
    handleDeleteClick = async (grupal) => {
    };
    handleOuterClick(event) {
        const container = document.querySelector('.popup');
        if (container && !container.contains(event.target)) {
            this.setState({ showPopup: 0 });
            this.setState({ formValues: { tipo: '', instructor: '', grupal: '', capacidad: '', dia: '', hora_inicio: '', hora_fin: '' }, formMode: 'agregar', showPopup: 0 });
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

    registrarClase = (reg) => {
        var cliente = sessionStorage.getItem("miId");

        axios
            .post('http://localhost:5236/api/ClaseCliente', {
                clase: String(reg.identificador),
                cliente: cliente,
            }) // obtiene la lista de sucursales desde el API
            .then(response => {
                quitarCupo(reg.identificador)
                console.log("Todo bien")
                //this.handleMisClases();
            })
            .catch(error => {
                alert("Ya te has registrado en esta clase")
            });
    }


    handleCerrarClick = () => {
        this.setState({ formValues: { tipo: '', instructor: '', grupal: '', capacidad: '', dia: '', hora_inicio: '', hora_fin: '' }, formMode: 'agregar', showPopup: 0 });
        this.setState({ showPopup: 0 });
        document.removeEventListener('mousedown', this.handleOuterClick);
    }
    render() {
        const { clases, formValues, showPopup, sucursales, servicios } = this.state;
        return (
            <div className="gestion-productos-container">
                <NavbarCliente />
                <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Gestión de clases</h1>

                <h1 style={{ margin: '0px', fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '0px', marginRight: '1770px' }} onClick={() => this.handleEditClick(1)}>Filtrar</h1>
                {showPopup >= 1 && (
                    // En el render()
                    <select
                        style={{
                            margin: '0px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            marginLeft: '0px',
                            marginRight: '1770px',
                        }}
                        value={this.state.filterValue}
                        onChange={this.handleFilterChange}
                    >
                        <option value="">Filtrar</option>
                        <option value="sucursal">Sucursal</option>
                        <option value="tipo">Tipo</option>
                        <option value="dia">Día</option>
                        <option value="hora">Hora</option>
                    </select>
                )}
                {showPopup === 3 && (
                    <select id="selectedSucursal" value={this.state.filterValue} onChange={(event) => this.handleSubmit(event, 1, event.target.value)}>
                        <option value="">Selecciona una sucursal</option>
                        {sucursales.map(gym => (
                            <option className="minimalist-option" key={gym.nombre} value={gym.nombre}>
                                {gym.nombre}
                            </option>
                        ))}
                    </select>

                )}

                {showPopup === 4 && (
                    <select id="selectedSucursal" value={this.state.filterValue} onChange={(event) => this.handleSubmit(event, 2, event.target.value)}>
                        <option value="">Seleccione un servicio</option>
                        {servicios.map(gym => (
                            <option className="minimalist-option" key={gym.descripcion} value={gym.identificador}>
                                {gym.descripcion}
                            </option>
                        ))}
                    </select>

                )}
                {showPopup === 5 && (
                    <form onSubmit={(event) => this.handleSubmit(event, 3)}>
                        <label htmlFor="diaInit">Día de inicio:</label>
                        <select id="diaInit" name="diaInit" value={formValues.diaInit} onChange={this.handleInputChange}>
                            <option value="">Selecciona un día</option>
                            <option value="1">Lunes</option>
                            <option value="2">Martes</option>
                            <option value="3">Miércoles</option>
                            <option value="4">Jueves</option>
                            <option value="5">Viernes</option>
                            <option value="6">Sábado</option>
                            <option value="7">Domingo</option>
                        </select>

                        <label htmlFor="diaFin">Día final:</label>
                        <select id="diaFin" name="diaFin" value={formValues.diaFin} onChange={this.handleInputChange}>
                            <option value="">Selecciona un día</option>
                            <option value="1">Lunes</option>
                            <option value="2">Martes</option>
                            <option value="3">Miércoles</option>
                            <option value="4">Jueves</option>
                            <option value="5">Viernes</option>
                            <option value="6">Sábado</option>
                            <option value="7">Domingo</option>
                        </select>

                        <button type="submit">Filtrar</button>
                    </form>
                )}


                {showPopup === 6 && (
                    <form onSubmit={(event) => this.handleSubmit(event, 4)}>
                        <input type="time" id="hora_inicio" name="hora_inicio" value={formValues.hora_inicio} onChange={this.handleInputChange} placeholder="hora_inicio" />
                        <input type="time" id="hora_fin" name="hora_fin" value={formValues.hora_fin} onChange={this.handleInputChange} placeholder="hora_fin" />
                        <button type="submit">Filtrar</button>
                    </form>
                )}

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
                            <th style={{ padding: '10px' }}>Registrarse</th>

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
                                <td style={{ padding: '10px'}}>
                                    <button style={{ borderRadius: '5px', backgroundColor: '#fff', color: '#3498db', border: '2px solid #3498db', cursor: 'pointer' }}
                                    onClick={() => this.registrarClase(clase)} disabled={clase.capacidad <= 0}>
                                        {clase.capacidad > 0 ? 'Registrarse' : 'Agotado'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default VistaCliente;
