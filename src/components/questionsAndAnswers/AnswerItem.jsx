import React, { useState } from 'react';
import ImageModal from './ImageModal';
import './styles.css';

function AnswerItem({
  answerData, markAnswerAsHelpful, reportAnswer, reportedAnswers,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <div className="answer-item">
        <p>
          <strong>
            A:
          </strong>
          {answerData.body}
        </p>
        <div className="answer-item" />
        {isModalOpen && (
          <ImageModal image={selectedImage} onClose={() => setIsModalOpen(false)} />
        )}
      </div>
      <div className="picture">
        {answerData.photos && answerData.photos.map((photoUrl, index) => (
          <img key={index} src={photoUrl} alt="Thumbnail" onClick={() => openImageModal(photoUrl)} style={{ width: 100, cursor: 'pointer', margin: '5px' }} />
        ))}
      </div>
      <div className="answerInfo">
        by
        {' '}
        {answerData.answerer_name === 'Seller' ? <b>Seller</b> : answerData.answerer_name}
        ,
        {' '}
        {formatDate(answerData.date)}
        {'  |  '}
        <a className="link" onClick={() => markAnswerAsHelpful(answerData.id)}>
          Helpful? Yes(
          {answerData.helpfulness}
          )
        </a>
        {' | '}
        {reportedAnswers.has(answerData.id) ? (
          <span>Reported</span>
        ) : (
          <a className="link" onClick={() => reportAnswer(answerData.id)}>Report</a>
        )}
      </div>
      {isModalOpen && (
        <ImageModal image={selectedImage} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default AnswerItem;
