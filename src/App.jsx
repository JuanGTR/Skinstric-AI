// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import InputPage from './Pages/InputPage';
import FaceInputPage from './Pages/FaceInputPage';
import LoadingPage from './Pages/LoadingPage';
import AnalysisPage from './Pages/AnalysisPage';
import ResultsPage from './Pages/ResultsPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/face-input" element={<FaceInputPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/results" element={<ResultsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
