import React, { useState } from "react";
import axios from "axios";
import './App.css';

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
    <div style={{ textAlign: "center", marginTop: "20px", padding: "20px" }}>
      <div className="card-pokemon">
        <h2>Buscar Pokémon</h2>
        <input
          type="text"
          placeholder="Ingresa el nombre del Pokémon"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={fetchPokemon}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#ffcc00",
            borderRadius: "5px",
            border: "none",
            color: "white"
          }}
        >
          Buscar
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {pokemonData && (
          <>
            <div className="pokemon-info" style={{ marginTop: "20px", animation: "fadeIn 0.5s" }}>
              <h2>{pokemonData.name.toUpperCase()}</h2>
              <img src={pokemonData.sprites.front_default} alt={pokemonData.name} loading="lazy" style={{ width: "150px", borderRadius: "50%" }} />
              <p><strong>Altura:</strong> {pokemonData.height / 10} m</p>
              <p><strong>Peso:</strong> {pokemonData.weight / 10} kg</p>
              <p><strong>Tipos:</strong> {pokemonData.types.map((t) => t.type.name).join(", ")}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuscaPokemon;

