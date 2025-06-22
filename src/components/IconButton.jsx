import React, { useState } from 'react';
import './IconButton.css';

import shrunk from '../assets/images/buttin-icon-shrunk.png';
import expanded from '../assets/images/button-icon-expanded.png';
import shrunkRight from '../assets/images/buttin-icon-shrunk-right.png';
import expandedRight from '../assets/images/button-icon-expanded-right.png';

const IconButton = ({ label = 'BACK', onClick }) => {
  const [hovered, setHovered] = useState(false);
  const isBack = label.toUpperCase() === 'BACK';

  const currentImage = isBack
    ? hovered ? expanded : shrunk
    : hovered ? expandedRight : shrunkRight;

  const isExpanded = hovered;

 return (
  <div
    className="icon-button"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={onClick}
  >
    {isBack ? (
      <>
        <img
          src={currentImage}
          alt={label}
          className={`icon-button-img ${isExpanded ? 'expanded' : ''}`}
        />
        <span className={`icon-label ${hovered ? 'hovered' : ''}`}>{label}</span>
      </>
    ) : (
      <>
        <span className={`icon-label ${hovered ? 'hovered' : ''}`}>{label}</span>
        <img
          src={currentImage}
          alt={label}
          className={`icon-button-img ${isExpanded ? 'expanded' : ''}`}
        />
      </>
    )}
  </div>
  );
};

export default IconButton;
