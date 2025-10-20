import React from "react";

export default function BanList({ banList, removeFromBan }) {
  return (
    <div className="ban-list">
      <h3>Ban List</h3>
      {banList.length === 0 ? (
        <p className="muted">No banned attributes yet.</p>
      ) : (
        <div className="banned-items">
          {banList.map((item) => (
            <span
              key={item}
              className="banned-pill"
              onClick={() => removeFromBan(item)}
            >
              {item}
            </span>
          ))}
        </div>
      )}
      <p className="hint">
        Pokemon with banned types or abilities won't be shown again.
      </p>
    </div>
  );
}