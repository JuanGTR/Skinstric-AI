// src/components/DottedTriangle.jsx (no change needed here)
import React from 'react';
import './DottedTriangle.css';

function DottedTriangle({ type }) {
  // Styles for positioning will be entirely in CSS now
  return (
    <div className={`dotted-triangle dotted-triangle-${type}`}></div>
  );
}

export default DottedTriangle;