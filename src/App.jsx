import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FooterText from './components/FooterText';
import DottedTriangle from './components/DottedTriangle';
import './index.css'; // Global styles

function App() {
  return (
    <div className="app-container">
      <Header />
      <HeroSection />
      <FooterText />

      {/* Dotted Triangles - still positioned absolutely relative to app-container */}
      <DottedTriangle type="left" />
      <DottedTriangle type="right" />
    </div>
  );
}

export default App;