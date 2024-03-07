const scrollButtonClick = (mod, direction) => {
  const container = mod;
  if (direction === 'left') {
    container.scrollLeft -= 310;
  } else {
    container.scrollLeft += 310;
  }
};

export default scrollButtonClick;
