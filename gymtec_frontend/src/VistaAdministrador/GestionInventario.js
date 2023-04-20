import React, { useState, useEffect } from 'react';
import { obtenerMaquinas, agregarMaquina, actualizarMaquina, eliminarMaquinaid } from '../api'; // Importamos las funciones de la API que necesitamos

function GestionInventario() {
    const [maquinas, setMaquinas] = useState([]);
    const [edicion, setEdicion] = useState(false);
    const [maquinaActual, setMaquinaActual] = useState({ tipo: '', marca: '', numero_serie: '', costo: '' });

    useEffect(() => {
        cargarMaquinas();
    }, []);

    async function cargarMaquinas() {
        const resultado = await obtenerMaquinas();
        setMaquinas(resultado);
    }


    async function guardarMaquina() {
        if (edicion) {
            await actualizarMaquina(maquinaActual.numero_serie, maquinaActual);
            setEdicion(false);
        } else {
            await agregarMaquina(maquinaActual);
        }
        cargarMaquinas();
        limpiarFormulario();
    }
    async function eliminarMaquina(numero_serie) {
        await eliminarMaquinaid(numero_serie);
        cargarMaquinas();
    }

    function limpiarFormulario() {
        setMaquinaActual({ tipo: '', marca: '', numero_serie: '', costo: '' });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMaquinaActual({ ...maquinaActual, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        guardarMaquina();
    }

    function editarMaquina(maquina) {
        setEdicion(true);
        setMaquinaActual(maquina);
    }
    return (
        <div>
            <h1>Gestión de inventario</h1>
            <h2>Lista de máquinas</h2>
            <table>
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
                    {maquinas.map((maquina) => (
                        <tr key={maquina.numero_serie}>
                            <td>{maquina.tipo}</td>
                            <td>{maquina.marca}</td>
                            <td>{maquina.numero_serie}</td>
                            <td>{maquina.costo}</td>
                            <td>{maquina.sucursal ? "Sí" : "No"}</td>
                            <td>{maquina.sucursal}</td>
                            <td>
                                <button onClick={() => editarMaquina(maquina)}>Editar</button>
                                <button onClick={() => eliminarMaquina(maquina.numero_serie)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {edicion ? (
                <div>
                    <h2>Editar máquina</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Tipo:
                            <input type="text" name="tipo" value={maquinaActual.tipo} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            Marca:
                            <input type="text" name="marca" value={maquinaActual.marca} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            Número de serie:
                            <input type="text" name="numero_serie" value={maquinaActual.numero_serie} onChange={handleChange} disabled={edicion} />
                        </label>
                        <br />
                        <label>
                            Costo:
                            <input type="text" name="costo" value={maquinaActual.costo} onChange={handleChange} />
                        </label>
                        <br />
                        <button type="submit">Guardar</button>
                        <button onClick={() => setEdicion(false)}>Cancelar</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>Agregar máquina</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Tipo:
                            <input type="text" name="tipo" value={maquinaActual.tipo} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            Marca:
                            <input type="text" name="marca" value={maquinaActual.marca} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            Número de serie:
                            <input type="text" name="numero_serie" value={maquinaActual.numero_serie} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            Costo:
                            <input type="text" name="costo" value={maquinaActual.costo} onChange={handleChange} />
                        </label>
                        <br />
                        <button type="submit">Guardar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default GestionInventario;