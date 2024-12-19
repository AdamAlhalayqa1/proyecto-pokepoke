import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (!search) return;
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      const data = await response.json();
      setPokemon({
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        height: data.height / 10,
        weight: data.weight / 10,
        types: data.types.map((type) => type.type.name),
      });
    } catch (error) {
      alert("Pokémon no encontrado. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="app">
      <div className="main-content">
        <h1>Los Pokemones</h1>
        <div className="carta-container">
          <h2>Buscar Pokémon</h2>
          <input
            type="text"
            className="carta-input"
            placeholder="Ingresa el nombre del Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="carta-button" onClick={handleSearch}>
            Buscar
          </button>
        </div>

        {pokemon && (
  <div className="card-pokemon">
    <h2>{pokemon.name.toUpperCase()}</h2>
    <img
      src={pokemon.image}
      alt={`Imagen de ${pokemon.name}`}
      className="carta-img"
    />
    <p><strong>Altura:</strong> {pokemon.height} m</p>
    <p><strong>Peso:</strong> {pokemon.weight} kg</p>
    <p><strong>Tipos:</strong> {pokemon.types.join(", ")}</p>
  </div>
)}


        <a
          href="https://bulbapedia.bulbagarden.net/"
          target="_blank"
          className="pokemon-link"
        >
          Aprende más sobre Pokémon
        </a>
      </div>
    </div>
  );
};

export default App;
