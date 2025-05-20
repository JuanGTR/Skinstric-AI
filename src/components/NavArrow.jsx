// src/components/NavArrow.jsx
import React from 'react';
import './NavArrow.css';

function NavArrow({ direction, arrowImage, hoverImage, isHovered, hidden }) {
  const className = `nav-arrow nav-arrow-${direction} ${hidden ? 'nav-arrow-hidden' : ''}`;
  
  let inlineStyle = {};
  if (direction === 'left') {
    inlineStyle = { width: '150px', height: '44px' };
  } else if (direction === 'right') {
    inlineStyle = { width: '127px', height: '44px' };
  }

  return (
    <div className={className} style={inlineStyle}>
      <img
        src={isHovered && hoverImage ? hoverImage : arrowImage}
        alt={`${direction} arrow`}
        className={`arrow-icon ${isHovered ? 'arrow-icon-hovered' : ''}`}
      />
    </div>
  );
}

export default NavArrow;
