import './TakeSelfieButton.css';
import SelfieImg from '../assets/images/camera.png'; // Replace with actual path

export default function TakeSelfieButton() {
  const handleClick = () => {
    console.log('Selfie button clicked');
    // Later: Open camera or handle selfie capture logic
  };

  return (
    <div className="selfie-button-wrapper">
      <img
        src={SelfieImg}
        alt="Take a Selfie"
        className="selfie-button-image"
        onClick={handleClick}
      />
    </div>
  );
}
