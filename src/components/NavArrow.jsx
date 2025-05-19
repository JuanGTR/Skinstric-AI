import React from 'react';
import './NavArrow.css';

function NavArrow({ direction, arrowImage }) {
  // No more 'text' prop as it's part of the PNG
  const className = `nav-arrow nav-arrow-${direction}`;
  let inlineStyle = {}; // Not using inline styles for absolute positioning anymore
  if (direction === 'left') {
    // These are now the dimensions of the PNG itself
    inlineStyle = { width: '150px', height: '44px' };
  } else if (direction === 'right') {
    inlineStyle = { width: '127px', height: '44px' };
  }

  return (
    <div className={className} style={inlineStyle}>
      <img src={arrowImage} alt={`${direction} arrow`} className="arrow-icon" />
    </div>
  );
}

export default NavArrow;