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
                        <Link className="nav-link" to='/administrador'>Gestiones</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to='/generacionplanilla'>Generación planillas</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to='/configGimnasio'>Configuracion gimnasio</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>        
    </div>
  )
}