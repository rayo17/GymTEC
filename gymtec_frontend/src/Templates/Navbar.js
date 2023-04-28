/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import icon from '../Imgs/AdminIcon.png'
import React from 'react'
import { Link } from 'react-router-dom'


export const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to='/administrador'>
                    <img src={icon} width='35'/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link">Vista Administrador</a>
                    </li>

                    <li className="nav-item">
                        <Link className='nav-link' to='/gestionsucursales'>Sucursales</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to='/gestiontratamientosspa'>Tratamientos del spa</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to='/gestionpuestos'>Puestos</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to='/gestionplanillas'>Planilla</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to='/gestionproductos'>Productos</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to='/gestioninventario'>Inventario</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to='/gestiontiposequipo'>Equipo</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to='/gestionservicios'>Servicios</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to='/gestionempleados'>Empleados</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to='/gestionempleados'>Gestionar empleados</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/configGimnasio'>Configurar Gimnasio</Link>
                    </li>                      
                </ul>
                </div>
            </div>
        </nav>        
    </div>
  )
}