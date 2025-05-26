// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import leftArrowPng from '../assets/images/button-left.png';
import rightArrowPng from '../assets/images/Right-Button.png';
import rightArrowHoverPng from '../assets/images/hover-button.png';

export default function LandingPage() {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const navigate = useNavigate();

  const onLeftClick = () => {
    console.log('Left dotted triangle clicked');
  };
  const onRightClick = () => {
    navigate('/input');
  };

  return (
    <div className="landing-container">
      {/* ====== Header ====== */}
      <header className="header">
        <div className="header-left-group">
          <span className="logo">SKINSTRIC</span>
          <nav>
            <ul className="main-nav">
              <li>
                <a href="#" className="nav-item-intro">
                  [ INTRO ]
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <button className="enter-code-button">ENTER CODE</button>
      </header>

      {/* ====== Hero ====== */}
      <section className="hero-section">
        {/* Left arrow */}
        <img
          src={leftArrowPng}
          alt="Left"
          className={`nav-arrow left ${isRightHovered ? 'hidden' : ''}`}
        />

        {/* Headline */}
        <h1
          className={`hero-headline ${
            isLeftHovered ? 'shift-right' : isRightHovered ? 'shift-left' : ''
          }`}
        >
          Sophisticated
          <br />
          skincare
        </h1>

        {/* Right arrow */}
        <img
          src={isRightHovered ? rightArrowHoverPng : rightArrowPng}
          alt="Right"
          className={`nav-arrow right ${isLeftHovered ? 'hidden' : ''}`}
          onClick={onRightClick}
        />

        {/* Left dotted triangle */}
        <div
          className={`dotted-triangle dotted-triangle-left ${
            isLeftHovered ? 'dotted-triangle-hovered' : ''
          } ${isRightHovered ? 'dotted-triangle-hidden' : ''}`}
          onMouseEnter={() => setIsLeftHovered(true)}
          onMouseLeave={() => setIsLeftHovered(false)}
          onClick={onLeftClick}
        >
          {isLeftHovered && (
            <>
              <div className="triangle-clone offset-up-left" />
              <div className="triangle-clone offset-down-right" />
            </>
          )}
        </div>

        {/* Right dotted triangle */}
        <div
          className={`dotted-triangle dotted-triangle-right ${
            isRightHovered ? 'dotted-triangle-hovered' : ''
          } ${isLeftHovered ? 'dotted-triangle-hidden' : ''}`}
          onMouseEnter={() => setIsRightHovered(true)}
          onMouseLeave={() => setIsRightHovered(false)}
          onClick={onRightClick}
        >
          {isRightHovered && (
            <>
              <div className="triangle-clone offset-up-left" />
              <div className="triangle-clone offset-down-right" />
            </>
          )}
        </div>
      </section>

      {/* ====== Footer ====== */}
      <div className="footer-text-container">
        <p className="footer-text-content">
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES
          <br />
          A HIGHLY-PERSONALISED ROUTINE TAILORED TO
          <br />
          WHAT YOUR SKIN NEEDS.
        </p>
      </div>
    </div>
  );
}
