// src/pages/LandingPage.jsx
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FooterText from '../components/FooterText';

export default function LandingPage() {
  return (
    <div className="app-container">
      <Header />
      <HeroSection />
      <FooterText />
    </div>
  );
}
