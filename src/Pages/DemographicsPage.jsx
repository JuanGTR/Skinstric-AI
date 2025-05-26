import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './DemographicsPage.css';

const formatPercent = (value) => `${Math.round(value * 100)}%`;

export default function DemographicsPage() {
  const { state } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('race');
  const [data, setData] = useState(null);
  const [selectedOption, setSelectedOption] = useState({});
  // keep the original top predictions in a ref so reset can restore them
  const initialSelectionsRef = useRef({});

  useEffect(() => {
    if (state?.resultData) {
      setData(state.resultData);

      // compute top for each category
      const tops = Object.keys(state.resultData).reduce((acc, key) => {
        const topEntry = Object.entries(state.resultData[key])
          .sort((a, b) => b[1] - a[1])[0][0];
        acc[key] = topEntry;
        return acc;
      }, {});

      // store in both state and ref
      setSelectedOption(tops);
      initialSelectionsRef.current = tops;
    }
  }, [state]);

  if (!data) return <div>Loading data...</div>;

  // pull out the array for the current category
  const selectedData = data[selectedCategory];
  const sortedEntries = Object.entries(selectedData)
    .sort((a, b) => b[1] - a[1]);
  // find the selected label's entry, or fallback to the top
  const topPrediction =
    sortedEntries.find(([label]) => label === selectedOption[selectedCategory])
    || sortedEntries[0];
  const percent = topPrediction[1];

  // reset handler
  const handleReset = () => {
    setSelectedOption({ ...initialSelectionsRef.current });
  };

  return (
    <div className="demographics-page">
      <header className="header">
        <span className="skinstric-label">SKINSTRIC</span>
        <span className="analysis-link">[ ANALYSIS ]</span>
      </header>

      <div className="title-section">
        <h1 className="analysis-title">A.I. ANALYSIS</h1>
        <h2 className="demographics-title">DEMOGRAPHICS</h2>
        <p className="subtitle">PREDICTED RACE & AGE</p>
      </div>

      <div className="main-content">
        {/* Left panel: show user’s current selection */}
        <div className="category-selector">
          {['race', 'age', 'gender'].map((cat) => {
            const display = selectedOption[cat]?.toUpperCase() || '—';
            return (
              <button
                key={cat}
                className={`category-button ${selectedCategory === cat ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <div className="prediction-label">{display}</div>
                <div className="category-label">{cat.toUpperCase()}</div>
              </button>
            );
          })}
        </div>

        {/* Center prediction: based on selectedOption */}
        <div className="prediction-display">
          <h3>{topPrediction[0]}</h3>
          <div className="circle-confidence">
            <svg className="confidence-ring" viewBox="0 0 36 36">
              <path
                className="confidence-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="confidence-fill"
                strokeDasharray={`${(percent * 100).toFixed(1)}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="confidence-text">
                {formatPercent(percent)}
              </text>
            </svg>
          </div>
          <p className="note">
            If A.I. estimate is wrong, select the correct one.
          </p>
        </div>

        {/* Right option list */}
        <div className="option-list">
          <div className="option-header">
            <span>{selectedCategory.toUpperCase()}</span>
            <span>A.I. CONFIDENCE</span>
          </div>
          <ul>
            {sortedEntries.map(([label, val]) => (
              <li
                key={label}
                className={`option-item ${
                  label === selectedOption[selectedCategory] ? 'highlight' : ''
                }`}
                onClick={() =>
                  setSelectedOption((prev) => ({ ...prev, [selectedCategory]: label }))
                }
              >
                <span className="option-name">{label}</span>
                <span className="option-percent">{formatPercent(val)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="footer-buttons">
        <button className="back-button" onClick={() => window.history.back()}>
          BACK
        </button>
        <div className="action-buttons">
          <button className="reset-button" onClick={handleReset}>
            RESET
          </button>
          <button className="confirm-button">CONFIRM</button>
        </div>
      </footer>
    </div>
  );
}
