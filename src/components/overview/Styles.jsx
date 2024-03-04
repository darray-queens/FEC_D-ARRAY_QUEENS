import React from 'react';
import { Row, Col } from './containers';

function Styles(props) {
  const { currentStyles } = props;

  const currentStyleText = `Style > ${currentStyles[0].name}`;

  return (
    <Row>
      <h5>{currentStyleText}</h5>
      {currentStyles.map((style) => (
        <Col key={style.style_id}>
          <img alt={style.name} src={style.photos[0].thumbnail_url} width="30px" height="30px" />
        </Col>
      ))}
    </Row>
  );
}

export default Styles;
