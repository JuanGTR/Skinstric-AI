import { useNavigate } from 'react-router-dom';
import './AnalysisPage.css';

export default function AnalysisPage() {
  const navigate = useNavigate();

  const handleNavigate = (section) => {
    if (section === 'Demographics') {
      navigate('/results'); // Update this if needed
    } else {
      alert(`${section} button clicked — functionality coming soon`);
    }
  };

  return (
    <div className="analysis-page">
      {/* Inline Header */}
      <div className="inline-header">
        <h1 className="header-logo-text">skinstric</h1>
        <span className="header-annotation">[analysis]</span>
      </div>

      <h2 className="analysis-title">A.I Analysis</h2>
      <p className="analysis-subtitle">
        AI has estimated the following. Fix estimated information if needed.
      </p>

      <div className="dotted-square" />

      <div className="diamond-button-container">
        <div className="diamond-button" onClick={() => handleNavigate('Demographics')}>
          <span>Demographics</span>
        </div>
        <div className="diamond-button" onClick={() => handleNavigate('Skin Type Details')}>
          <span>Skin Type Details</span>
        </div>
        <div className="diamond-button" onClick={() => handleNavigate('Weather')}>
          <span>Weather</span>
        </div>
        <div className="diamond-button" onClick={() => handleNavigate('Cosmetic Concerns')}>
          <span>Cosmetic Concerns</span>
        </div>
      </div>

      <div className="footer-buttons">
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={() => alert('Get Summary clicked')}>Get Summary</button>
      </div>
    </div>
  );
}
