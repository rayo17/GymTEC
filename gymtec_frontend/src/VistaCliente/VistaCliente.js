import React from 'react';
import { obtenerClases, FiltroTipo, FiltroSucursal, FiltroRangoHora, FiltroRangoDia } from '../api';
import '../VistaAdministrador/GestionProductos.css';
import { Navbar } from "../Templates/Navbar"

class VistaCliente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clases: [],
            formValues: { dia: '', hora_inicio: '', hora_fin: '' },
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
        this.setState({ clases: data });
    };

    // Función para manejar el envío del formulario
    handleSubmit = async (event) => {
        console.log(this.state.formValues);
        console.log(this.state.currentClaseId);
        event.preventDefault();
        this.getProductos();
        this.setState({ formValues: { tipo: '', instructor: '', grupal: '', capacidad: '', dia: '', hora_inicio: '', hora_fin: '' }, formMode: 'agregar', showPopup: 0 });
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
                this.handleEditClick(2);
                break;
            case 'tipo':
                this.handleEditClick(3);
                break;
            case 'dia':
                this.handleEditClick(4);
                break;
            case 'hora':
                this.handleEditClick(5);
                break;
            default:
                break;
        }
    };

    // Función para manejar el clic en el botón de eliminar de una fila de la tabla
    handleDeleteClick = async (grupal) => {
        this.getProductos();
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

    handleCerrarClick = () => {
        this.setState({ formValues: { tipo: '', instructor: '', grupal: '', capacidad: '', dia: '', hora_inicio: '', hora_fin: '' }, formMode: 'agregar', showPopup: 0 });
        this.setState({ showPopup: 0 });
        document.removeEventListener('mousedown', this.handleOuterClick);
    }
    render() {
        const { clases, formValues, formMode, showPopup } = this.state;
        return (
            <div className="gestion-productos-container">
                <Navbar />
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
                    <select
                        style={{
                            margin: '0px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            marginLeft: '0px',
                            marginRight: '1770px',
                        }}
                        onClick={() => this.handleEditClick(3)}
                    >
                        <option value="sucursal">Sucursal</option>
                        <option value="tipo">Tipo</option>
                        <option value="dia">Día</option>
                        <option value="hora">Hora</option>
                    </select>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default VistaCliente;
