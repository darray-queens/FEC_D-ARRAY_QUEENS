import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2147483647;
`;

const ModalContent = styled.div`
  background-color: white;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  padding: 20px;
  position: relative;
  z-index: 2147483647;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  z-index: 2147483647;
  &: hover {
    color: red
  }
`;

function Modal({ photo, closeModal }) {
  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={closeModal}>x</CloseButton>
        <img src={photo.url} alt={photo.id} style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </ModalContent>
    </ModalContainer>
  );
}

export default Modal;
