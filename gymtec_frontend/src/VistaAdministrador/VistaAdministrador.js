import React from "react"

import { Navbar } from "../Templates/Navbar"
import MiniCard from "../Templates/MiniCard"

import CyclingIcon from '../Imgs/CyclingIcon.png'
import EmpleadoIcon from '../Imgs/EmpleadoIcon.png'
import EquipoIcon from '../Imgs/EquipoIcon.png'
import InventarioIcon from '../Imgs/InventarioIcon.png'
import PlanillaIcon from '../Imgs/PlanillaIcon.png'
import ProductoIcon from '../Imgs/ProductoIcon.png'
import PuestoIcon from '../Imgs/PuestoIcon.png'
import SucursalIcon from '../Imgs/SucursalIcon.png'
import TratamientoIcon from '../Imgs/TratamientoIcon.png'


const VistaAdministrador = () => {
    return (
        <div>
          <Navbar/>
          <div className='container-fluid'>
            <div className='row'>

              <div className='col'>
                  <MiniCard 
                    title='Sucursales'
                    imageUrl={SucursalIcon}
                    body='Gestionar sucursales'
                    url='/gestionsucursales'
                  />
              </div>

              <div className='col'>
                <MiniCard 
                  title='Tratamientos'
                  imageUrl={TratamientoIcon}
                  body='Gestionar tratamientos'
                  url='/gestiontratamientosspa'
                />
              </div>

              <div className='col'>
                <MiniCard 
                  title='Puestos'
                  imageUrl={PuestoIcon}
                  body='Gestionar puestos'
                  url='/gestionpuestos'
                />
              </div>

              <div className='col'>
                <MiniCard 
                  title='Planillas'
                  imageUrl={PlanillaIcon}
                  body='Gestionar planilla'
                  url='/gestionplanillas'
                />
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                  <MiniCard 
                    title='Empleados'
                    imageUrl={EmpleadoIcon}
                    body='Gestionar empleados'
                    url='/gestionempleados'
                  />
                </div>

                <div className='col'>
                  <MiniCard 
                    title='Servicios'
                    imageUrl={CyclingIcon}
                    body='Gestionar servicios'
                    url='/gestionservicios'
                  />
                </div>

                <div className='col'>
                  <MiniCard 
                    title='Equipo'
                    imageUrl={EquipoIcon}
                    body='Gestionar equipo'
                    url='/gestiontiposequipo'
                  />
                </div>

                <div className='col'>
                  <MiniCard 
                    title='Inventario'
                    imageUrl={InventarioIcon}
                    body='Gestionar inventario'
                    url='/gestioninventario'
                  />
                </div>

                <div className='col'>
                  <MiniCard 
                    title='Productos'
                    imageUrl={ProductoIcon}
                    body='Gestionar productos'
                    url='/gestionproductos'
                  />
                </div>
            </div>
          </div>
        </div>
    )
}

export default VistaAdministrador