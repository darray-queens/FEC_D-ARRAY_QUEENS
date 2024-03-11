import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';

import { Row } from '../shared/containers';

const ShareRow = styled(Row)`
  margin-top: 2px;
  max-width: 100%;
`;

const ShareLink = styled.a`
  color: black;
  margin-right: 8px;
`;

const FbShareLink = styled(ShareLink)`
  &:hover {
    color: #316FF6;
    cursor: pointer;
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
    cursor: pointer;
  }
`;

function Share(props) {
  const { currentProduct, styleImage } = props;
  const twitterUrl = `https://twitter.com/intent/tweet?text=Check out the ${currentProduct.name}&url=${window.location.href}`.replace(/ /g, '%20');

  const fbShare = () => {
    window.FB.ui({
      method: 'share',
      href: window.location.href,
    }, () => {});
  };

  const pinShare = () => {
    window.PinUtils.pinOne({
      url: window.location.href,
      media: styleImage,
      description: currentProduct.description,
    });
  };

  return (
    <ShareRow>
      <FbShareLink onClick={() => fbShare()}>
        <FaFacebook />
      </FbShareLink>
      <TwShareLink href={twitterUrl} target="blank">
        <FaTwitter />
      </TwShareLink>
      <PinShareLink
        onClick={() => pinShare()}
        target="blank"
      >
        <FaPinterest />
      </PinShareLink>
    </ShareRow>
  );
}

export default Share;
