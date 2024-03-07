import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from '../shared/containers';

function Styles({
  currentStyles,
  currentStyle,
  changeStyle,
  changeMainImage,
}) {
  const currentStyleText = `Style > ${currentStyle.name}`;

  const handleStyleChange = (selectedStyle) => {
    if (selectedStyle.name !== currentStyle.name) {
      changeStyle(selectedStyle);
      changeMainImage(selectedStyle.photos[0].url);
    }
  };

  return (
    <Grid>
      <Row><h5>{currentStyleText}</h5></Row>
      <StylesRow>
        {currentStyles.map((style) => (
          <StylesCol key={style.style_id}>
            <button type="button" name="style-button" onClick={() => handleStyleChange(style)}>
              <img
                alt={style.name}
                src={style.photos[0].thumbnail_url}
                width="50px"
                height="50px"
              />
            </button>
          </StylesCol>
        ))}
      </StylesRow>
    </Grid>
  );
}

const StylesCol = styled(Col)`
  flex-basis: 25%;
`;

const StylesRow = styled(Row)`
  justify-content: flex-start;
`;

export default Styles;
