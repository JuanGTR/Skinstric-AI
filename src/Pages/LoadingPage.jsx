// pages/LoadingPage.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Pages/LoadingPage.css';

export default function LoadingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const imageFile = state?.image;

    if (!imageFile) {
      navigate('/face-input');
      return;
    }

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result.split(',')[1]; // remove data:image/... prefix
          resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
      });
    };

    const uploadImage = async () => {
      try {
        const base64 = await convertToBase64(imageFile);

        const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64 }),
        });

        const data = await response.json();
        console.log('API response:', data);

        if (data.message?.toLowerCase().includes('successfully')) {
 setTimeout(() => {
        navigate('/analysis', { state: { resultData: data.data } });
      }, 2000);
        } else {
          console.error('API error:', data.message);
          // Optional: show error screen or retry
        }
      } catch (error) {
        console.error('Upload failed:', error);
        // Optional: navigate to error screen
      }
    };

    uploadImage();
  }, [state, navigate]);

  return (
    <div className="loading-page">
      <h2 className="loading-title">Preparing your Analysis</h2>
      <div className="diamonded-wrapper">
        <div className="diamonded spinning-diamonded" />
        <div className="diamonded-clone clone-clockwise" />
        <div className="diamonded-clone clone-counter-clockwise" />
      </div>
    </div>
  );
}
