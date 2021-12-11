import PropTypes from 'prop-types';
import React from 'react';

import { ImageViewHttpBackground } from '../../components';
import { Metrics } from '../../theme';

import styles from './styles';

const ParallaxImage = ({ url }) => {
  return (
    <ImageViewHttpBackground
      url={url}
      width={Metrics.screenWidth}
      height={Metrics.imagesSwiperHeight}
      containerStyle={styles.imageStyle}
    />
  );
};

ParallaxImage.propTypes = {
  url: PropTypes.any.isRequired,
};
ParallaxImage.defaultProps = {};

export default React.memo(ParallaxImage, (prevProps, nextProps) => {
  return prevProps.url === nextProps.url;
});

//export default ParallaxImage;
