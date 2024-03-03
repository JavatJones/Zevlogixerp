"use client"
// components/FilterList.tsx

import React, { useState } from 'react';

interface FiltroUsuariosProps {
  onFiltroChange: (filtro: string) => void;
}

const FilterList: React.FC<FiltroUsuariosProps> = ({ onFiltroChange }) => {
  const [filtro, setFiltro] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoFiltro = e.target.value;
    setFiltro(nuevoFiltro);
    onFiltroChange(nuevoFiltro);
  };

  return (
    <div>
      <input type="text" placeholder="Filtrar usuarios..." value={filtro} onChange={handleChange} />
    </div>
  );
};

export default FilterList;