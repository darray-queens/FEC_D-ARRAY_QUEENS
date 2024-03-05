import React from 'react';

// window.location.href

/**
 * <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">
 * Tweet
 * </a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
 */

function Share(props) {
  const { currentProduct, styleImage } = props;

  const fbShareLink = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
  const twitterShareLink = `http://twitter.com/share?text=check out this ${currentProduct.name}&url=${window.location.href}`.replace(/ /g, '%20');
  const pinterestShareLink = `https://www.pinterest.com/pin/create/button/?url=${window.location.href}&media=${styleImage}`;

  return (
    <div>
      <a href={fbShareLink} target="blank">
        <button type="button" name="Facebook">
          <img alt="Share to Facebook" src="https://cdn0.iconfinder.com/data/icons/social-network-24/512/Facebook-512.png" width="15px" />
        </button>
      </a>
      <a href={twitterShareLink} target="blank">
        <button type="button" name="Pinterest">
          <img alt="Share to Pinterest" src="https://cdn1.iconfinder.com/data/icons/free-social-media-4/32/pinterest_social_Media_Logo_share-512.png" width="15px" />
        </button>
      </a>
      <a href={pinterestShareLink} target="blank">
        <button type="button" name="Twitter">
          <img alt="Share to Twitter" src="https://cdn4.iconfinder.com/data/icons/viiva-social-media/32/twitter-512.png" width="15px" />
        </button>
      </a>
    </div>
  );
}

export default Share;
