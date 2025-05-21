import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import './InputField.css';
import ProceedButton from '../assets/images/proceed-button.png'; // Ensure this path is correct
import Diamond from './Diamond';

const nameRegex = /^[A-Za-z\s'-]+$/;
const locationRegex = /^[A-Za-z\s'-]+$/;

export default function InputField() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [showErrorOnSubmit, setShowErrorOnSubmit] = useState(false); // New state for error visibility
  const [isHovered, setIsHovered] = useState(false);

  // State to track if location has been typed
  const [locationTyped, setLocationTyped] = useState(false);

  // Effect to update locationTyped state
  useEffect(() => {
    setLocationTyped(location.trim().length > 0);
  }, [location]);

  const handleProceed = async () => {
    setShowErrorOnSubmit(true); // Attempting to proceed, so show errors if they exist

    if (step === 1) {
      if (!nameRegex.test(name.trim())) {
        setError('Please enter a valid name (letters only).');
        return;
      }
      setStep(2);
      setError(''); // Clear error after successful name validation
      setShowErrorOnSubmit(false); // Reset error visibility for the next step
    } else { // step === 2
      if (!locationRegex.test(location.trim())) {
        setError('Please enter a valid location (letters only).');
        return;
      }

      try {
        const res = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, location }),
        });
        const data = await res.json();
        console.log(data);

        if (data.success) {
          localStorage.setItem('skinstricUser', JSON.stringify({ name, location }));
          // Redirect to next page here if needed
          setError(''); // Clear error on success
          setShowErrorOnSubmit(false); // Reset error visibility
          // window.location.href = '/next-page'; // Example redirect
        } else {
          setError(data.message || 'Submission failed.');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong.');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleProceed();
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setError(''); // Clear error when going back
      setShowErrorOnSubmit(false); // Reset error visibility
    }
    // No action if already on step 1 (or you can navigate away)
  };

  return (
    <div className="input-container">
      {/* "TO START ANALYSIS" text */}
      <p className="to-start-analysis">TO START ANALYSIS</p>

      {/* The dotted background */}
       <Diamond 
       type="primary"
      isHovered={isHovered}
      onHoverChange={setIsHovered}
      hidden={false}
      />

      {/* "CLICK TO TYPE" text */}
      <p className="click-to-type">CLICK TO TYPE</p>

      {/* The main input field */}
      <input
        type="text"
         onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        placeholder={step === 1 ? 'Introduce Yourself' : 'Enter Your Location'}
        value={step === 1 ? name : location}
        onChange={(e) => {
          if (step === 1) {
            setName(e.target.value);
          } else {
            setLocation(e.target.value);
          }
          // Clear error instantly as user starts typing again
          setError('');
          setShowErrorOnSubmit(false);
        }}
        onKeyDown={handleKeyPress}
        className="input-field"
        autoFocus
      />

      {/* Error message - only show if error state exists AND showErrorOnSubmit is true */}
      {error && showErrorOnSubmit && <p className="error-text">{error}</p>}

      {/* Back Button - Always visible as per new instructions */}
      <BackButton onClick={handleBack} className="back-button" /> 
      

      {/* Right Proceed Button - Conditionally show based on location input on step 2 */}
      {(step === 1 || (step === 2 && locationTyped)) && (
        <img
          src={ProceedButton} // Ensure this path is correct
          alt="Proceed"
          className="proceed-button"
          onClick={handleProceed}
        />
      )}
    </div>
  );
}