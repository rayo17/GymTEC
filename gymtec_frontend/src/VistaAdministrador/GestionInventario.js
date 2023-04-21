import React, { Component } from 'react';
import { obtenerMaquinas, agregarMaquina, actualizarMaquina, eliminarMaquinaid } from '../api';
import './GestionProductos.css';

class GestionInventario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maquinas: [],
            edicion: false,
            maquinaActual: { tipo: '', marca: '', numero_serie: '', costo: '' },
            formMode: 'agregar',
            currentProductId: '',
            showPopup: false
        };
        this.handleOuterClick = this.handleOuterClick.bind(this);
    }
    handleOuterClick(event) {
        const container = document.querySelector('.popup');
        if (container && !container.contains(event.target)) {
            this.setState({ showPopup: false });
            this.limpiarFormulario();
            this.setState({formMode: 'agregar'})
        }
    };

    componentDidMount() {
        this.cargarMaquinas();
        document.addEventListener('mousedown', this.handleOuterClick);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOuterClick);
    };

    async cargarMaquinas() {
        const resultado = await obtenerMaquinas();
        this.setState({ maquinas: resultado });
    }

    async guardarMaquina() {
        if (this.state.edicion) {
            await actualizarMaquina(this.state.maquinaActual.numero_serie, this.state.maquinaActual);
            this.setState({ edicion: false });
        } else {
            await agregarMaquina(this.state.maquinaActual);
        }
        this.cargarMaquinas();
        this.limpiarFormulario();
    }

    async eliminarMaquina(numero_serie) {
        await eliminarMaquinaid(numero_serie);
        this.cargarMaquinas();
    }

    limpiarFormulario() {
        this.setState({ maquinaActual: { tipo: '', marca: '', numero_serie: '', costo: '' } });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ maquinaActual: { ...this.state.maquinaActual, [name]: value } });
        
    }

    handleSubmit(event) {
        event.preventDefault();
        this.guardarMaquina();
    }

    editarMaquina(maquina) {
        this.setState({ showPopup: true });
        this.setState({ edicion: true, maquinaActual: maquina });
    }
    render() {
        return (
            <div className="gestion-productos-container">
                <h1 style={{ margin: '50px 0', fontSize: '2.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Gestión de inventario</h1>
                <h2>Lista de máquinas</h2>
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Marca</th>
                            <th>Número de serie</th>
                            <th>Costo</th>
                            <th>Asociado</th>
                            <th>Sucursal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.maquinas.map((maquina) => (
                            <tr key={maquina.numero_serie}>
                                <td>{maquina.tipo}</td>
                                <td>{maquina.marca}</td>
                                <td>{maquina.numero_serie}</td>
                                <td>{maquina.costo}</td>
                                <td>{maquina.sucursal ? "Sí" : "No"}</td>
                                <td>{maquina.sucursal}</td>
                                <td>
                                    <button className="btn-accion btn-editar" onClick={() => this.editarMaquina(maquina)}>Editar</button>
                                    <button className="btn-accion btn-eliminar" onClick={() => this.eliminarMaquina(maquina.numero_serie)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn-agregar" onClick={() => this.setState({ showPopup: true })}>Agregar</button>
                {this.state.showPopup && (
                    <div className="popup-container">
                        <div className="popup">
                            {this.state.edicion ? (
                                <div>
                                    <h2>Editar máquina</h2>
                                    <form onSubmit={(event) => this.handleSubmit(event)}>
                                        <label>
                                            Tipo:
                                            <input type="text" name="tipo" value={this.state.maquinaActual.tipo} onChange={(event) => this.handleChange(event)} />
                                        </label>
                                        <br />
                                        <label>
                                            Marca:
                                            <input type="text" name="marca" value={this.state.maquinaActual.marca} onChange={(event) => this.handleChange(event)} />
                                        </label>
                                        <br />
                                        <label>
                                            Número de serie:
                                            <input type="text" name="numero_serie" value={this.state.maquinaActual.numero_serie} onChange={(event) => this.handleChange(event)} disabled={this.state.edicion} />
                                        </label>
                                        <br />
                                        <label>
                                            Costo:
                                            <input type="text" name="costo" value={this.state.maquinaActual.costo} onChange={(event) => this.handleChange(event)} />
                                        </label>
                                        <br />
                                        <button type="submit" className="btn-submit">Guardar</button>
                                        <button type="button" className="btn-cancelar" onClick={() => this.setState({ edicion: false, showPopup: false })}>Cancelar</button>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    <h2>Agregar máquina</h2>
                                    <form onSubmit={this.handleSubmit}>
                                        <label>
                                            Tipo:
                                            <input type="text" name="tipo" value={this.state.maquinaActual.tipo} onChange={(event) => this.handleChange(event)} />
                                        </label>
                                        <br />
                                        <label>
                                            Marca:
                                            <input type="text" name="marca" value={this.state.maquinaActual.marca} onChange={(event) => this.handleChange(event)} />
                                        </label>
                                        <br />
                                        <label>
                                            Número de serie:
                                            <input type="text" name="numero_serie" value={this.state.maquinaActual.numero_serie} onChange={(event) => this.handleChange(event)} />
                                        </label>
                                        <br />
                                        <label>
                                            Costo:
                                            <input type="text" name="costo" value={this.state.maquinaActual.costo} onChange={(event) => this.handleChange(event)} />
                                        </label>
                                        <br />
                                        <button type="submit" className="btn-submit">Guardar</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                </div>
        );
    }
}
export default GestionInventario;