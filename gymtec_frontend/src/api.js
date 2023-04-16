import axios from 'axios';

const API_URL = 'http://localhost:5236'; // URL base del backend de la aplicación

// Función para obtener los gimnasios desde la API
export const obtenerGimnasios = () => {
    const endpoint = `${API_URL}/api/gimnasio`; // Endpoint para obtener la lista de gimnasios
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
