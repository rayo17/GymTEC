import axios from 'axios';

const API_URL = 'http://localhost:5236/api'; // URL base del backend de la aplicación

// Función para obtener los gimnasios desde la API
export const obtenerGimnasios = () => {
    const endpoint = `${API_URL}/gimnasio`; // Endpoint para obtener la lista de gimnasios
    return axios.get(endpoint)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error al obtener la lista de gimnasios: ', error);
        return null;
      });
  };

// Función para copiar un gimnasio
export const copiarGimnasio = (gimnasioACopiar, nuevoNombre) => {
  const endpoint = `${API_URL}/gimnasio/copia`; // Endpoint para la copia de gimnasio
  const datos = {
    gimnasioACopiar: gimnasioACopiar,
    nuevoNombre: nuevoNombre
  };
  return axios.post(endpoint, datos)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error al copiar el gimnasio: ', error);
      return null;
    });
};
export const obtenerProductos = async () => {
  const response = await axios.get(`${API_URL}/Producto`);
  return response.data;
};

export const obtenerProducto = async (id) => {
  const response = await axios.get(`${API_URL}/Producto/${id}`);
  return response.data;
};

export const agregarProducto = async (producto) => {
  const response = await axios.post(`${API_URL}/Producto`, producto);
  return response.data;
};

export const actualizarProducto = async (id, producto) => {
  const response = await axios.put(`${API_URL}/Producto/${id}`, producto);
  return response.data;
};

export const eliminarProducto = async (id) => {
  const response = await axios.delete(`${API_URL}/Producto/${id}`);
  return response.data;
};

// Función para obtener todas las máquinas
export const obtenerMaquinas = async () => {
  const response = await axios.get(`${API_URL}/Maquinas/congimnasio`);
  return response.data;
};

// Función para obtener una máquina en particular por su ID
export const obtenerMaquina = async (id) => {
  const response = await axios.get(`${API_URL}/Maquinas/${id}`);
  return response.data;
};

// Función para agregar una nueva máquina
export const agregarMaquina = async (maquina) => {
  const response = await axios.post(`${API_URL}/Maquinas`, maquina);
  return response.data;
};

// Función para actualizar los detalles de una máquina existente por su ID
export const actualizarMaquina = async (id, maquina) => {
  const response = await axios.put(`${API_URL}/Maquinas/${id}`, maquina);
  return response.data;
};

// Función para eliminar una máquina por su ID
export const eliminarMaquinaid = async (id) => {
  const response = await axios.delete(`${API_URL}/Maquinas/${id}`);
  return response.data;
};

//Funcion para obtener los  tipo-equipo que hay
export const obtenertipoEquipos = async() => {
  const response = await axios.get(`${API_URL}/TipoEquipo`)
  return response.data;
}
// Función para obtener una Tequipo en particular por su ID
export const obtenerTEquipo = async (id) => {
  const response = await axios.get(`${API_URL}/TipoEquipo/${id}`);
  return response.data;
};

// Función para agregar una nueva TEquipo
export const agregarTEquipo = async (TEquipo) => {
  const response = await axios.post(`${API_URL}/TipoEquipo`, TEquipo);
  return response.data;
};

// Función para actualizar los detalles de una TipoEquipo existente por su ID
export const actualizarTEquipo = async (id, TEquipo) => {
  const response = await axios.put(`${API_URL}/TipoEquipo/${id}`, TEquipo);
  return response.data;
};

// Función para eliminar un TipoEquipo por su ID
export const eliminarTEquipoid = async (id, descripcion) => {
  const response = await axios.delete(`${API_URL}/TipoEquipo/${id}/${descripcion}`);
  return response.data;
};

//Funcion para obtener los  tipo-equipo que hay
export const obtenerServicios = async() => {
  const response = await axios.get(`${API_URL}/Servicio`)
  return response.data;
}
// Función para obtener una Tequipo en particular por su ID
export const obtenerServicio = async (id) => {
  const response = await axios.get(`${API_URL}/Servicio/${id}`);
  return response.data;
};

// Función para agregar una nueva TEquipo
export const agregarServicio = async (Servicio) => {
  const response = await axios.post(`${API_URL}/Servicio`, Servicio);
  return response.data;
};

// Función para actualizar los detalles de una TipoEquipo existente por su ID
export const actualizarServicio = async (id, Servicio) => {
  const response = await axios.put(`${API_URL}/Servicio/${id}`, Servicio);
  return response.data;
};

// Función para eliminar un TipoEquipo por su ID
export const eliminarServicio = async (id, descripcion) => {
  const response = await axios.delete(`${API_URL}/Servicio/${id}/${descripcion}`);
  return response.data;
};
//Funcion para obtener los  tipo-equipo que hay
export const obtenerEmpleados = async() => {
  const response = await axios.get(`${API_URL}/Empleado`)
  return response.data;
}
// Función para obtener una Tequipo en particular por su ID
export const obtenerEmpleado = async (id) => {
  const response = await axios.get(`${API_URL}/Empleado/${id}`);
  return response.data;
};

// Función para agregar una nueva TEquipo
export const agregarEmpleado = async (Servicio) => {
  const response = await axios.post(`${API_URL}/Empleado`, Servicio);
  return response.data;
};

// Función para actualizar los detalles de una TipoEquipo existente por su ID
export const actualizarEmpleado = async (id, Servicio) => {
  const response = await axios.put(`${API_URL}/Empleado/${id}`, Servicio);
  return response.data;
};

// Función para eliminar un TipoEquipo por su ID
export const eliminarEmpleado = async (id) => {
  const response = await axios.delete(`${API_URL}/Empleado/${id}`);
  return response.data;
};

export const obtenerTratamiento = async (id) => {
  const response = await axios.get(`${API_URL}/Tratamiento/${id}`);
  return response.data;
}
export const obtenerTratamientos = async() => {
  const response = await axios.get(`${API_URL}/Tratamiento`);
  return response.data;
}
export const obtenerClasesS = async()=>{
  const response = await axios.get(`${API_URL}/Clase/conSucursal`);
  return response.data;
}
export const obtenerSucursales = async()=>{
  const response = await axios.get(`${API_URL}/Sucursal`);
  return response.data;
}
export const obtenerSucursalTratamiento = async() =>{
  const response = await axios.get(`${API_URL}/Tratamiento/conSucursal`);
  return response.data;
}
export const eliminarSucursalTratamiento = async(sucursal, tratamiento) => {
  const response = await axios.delete(`${API_URL}/TratamientoSucursal/${sucursal}/${tratamiento}`);
  return response.data;
}
export const obtenerSucursalProducto = async() =>{
  const response = await axios.get(`${API_URL}/Producto/conSucursal`);
  return response.data;
}
export const eliminarSucursalProducto = async(sucursal, producto) => {
  const response = await axios.delete(`${API_URL}/ProductoSucursal/${sucursal}/${producto}`);
  return response.data;
}
export const eliminarTratamiento = async(id)=>{
  const response = await axios.delete(`${API_URL}/Tratamiento/${id}`);
  return response.data;
}
export const eliminarClase = async(id)=>{
  const response = await axios.delete(`${API_URL}/Clase/${id}`);
  return response.data;
}
export const asisgnarMaquina = async(id, sucursal)=>{
  const response = await axios.put(`${API_URL}/Maquinas/maquina/${id}/sucursal/${sucursal}`);
  return response.data;
}
export const asignarProducto = async(id, sucursal)=>{
  const response = await axios.post(`${API_URL}/ProductoSucursal/producto/${id}/sucursal/${sucursal}`);
  return response.data;
}
export const asignarTratamiento = async(id, sucursal) => {
  const response = await axios.post(`${API_URL}/TratamientoSucursal/${id}/${sucursal}`);
  return response.data;
}
export const obtenerClases = async()=>{
  const response = await axios.get(`${API_URL}/Clase`);
  return response.data;
}
export const actualizarClase = async(id, clase)=>{
  const response = await axios.put(`${API_URL}/Clase/${id}`, clase);
  return response.data;
}
export const agregarClase = async(clase)=>{
  const response = await axios.post(`${API_URL}/Clase`, clase);
  return response.data;
}
export const eliminarAsoMaquina = async(id)=>{
  const response = await axios.delete(`${API_URL}/Maquinas/${id}/sucursal`);
  return response.data;
}