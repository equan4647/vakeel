import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { Images } from '../../theme';

const HeaderBackImage = ({ style, isCross, ...rest }) => (
  <Image
    source={isCross ? Images.icons.cross : Images.icons.backImage}
    style={StyleSheet.flatten([style, isCross ? styles.cross : styles.image])}
    {...rest}
  />
);

HeaderBackImage.propTypes = {
  isCross: PropTypes.bool,
  style: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
};

HeaderBackImage.defaultProps = {
  isCross: false,
  style: {},
};
export default React.memo(HeaderBackImage);
