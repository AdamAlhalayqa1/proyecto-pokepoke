import React, { useState } from 'react';
import { getPokemon } from './api';
import './App.css';

const CartaPokemon = () => {
    const [pokemon, setPokemon] = useState(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = await getPokemon(name.toLowerCase());
            if (data) {
                setPokemon(data);
            } else {
                setError('Pokémon not found');
            }
        } catch (err) {
            setError('An error occurred while fetching the Pokémon');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <h1 className="text-2xl font-bold p-4">Pokédex</h1>
            <form onSubmit={handleSearch} className="p-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Busca un Pokémon"
                    className="w-full px-3 py-2 border rounded-md"
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                    Buscar
                </button>
            </form>
            {loading && <p className="p-4">Cargando...</p>}
            {error && <p className="p-4 text-red-500">{error}</p>}
            {pokemon && (
                <div className="p-4">
                    <h2 className="text-2xl font-bold">{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto" />
                    <p>Altura: {pokemon.height}</p>
                    <p>Peso: {pokemon.weight}</p>
                    <p>Tipos: {pokemon.types.map(type => type.type.name).join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default CartaPokemon;

