import React from "react"

// Templates
import { Navbar } from "../Templates/Navbar"
import MiniCard from "../Templates/MiniCard"

// Icons
import EmpleadoIcon from '../Imgs/EmpleadoIcon.png'
import EquipoIcon from '../Imgs/EquipoIcon.png'
import PlanillaIcon from '../Imgs/PlanillaIcon.png'
import ProductoIcon from '../Imgs/ProductoIcon.png'
import PuestoIcon from '../Imgs/PuestoIcon.png'
import ServicioIcon from '../Imgs/ServicioIcon.png'
import SucursalIcon from '../Imgs/SucursalIcon.png'
import TrtamientoIcon from '../Imgs/TratamientoIcon.png'
import InventarioIcon from '../Imgs/InventarioIcon.png'


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
                imageUrl={TrtamientoIcon}
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
                body='Gestionar planillas'
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
                imageUrl={ServicioIcon}
                body='Gestionar servicios'
                url='/gestionservicios'
              />
            </div>

            <div className='col'>
              <MiniCard
                title='Equipo'
                imageUrl={EquipoIcon}
                body='Gestionar tipos'
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