import React from 'react';
import styled from 'styled-components';
import { Row, Col } from '../shared/containers';

function Styles(props) {
  const { currentStyles } = props;

  const currentStyleText = `Style > ${currentStyles[0].name}`;

  return (
    <Row>
      <h5>{currentStyleText}</h5>
      {currentStyles.map((style) => (
        <StylesCol key={style.style_id}>
          <img alt={style.name} src={style.photos[0].thumbnail_url} width="30px" height="30px" />
        </StylesCol>
      ))}
    </Row>
  );
}

const StylesCol = styled(Col)`
  flex-basis: 25%;
`;

export default Styles;
