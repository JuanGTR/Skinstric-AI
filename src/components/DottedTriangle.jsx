// src/components/DottedTriangle.jsx
import React from 'react';
import './DottedTriangle.css';

function DottedTriangle({ type, isHovered, onHoverChange, onClick, hidden }) {
  const triangleClassName = `
    dotted-triangle 
    dotted-triangle-${type} 
    ${isHovered ? 'dotted-triangle-hovered' : ''} 
    ${hidden ? 'dotted-triangle-hidden' : ''}
  `;

  return (
    <div
      className={triangleClassName.trim()}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onClick={onClick}
    >
      {isHovered && (
        <>
          <div className="triangle-clone offset-up-left" />
          <div className="triangle-clone offset-down-right" />
        </>
      )}
    </div>
  );
}

export default DottedTriangle;
