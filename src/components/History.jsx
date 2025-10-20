import React from "react";

export default function History({ history }) {
  return (
    <div className="history-list">
      <h3>History</h3>
      {history.length === 0 ? (
        <p className="muted">No history yet.</p>
      ) : (
        <ul>
          {history.map((p) => (
            <li key={`${p.id}-${p.name}`}>
              <img src={p.image} alt={p.name} />
              <div className='h-poke-name'>
                <strong>{p.name}</strong> <span>#{p.id}</span>
                <p className="types">Types: {p.types.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}