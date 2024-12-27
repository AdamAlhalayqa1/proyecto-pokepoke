import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css";
import Login from "./components/Login";
import BuscaPokemon from "./components/BuscaPokemon";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Header from "./components/Header"; // Importación del Header

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) {
      setError("Por favor, ingresa el nombre de un Pokémon.");
      return;
    }
    try {
      setError("");
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Pokémon no encontrado");
      }

      const data = await response.json();
      setPokemon({
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        height: data.height / 10,
        weight: data.weight / 10,
        types: data.types.map((type) => type.type.name),
        abilities: data.abilities.map((ability) => ability.ability.name),
        stats: data.stats.map((stat) => ({
          name: stat.stat.name,
          base: stat.base_stat
        }))
      });
    } catch (error) {
      setError("Pokémon no encontrado. Inténtalo de nuevo.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="app">
      <Header user={user} handleLogout={handleLogout} /> {/* Agregado el Header */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-content">
              {/* Componente de búsqueda */}
              <div className="search-section">
                <h2>Pokédex</h2>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Ingresa el nombre del Pokémon"
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress} /* Aquí añadimos el evento */
                  />
                  <button onClick={handleSearch} className="search-button">
                    Buscar
                  </button>
                </div>
                {error && <p className="error-message">{error}</p>}
              </div>

              {/* Resultado del Pokémon */}
              {pokemon && (
                <div className="card-container">
                  <div className="card-pokemon">
                    <h2>{pokemon.name.toUpperCase()}</h2>
                    <img
                      src={pokemon.image}
                      alt={`Imagen de ${pokemon.name}`}
                      className="carta-img"
                    />
                    <p>
                      <strong>Altura:</strong> {pokemon.height} m
                    </p>
                    <p>
                      <strong>Peso:</strong> {pokemon.weight} kg
                    </p>
                    <p>
                      <strong>Tipos:</strong> {pokemon.types.join(", ")}
                    </p>
                    <p>
                      <strong>Habilidades:</strong> {pokemon.abilities.join(", ")}
                    </p>
                    <h3>Estadísticas</h3>
                    <ul className="pokemon-stats">
                      {pokemon.stats.map((stat) => (
                        <li key={stat.name}>
                          <strong>{stat.name}:</strong> {stat.base}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          }
        />
        
        <Route path="/buscar" element={<BuscaPokemon />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {location.pathname !== "/login" && <Footer />}
    </div>
  );
};

export default App;
