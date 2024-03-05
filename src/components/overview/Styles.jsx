import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from '../shared/containers';

function Styles({ currentStyles, changeStyle }) {
  const currentStyleText = `Style > ${currentStyles[0].name}`;

  return (
    <Grid>
      <Row><h5>{currentStyleText}</h5></Row>
      <StylesRow>
        {currentStyles.map((style) => (
          <StylesCol key={style.style_id}>
            <button type="button" name="style-button" onClick={() => changeStyle(style)}>
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
