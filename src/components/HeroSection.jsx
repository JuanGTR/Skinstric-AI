import React from 'react';
import NavArrow from './NavArrow';
import './HeroSection.css';
import leftArrowPng from '../assets/images/Left-Button.png';
import rightArrowPng from '../assets/images/Right-Button.png';

function HeroSection() {
  return (
    <section className="hero-section">
      <NavArrow direction="left" arrowImage={leftArrowPng} />
      <h1 className="hero-headline">
        Sophisticated<br />skincare
      </h1>
      <NavArrow direction="right" arrowImage={rightArrowPng} />
    </section>
  );
}

export default HeroSection;