import React, { useState } from "react";

const BuscaPokemon = ({ onSearch }) => {
  const [name, setName] = useState(""); // Estado para el nombre ingresado

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(name); // Llama a la función onSearch con el nombre ingresado
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <label htmlFor="search" className="block mb-2 font-medium">
        Busca un Pokémon:
      </label>
      <input
        type="text"
        id="search"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ingresa el nombre del Pokémon"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Buscar Pokémon"
      />
      <button
        type="submit"
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Buscar
      </button>
    </form>
  );
};

export default BuscaPokemon;
