const galleryHandlers = {
  handleNextThumb: (maxIndex, lastIndex, count) => (
    maxIndex !== count - 1 ? lastIndex + 1 : lastIndex
  ),

  handlePrevThumb: (minIndex, lastIndex) => (
    minIndex !== 0 ? lastIndex - 1 : minIndex
  ),

  handleNextMain: (index, lastIndex, count) => (
    index >= count - 1 ? 0 : lastIndex + 1
  ),

  handlePrevMain: (index, lastIndex, count) => (
    index <= 0 ? count - 1 : lastIndex - 1
  ),

  handleZoom: (isZoomed, handler) => {
    const galleryModal = document.getElementById('modal-main-image');

    if (!isZoomed) {
      galleryModal.addEventListener('mousemove', handler);
      return true;
    }

    galleryModal.removeEventListener('mousemove', handler);
    return false;
  },

  onMovement: (event) => {
    const modal = document.getElementById('modal-main-image');
    const modalWidth = modal.clientWidth;
    const modalHeight = modal.clientHeight;

    const changeX = Math.round((event.offsetX / modalWidth) * 100);
    const changeY = Math.round((event.offsetY / modalHeight) * 100);

    modal.style.backgroundPosition = `left ${changeX}% top ${changeY}%`;
  },
};

export default galleryHandlers;
