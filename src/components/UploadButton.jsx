import UploadImg from '../assets/images/gallery-icon.png';
import TitleGalleryImg from '../assets/images/title-gallery.png'; // your hover text image
import '../components/UploadButton.css';

export default function UploadButton({ onImageSelected }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && onImageSelected) {
      onImageSelected(file);
    }
  };

  return (
    <div className="upload-button-wrapper">
      <label htmlFor="imageUpload" className="upload-button-diamond">
        <div className="square square-1"></div>
        <div className="square square-2"></div>
        <div className="square square-3"></div>
        <img src={UploadImg} alt="Upload" className="upload-icon" />
        
        {/* Hover text image inside label */}
        <img
          src={TitleGalleryImg}
          alt="Gallery Title"
          className="upload-hover-text"
        />
      </label>

      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleChange}
        className="upload-input-hidden"
      />
    </div>
  );
}
