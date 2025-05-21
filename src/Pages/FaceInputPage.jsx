// pages/FaceInputPage.jsx
import Header from '../components/Header';
import UploadButton from '../components/UploadButton';
import TakeSelfieButton from '../components/TakeSelfieButton'; 
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';


export default function FaceInputPage() {
  const handleImageSelected = (file) => {
    console.log('Image selected:', file);
    // Later: convert to base64 and send to API
  };

  return (
    <div className="page">
      <Header />

      <div className="main-content">
        <h3 
          className="title"
          style={{ position: 'absolute', left: '2%', top: '5%',  }}
        >
          to start analysis
        </h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20rem', marginTop: '4rem' }}>
          <TakeSelfieButton />
          <UploadButton onImageSelected={handleImageSelected} />
        </div>
      </div>

      <BackButton />
    </div>
  );
}

