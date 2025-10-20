import React from "react";

export default function Pokemon({ pokemon, isLoading, error, addToBan }) {
  const renderPills = (items) =>
    items.map((it) => (
      <button key={it} onClick={() => addToBan(it)} className="pill">
        {it}
      </button>
    ));

  return (
    <div className="pokemon-card">
      {error && <div className="error">{error}</div>}
      {!pokemon && !isLoading && !error && (
        <div className="placeholder">No Pokémon displayed yet.</div>
      )}

      {pokemon && (
        <div className="pokemon-content">
          <div className="pokemon-image-container">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="pokemon-image"
            />
          </div>
          <div className="pokemon-info">
            <h2>
              {pokemon.name} <span>#{pokemon.id}</span>
            </h2>
            <div className="section">
              <strong>Types:</strong>
              <div className="pills">{renderPills(pokemon.types)}</div>
            </div>
            <div className="section">
              <strong>Abilities:</strong>
              <div className="pills">{renderPills(pokemon.abilities)}</div>
            </div>
            <p>
              <strong>Base XP:</strong> {pokemon.baseExperience}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}