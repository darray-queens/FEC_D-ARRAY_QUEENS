import React, { useState } from 'react';
import ImageModal from './ImageModal';

function AnswerItem({
  answerData, markAnswerAsHelpful, reportAnswer, reportedAnswers, photos,
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

  console.log('photos', photos)
  return (
    <>
      <div className="answer-item">
        <p>
          <strong>
            A:
          </strong>
          {answerData.body}
        </p>
        {/* <div className="answer-thumbnails">
          {photos.map((photo, index) => (
            <AnswerItem
              key={index}
              answerData={answerData}
              markAnswerAsHelpful={markAnswerAsHelpful}
              reportAnswer={reportAnswer}
              reportedAnswers={reportedAnswers}
              photos={photos} // Pass down the photos prop
            />
          ))}
        </div>
        {isModalOpen && (
          <ImageModal image={selectedImage} onClose={() => setIsModalOpen(false)} />
        )} */}
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
    </>
  );
}

export default AnswerItem;
