// src/components/HeroSection.jsx
import React, { useState } from 'react';
import NavArrow from './NavArrow';
import './HeroSection.css';
import leftArrowPng from '../assets/images/button-left.png';
import rightArrowPng from '../assets/images/Right-Button.png';
import DottedTriangle from './DottedTriangle';
import rightArrowHoverPng from '../assets/images/hover-button.png';

function HeroSection() {
  const [isLeftArrowHovered, setIsLeftArrowHovered] = useState(false);
  const [isRightArrowHovered, setIsRightArrowHovered] = useState(false);

  // Define what happens when the left dotted triangle is clicked
  const handleLeftDottedTriangleClick = () => {
    console.log("Left dotted line clicked!");
    // You can add your desired navigation or other actions here, e.g.:
    // window.location.href = '/left-page';
  };

  // Define what happens when the right dotted triangle is clicked
  const handleRightDottedTriangleClick = () => {
    console.log("Right dotted line clicked!");
    // You can add your desired navigation or other actions here, e.g.:
    // window.location.href = '/right-page';
  };

  return (
    <section className="hero-section">
      <NavArrow
  direction="left"
  arrowImage={leftArrowPng}
  hidden={isRightArrowHovered}  // Hide left arrow if right dotted triangle hovered
/>
   <h1
  className={`hero-headline ${
    isLeftArrowHovered
      ? 'shift-right'
      : isRightArrowHovered
      ? 'shift-left'
      : ''
  }`}
>
  Sophisticated<br />skincare
</h1>

     <NavArrow
  direction="right"
  arrowImage={rightArrowPng}
  isHovered={isRightArrowHovered}
  hoverImage={rightArrowHoverPng}
  hidden={isLeftArrowHovered}   // Hide right arrow if left dotted triangle hovered
/>

      {/* Dotted Triangles are now the interactive elements */}
      <DottedTriangle
  type="left"
  isHovered={isLeftArrowHovered}
  onHoverChange={setIsLeftArrowHovered}
  onClick={handleLeftDottedTriangleClick}
  hidden={isRightArrowHovered}
/>
<DottedTriangle
  type="right"
  isHovered={isRightArrowHovered}
  onHoverChange={setIsRightArrowHovered}
  onClick={handleRightDottedTriangleClick}
  hidden={isLeftArrowHovered}
/>
    </section>
  );
}

export default HeroSection;