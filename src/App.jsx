import React, { useState } from "react";
import "./App.css";
import Pokemon from "./components/Pokemon";
import BanList from "./components/BanList";
import History from "./components/History";

const MAX_POKEMON_ID = 1010;
const MAX_ATTEMPTS = 25;

export default function App() {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  function hasBannedAttribute(pokeObj) {
    if (!pokeObj) return false;
    for (const t of pokeObj.types) {
      if (banList.includes(t)) return true;
    }
    for (const a of pokeObj.abilities) {
      if (banList.includes(a)) return true;
    }
    return false;
  }

  function addToBan(value) {
    setBanList((prev) => (prev.includes(value) ? prev : [...prev, value]));
    if (pokemon) {
      const contains = pokemon.types.includes(value) || pokemon.abilities.includes(value);
      if (contains) setPokemon(null);
    }
  }

  function removeFromBan(value) {
    setBanList((prev) => prev.filter((v) => v !== value));
  }

  async function fetchRandomPokemon() {
    setError("");
    setIsLoading(true);
    try {
      let attempts = 0;
      let found = null;

      while (attempts < MAX_ATTEMPTS && !found) {
        attempts += 1;
        const id = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) continue;

        const data = await res.json();
        const pokemonData = {
          id: data.id,
          name: data.name,
          image:
            data.sprites.other.home.front_default ||
            data.sprites.front_default,
          types: data.types.map((t) => t.type.name),
          abilities: data.abilities.map((a) => a.ability.name),
          baseExperience: data.base_experience ?? "N/A",
        };

        if (!hasBannedAttribute(pokemonData)) found = pokemonData;
      }

      if (!found) {
        setError(
          `No available Pokémon found outside your ban list after ${MAX_ATTEMPTS} attempts.`
        );
        setPokemon(null);
      } else {
        setPokemon(found);
        setHistory((prev) => [found, ...prev]);
      }
    } catch {
      setError("Error fetching Pokémon.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>PokeDiscover (PokeAPI)</h1>
        <p>
          Click <b>Discover</b> to fetch a random Pokemon. Click a{" "}
          <em>Type</em> or <em>Ability</em> to ban it. Click a ban item to
          remove it.
        </p>
        <button
          onClick={fetchRandomPokemon}
          disabled={isLoading}
          className="discover-btn"
        >
          {isLoading ? "Discovering..." : "Discover"}
        </button>
      </header>

      <div className="main-grid">
        <Pokemon
          pokemon={pokemon}
          isLoading={isLoading}
          error={error}
          addToBan={addToBan}
        />
        <div className="side-panels">
          <BanList banList={banList} removeFromBan={removeFromBan} />
          <History history={history} />
        </div>
      </div>
    </div>
  );
}