import React, { useState } from 'react';
import { getPokemon } from './api';
import './App.css';


const CartaPokemon = () => {
    const [pokemon, setPokemon] = useState(null);
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        const data = await getPokemon(query.toLowerCase());
        setPokemon(data);
    };

    return (
        <div>
            <h1>Pokédex</h1>
            <input
                type="text"
                placeholder="Busca un Pokémon"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
            {pokemon && (
                <div>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p>Peso: {pokemon.weight}</p>
                    <p>Altura: {pokemon.height}</p>
                </div>
            )}
        </div>
    );
};

export default CartaPokemon;
