import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadButton from '../components/UploadButton';
import TakeSelfieButton from '../components/TakeSelfieButton';
import IconButton from '../components/IconButton'; // ✅ NEW
import './FaceInputPage.css';

export default function FaceInputPage() {
  const navigate = useNavigate();

  const handleImageSelected = (file) => {
    console.log('Image selected:', file);
    navigate('/loading', { state: { image: file } });
  };

  return (
    <div className="face-page-container">
      {/* ——— Inline Header ——— */}
      <header className="face-header">
        <div className="header-left-group">
          <span className="logo">SKINSTRIC</span>
          <nav className="main-nav">
            <ul>
              <li>
                <a href="#" className="nav-item-intro">
                  [ INTRO ]
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ——— Main Content ——— */}
      <main className="face-main">
        <h3 className="face-title">TO START ANALYSIS</h3>
        <div className="face-buttons">
          <TakeSelfieButton />
          <UploadButton onImageSelected={handleImageSelected} />
        </div>
      </main>

      {/* ——— Back Button with Custom Component ——— */}
      <div className="face-back-button">
        <IconButton label="BACK" onClick={() => navigate('/')} />
      </div>
    </div>
  );
}
