import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TakeSelfieButton.css';
import SelfieImg from '../assets/images/camera-icon.png';
import HoverTextImg from '../assets/images/camera-title.png'; // ← new text image

export default function TakeSelfieButton() {
  const [showModal, setShowModal] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleAllow = async () => {
    setShowModal(false);
    setCameraOn(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access denied or failed', err);
      setCameraOn(false);
    }
  };

  const handleDeny = () => setShowModal(false);

  const handleCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'selfie.png', { type: 'image/png' });
        navigate('/loading', { state: { image: file } });
      } else {
        console.error('Failed to convert canvas to Blob.');
      }
    }, 'image/png');
  };

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  return (
    <div className="selfie-button-wrapper">
      {!cameraOn && (
        <>
          <div
            className="selfie-button-diamond"
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="square square-1" />
            <div className="square square-2" />
            <div className="square square-3" />
            <img src={SelfieImg} alt="camera icon" className="camera-icon" />
            {hovered && (
              <img src={HoverTextImg} alt="Allow A.I." className="hover-text-img" />
            )}
          </div>

          {showModal && (
            <div className="permission-modal">
              <div className="modal-label">Permission prompt</div>
              <div className="modal-title">Allow camera access?</div>
              <div className="modal-buttons">
                <button className="deny-btn" onClick={handleDeny}>Deny</button>
                <button className="allow-btn" onClick={handleAllow}>Allow</button>
              </div>
            </div>
          )}
        </>
      )}

      {cameraOn && (
        <div className="camera-preview-container">
          <video ref={videoRef} autoPlay playsInline className="camera-preview" />
          <button className="capture-button" onClick={handleCapture}>Capture</button>
        </div>
      )}
    </div>
  );
}
