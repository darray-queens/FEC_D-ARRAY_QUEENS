import React from 'react';
import styled from 'styled-components';
import RelatedProductsList from './relatedProducts/RelatedProductsList';
import OutfitsList from './outfits/OutfitsList';
import { Grid, Row, Col } from '../shared/containers';

const StyledGrid = styled(Grid)`
width: 95%;
`;

function RelatedProductsContainer({ currentProduct, setProductId }) {
  return (
    <StyledGrid>
      <Row width={100}>
        <Col>
          <RelatedProductsList currentProduct={currentProduct} setProductId={setProductId} />
        </Col>
      </Row>
      <Row width={100}>
        <Col>
          <OutfitsList currentProduct={currentProduct} />
        </Col>
      </Row>
    </StyledGrid>
  );
}

export default RelatedProductsContainer;
