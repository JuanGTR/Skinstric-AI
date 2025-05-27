import UploadImg from '../assets/images/gallery.png';
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
      <label htmlFor="imageUpload">
        <img
          src={UploadImg}
          alt="Upload"
          className="upload-button-image"
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
