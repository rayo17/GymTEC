import React, { useState } from 'react'
import '../Styles/Menu.css'
function Menu(){
    const [menu,setMenu]=useState('')
    const charge=(e)=>{
        
        setMenu('show')
    }
    return(
        <div className='menu'>
            <nav>
            <label className='logo'>GymTec</label>
            <ul className={`menu_items ${menu}`}>
                <li><a href='/inicio' className='active'>Inicio</a></li>
                <li><a href='/administrador'> Administrador </a></li>
                <li><a href='/cliente'>Cliente</a></li>
            </ul>
            <label for='check' className='checkbox' onClick={charge}>
                <i class="fa fa-bars" aria-hidden="true"></i>
            </label> 
            </nav>
            
        </div>
    )
}

export default Menu