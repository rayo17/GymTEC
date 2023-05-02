import { useState, useEffect } from 'react';
import { obtenerGimnasios, copiarGimnasio } from '../api'; // Importamos la función para obtener los gimnasios desde la API

function CopyGymForm() {
  const [newGymName, setNewGymName] = useState('');
  const [selectedGym, setSelectedGym] = useState('');
  const [gyms, setGyms] = useState([]);

  // Obtener los gimnasios desde la API al cargar el componente
  useEffect(() => {
    obtenerGimnasios().then(data => setGyms(data));
  }, []);

  const handleNewGymNameChange = event => setNewGymName(event.target.value);
  const handleSelectedGymChange = event => setSelectedGym(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    copiarGimnasio(selectedGym, newGymName).then(data => {
      if (data) {
        console.log(`Gimnasio ${selectedGym} copiado a ${newGymName}`);
      } else {
        console.error('Error al copiar el gimnasio');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="newGymName">Nombre del nuevo gimnasio:</label>
        <input
          type="text"
          id="newGymName"
          value={newGymName}
          onChange={handleNewGymNameChange}
        />
      </div>
      <div>
        <label htmlFor="selectedGym">Gimnasio a copiar:</label>
        <select id="selectedGym" value={selectedGym} onChange={handleSelectedGymChange}>
          <option value="">Selecciona un gimnasio</option>
          {gyms.map(gym => (
            <option key={gym.sucursal} value={gym.sucursal}>
              {gym.sucursal}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Copiar gimnasio</button>
    </form>
  );
}

export default CopyGymForm;
