// src/components/Diamond.jsx
import React from 'react';
import './Diamond.css';

function Diamond({ type, isHovered, onHoverChange, onClick, hidden }) {
  const diamondClassName = `
    diamond
    diamond-${type}
    ${isHovered ? 'diamond-hovered' : ''}
    ${hidden ? 'diamond-hidden' : ''}
  `;

  return (
    <div
      className={diamondClassName.trim()}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onClick={onClick}
    >
      {isHovered && (
        <>
          {/* Renamed clones for clarity based on their intended rotation */}
          <div className="diamond-clone clone-counter-clockwise" />
          <div className="diamond-clone clone-clockwise" />
        </>
      )}
    </div>
  );
}

export default Diamond;