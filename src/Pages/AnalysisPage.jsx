import { useNavigate, useLocation } from 'react-router-dom';
import './AnalysisPage.css';
import IconButton from '../components/IconButton';

export default function AnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation(); // capture incoming state

  const handleNavigate = (section) => {
    if (section === 'Demographics') {
      navigate('/results', { state: location.state }); // pass resultData forward
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
        AI has estimated the following. <br />Fix estimated information if needed.
      </p>
      <div className="dotted-container">
      <div className="dotted-square" />
      <div className="dotted-square-two" />
      <div className="dotted-square-three" />
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
    </div>

      <div className="footer-buttons">
       <IconButton label="BACK" onClick={() => navigate(-1)}/>
      <IconButton label="GET SUMMARY" onClick={() => alert('Get Summary clicked')}/>
      </div>
    </div>
  );
}
