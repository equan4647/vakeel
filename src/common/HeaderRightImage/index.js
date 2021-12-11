import React from 'react';
import { Image, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { Metrics } from '../../theme';

const HeaderRightImage = ({ onPress, style, img, hitSlop, activeOpacity }) => (
  <TouchableOpacity {...{ onPress, style, activeOpacity, hitSlop }}>
    <Image source={img} />
  </TouchableOpacity>
);

HeaderRightImage.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  img: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hitSlop: PropTypes.object,
  activeOpacity: PropTypes.number,
};
HeaderRightImage.defaultProps = {
  hitSlop: Metrics.hitSlop2,
  activeOpacity: 0.2,
};
export default React.memo(HeaderRightImage);
