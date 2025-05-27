import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import proceedImg from '../assets/images/proceed-button.png';
import backImg from '../assets/images/back-button.png';
import './InputPage.css';

const nameRegex = /^[A-Za-z\s'-]+$/;
const locationRegex = /^[A-Za-z\s'-]+$/;

export default function InputPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [showErrorOnSubmit, setShowErrorOnSubmit] = useState(false);
  const [locationTyped, setLocationTyped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLocationTyped(location.trim().length > 0);
  }, [location]);

  const handleProceed = async () => {
    setShowErrorOnSubmit(true);
    if (step === 1) {
      if (!nameRegex.test(name.trim())) {
        setError('Please enter a valid name (letters only).');
        return;
      }
      setStep(2);
      setError('');
      setShowErrorOnSubmit(false);
    } else {
      if (!locationRegex.test(location.trim())) {
        setError('Please enter a valid location (letters only).');
        return;
      }
      try {
        const res = await fetch(
          'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, location }),
          }
        );
        const data = await res.json();
        if (data.success) {
          localStorage.setItem(
            'skinstricUser',
            JSON.stringify({ name, location })
          );
          navigate('/face-input');
        } else {
          setError(data.message || 'Submission failed.');
        }
      } catch {
        setError('Something went wrong.');
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setError('');
      setShowErrorOnSubmit(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="input-page-container">
      <header className="input-page-header">
        <div className="input-page-header-left-group">
          <span className="input-page-logo">SKINSTRIC</span>
          <nav className="input-page-main-nav">
            <ul>
              <li>
                <a href="#" className="input-page-nav-item-intro">
                  [ INTRO ]
                </a>
              </li>
            </ul>
          </nav>
        </div>
       
      </header>

      <div className="input-page-form-container">
        <p className="input-page-to-start-analysis">
          TO START ANALYSIS
        </p>

        {/* Diamond with always-on clones */}
        <div className="input-page-diamond">
          <div className="input-page-diamond-clone input-page-clone-counter-clockwise" />
          <div className="input-page-diamond-clone input-page-clone-clockwise" />
        </div>

        <p className="input-page-click-to-type">
          CLICK TO TYPE
        </p>

        <input
          className="input-page-input-field"
          type="text"
          placeholder={
            step === 1 ? 'Introduce Yourself' : 'Enter Your Location'
          }
          value={step === 1 ? name : location}
          onChange={(e) => {
            step === 1
              ? setName(e.target.value)
              : setLocation(e.target.value);
            setError('');
            setShowErrorOnSubmit(false);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleProceed()}
          autoFocus
        />

        {error && showErrorOnSubmit && (
          <p className="input-page-error-text">{error}</p>
        )}

        <div className="input-page-button-row">
          <div
            className="input-page-back-button"
            onClick={handleBack}
          >
            <img src={backImg} alt="Back" />
          </div>

          {(step === 1 || (step === 2 && locationTyped)) && (
            <img
              src={proceedImg}
              alt="Proceed"
              className="input-page-proceed-button"
              onClick={handleProceed}
            />
          )}
        </div>
      </div>
    </div>
  );
}