import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './DemographicsPage.css';

const formatPercent = (value) => `${Math.round(value * 100)}%`;

const DemographicsPage = () => {
  const { state } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('race');
  const [data, setData] = useState(null);
  const [selectedOption, setSelectedOption] = useState({});

  useEffect(() => {
    if (state?.resultData) {
      setData(state.resultData);
      const initialSelections = Object.keys(state.resultData).reduce((acc, key) => {
        const top = Object.entries(state.resultData[key]).sort((a, b) => b[1] - a[1])[0][0];
        acc[key] = top;
        return acc;
      }, {});
      setSelectedOption(initialSelections);
    }
  }, [state]);

  if (!data) return <div>Loading data...</div>;

  const selectedData = data[selectedCategory];
  const sortedEntries = Object.entries(selectedData).sort((a, b) => b[1] - a[1]);
  const topPrediction = sortedEntries.find(([label]) => label === selectedOption[selectedCategory]) || sortedEntries[0];

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
        {/* Left panel */}
        <div className="category-selector">
          {['race', 'age', 'gender'].map((cat) => {
            const top = Object.entries(data[cat]).sort((a, b) => b[1] - a[1])[0][0];
            return (
              <button
                key={cat}
                className={`category-button ${selectedCategory === cat ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <div className="prediction-label">{top.toUpperCase()}</div>
                <div className="category-label">{cat.toUpperCase()}</div>
              </button>
            );
          })}
        </div>

        {/* Center content */}
        <div className="prediction-display">
          <h3>{topPrediction[0]}</h3>
          <div className="circle-confidence">
            <span>{formatPercent(topPrediction[1])}</span>
          </div>
          <p className="note">If A.I. estimate is wrong, select the correct one.</p>
        </div>

        {/* Right options list */}
        <div className="option-list">
          <div className="option-header">
            <span>{selectedCategory.toUpperCase()}</span>
            <span>A.I. CONFIDENCE</span>
          </div>
          <ul>
            {sortedEntries.map(([label, val]) => (
              <li
                key={label}
                className={`option-item ${label === selectedOption[selectedCategory] ? 'highlight' : ''}`}
                onClick={() => setSelectedOption((prev) => ({ ...prev, [selectedCategory]: label }))}
              >
                <span className="option-name">{label}</span>
                <span className="option-percent">{formatPercent(val)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="footer-buttons">
        <button className="back-button">BACK</button>
        <div className="action-buttons">
          <button className="reset-button">RESET</button>
          <button className="confirm-button">CONFIRM</button>
        </div>
      </footer>
    </div>
  );
};

export default DemographicsPage;
