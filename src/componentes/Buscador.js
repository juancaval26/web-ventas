import React, { useState } from 'react';

function Buscador({ onBuscar }) {
  const [busqueda, setBusqueda] = useState('');

  const handleBusqueda = (event) => {
    const { value } = event.target;
    setBusqueda(value);
    onBuscar(value); // Llama a la función proporcionada por el componente padre con el término de búsqueda
  };

  return (
    <div className="mb-3 col-xs-4" style={{ maxWidth: '300px' }} >
      <input
        type="search"
        className="form-control"
        placeholder="Buscar Marca/Referencia."
        value={busqueda}
        onChange={handleBusqueda}
      />
    </div>
  );
}

export default Buscador;
