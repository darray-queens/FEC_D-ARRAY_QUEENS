import React from 'react';

function ImageModal({ image, onClose }) {
  return (
    <div className="modal-overlay-image" onClick={onClose}>
      <div className="image-modal" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Full size" />
        <button type="button" className="close-modal" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default ImageModal;
