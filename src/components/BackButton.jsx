// src/components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/images/back-button.png';
import './BackButton.css';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="back-button" onClick={() => navigate('/')}>
      <img src={backIcon} alt="Back" />
    
    </div>
  );
}
