import React, { useState } from "react";
import BuscaPokemon from "./BuscaPokemon"; // Importar el componente BuscaPokemon

const CartaPokemon = () => {
  const [pokemon, setPokemon] = useState(null); // Estado para el Pokémon
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(""); // Estado de error

  // Función para buscar Pokémon
  const fetchPokemonData = async (name) => {
    if (!name.trim()) {
      setError("Por favor, ingresa el nombre de un Pokémon.");
      return;
    }

    try {
      setLoading(true);
      setError(""); // Limpia mensajes de error previos
      setPokemon(null); // Limpia datos anteriores

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("No se encontró el Pokémon.");
      }

      const data = await response.json();

      setPokemon({
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        height: (data.height / 10).toFixed(2), // Conversión a metros
        weight: (data.weight / 10).toFixed(2), // Conversión a kilogramos
        types: data.types.map((type) => type.type.name),
      });
    } catch (err) {
      setError(err.message || "Error al buscar el Pokémon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <h1 className="text-3xl font-bold text-center py-4">Pokédex</h1>

      {/* Renderiza BuscaPokemon y pasa la función fetchPokemonData como prop */}
      <BuscaPokemon onSearch={fetchPokemonData} />

      {/* Estado de carga */}
      {loading && (
        <p className="text-center py-4 text-blue-500 font-medium">
          Cargando información...
        </p>
      )}

      {/* Mensaje de error */}
      {error && (
        <p className="text-center py-4 text-red-500 font-medium">{error}</p>
      )}

      {/* Resultado de la búsqueda */}
      {pokemon && (
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {pokemon.name.toUpperCase()}
          </h2>
          <img
            src={pokemon.image}
            alt={`Imagen de ${pokemon.name}`}
            className="mx-auto my-4 rounded-lg"
          />
          <p className="text-gray-700">
            <strong>Altura:</strong> {pokemon.height} m
          </p>
          <p className="text-gray-700">
            <strong>Peso:</strong> {pokemon.weight} kg
          </p>
          <p className="text-gray-700">
            <strong>Tipos:</strong> {pokemon.types.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default CartaPokemon;
