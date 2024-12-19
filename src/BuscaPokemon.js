import React, { useState } from "react";
import axios from "axios";
import './App.css';  // Importa el archivo CSS

const BuscaPokemon = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState("");

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      setPokemonData(response.data);
      setError(""); // Limpia cualquier error previo
    } catch (err) {
      setPokemonData(null);
      setError("No se encontró el Pokémon, intenta con otro nombre.");
    }
  };

  return (
    <div id="root">
      <div className="card-pokemon">
        <h2>Buscar Pokémon</h2>
        <input
          type="text"
          className="carta-input"
          placeholder="Ingresa el nombre del Pokémon"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button className="carta-button" onClick={fetchPokemon}>Buscar</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {pokemonData && (
          <>
            <h2>{pokemonData.name.toUpperCase()}</h2>
            <img className="carta-img" src={pokemonData.sprites.front_default} alt={pokemonData.name} />
            <p><strong>Altura:</strong> {pokemonData.height / 10} m</p>
            <p><strong>Peso:</strong> {pokemonData.weight / 10} kg</p>
            <p><strong>Tipos:</strong> {pokemonData.types.map((t) => t.type.name).join(", ")}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default BuscaPokemon;
