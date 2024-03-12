import React from 'react';
import styled from 'styled-components';
import { Grid, Row, Col } from '../shared/containers';

const StylesRow = styled(Row)`
  width: 100%;
  justify-content: left;
  align-content: space-between;
`;

const StyleBreadcrumb = styled.h5`
  text-transform: uppercase;
  font-weight: 300;
  margin-left: 8px;
`;

const StyleButton = styled.button`
  background: none;
  background-color: none;
  margin-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  padding: none;
  border: none;
  border-radius: 50%;
  border-color: black;
  height: 55px;
  width: 55px;
  border: solid;
  border-width: 1px;
  background-size: cover;
  &:hover {
    cursor: pointer;
  }
`;

const SelectedStyle = styled.div`
  position: absolute;
  background: black;
  border-radius: 50%;
  color: white;
  height: 15px;
  width: 15px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  font-size: 8px;
  line-height: 15px;
  transform: translateX(43px) translateY(-68px);
`;

function Styles({
  currentStyles,
  currentStyle,
  changeStyle,
  changeMainImageIndex,
  mainImageIndex,
}) {
  const handleStyleChange = (selectedStyle) => {
    if (selectedStyle.name !== currentStyle.name) {
      changeStyle(selectedStyle);
      if (!selectedStyle.photos[mainImageIndex]) {
        changeMainImageIndex(0);
      }
    }
  };

  return (
    <Grid>
      <Row>
        <h5>{'STYLE > '}</h5>
        <StyleBreadcrumb>{currentStyle.name}</StyleBreadcrumb>
      </Row>
      <StylesRow>
        {currentStyles.map((style) => (
          <Col key={style.style_id}>
            <StyleButton
              type="button"
              name="style-button"
              style={{ backgroundImage: `url(${style.photos[0].thumbnail_url})` }}
              onClick={() => handleStyleChange(style)}
            />
            {currentStyle.name === style.name && <SelectedStyle>&#10003;</SelectedStyle>}
          </Col>
        ))}
      </StylesRow>
    </Grid>
  );
}

export default Styles;
