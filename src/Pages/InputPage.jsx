// src/pages/InputPage.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function InputPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const locationInputRef = useRef(null);
  const navigate = useNavigate();

  // Validation
  const isValidName = (str) => /^[a-zA-Z\s]{2,}$/.test(str.trim());
  const isValidLocation = (str) => /^[a-zA-Z\s,]{2,}$/.test(str.trim());

  const handleNameSubmit = () => {
    if (!isValidName(name)) {
      setError('Please enter a valid name (letters and spaces only).');
      return;
    }
    setError('');
    setStep(2);
    setTimeout(() => locationInputRef.current?.focus(), 100);
  };

  const handleFormSubmit = async () => {
    if (!isValidLocation(location)) {
      setError('Please enter a valid location (letters, commas, spaces only).');
      return;
    }

    setError('');

    // Save to localStorage
    localStorage.setItem('userName', name.trim());
    localStorage.setItem('userLocation', location.trim());

    // Send to API
    try {
      const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), location: location.trim() })
      });

      const result = await response.json();

      if (result.success) {
        navigate('/photo-upload'); // Next page route
      } else {
        setError(result.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again later.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      step === 1 ? handleNameSubmit() : handleFormSubmit();
    }
  };

  const handleBackClick = () => {
    navigate('/'); // Landing page or previous route
  };

  return (
    <div className="input-page">
      <div className="input-header">
        <button className="back-button" onClick={handleBackClick}>
          ◁ BACK
        </button>
      </div>

      <div className="input-container">
        <p className="input-instruction">Click to type</p>

        {step === 1 ? (
          <input
            type="text"
            placeholder="Introduce Yourself"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
            className="input-field"
          />
        ) : (
          <input
            ref={locationInputRef}
            type="text"
            placeholder="Where Are You From?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyPress}
            className="input-field"
          />
        )}

        {error && <p className="error-message">{error}</p>}

        <button
          className="proceed-button"
          onClick={step === 1 ? handleNameSubmit : handleFormSubmit}
        >
          Proceed →
        </button>
      </div>
    </div>
  );
}

export default InputPage;
