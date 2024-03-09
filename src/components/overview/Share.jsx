import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';

import { Row } from '../shared/containers';

const ShareRow = styled(Row)`
  max-width: 100%;
`;

const ShareLink = styled.a`
  color: black;
  margin-right: 8px;
`;

const FbShareLink = styled(ShareLink)`
  &:hover {
    color: #316FF6;
  }
`;

const TwShareLink = styled(ShareLink)`
  &:hover {
    color: #1DA1F2;
  }
`;

const PinShareLink = styled(ShareLink)`
  &:hover {
    color: #E60023;
  }
`;

function Share(props) {
  const { currentProduct, styleImage } = props;

  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
  const twitterUrl = `http://twitter.com/share?text=check out this ${currentProduct.name}&url=${window.location.href}`.replace(/ /g, '%20');
  const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${window.location.href}&media=${styleImage}`;

  return (
    <ShareRow>
      <FbShareLink href={fbUrl} target="blank">
        <FaFacebook />
      </FbShareLink>
      <TwShareLink href={twitterUrl} target="blank">
        <FaTwitter />
      </TwShareLink>
      <PinShareLink href={pinterestUrl} target="blank">
        <FaPinterest />
      </PinShareLink>
    </ShareRow>
  );
}

export default Share;
