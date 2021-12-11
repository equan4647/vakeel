// @flow
import { ActivityIndicator, View, ViewPropTypes } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Colors, AppStyles } from '../../theme';

const LoaderViewApi = ({ style, size, animating }) => (
  <View style={[AppStyles.container, AppStyles.alignCenterView, style]}>
    <ActivityIndicator {...{ size, animating }} color={Colors.primary} />
  </View>
);

LoaderViewApi.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.oneOf(['small', 'large']),
  animating: PropTypes.bool,
};

LoaderViewApi.defaultProps = { size: 'large', animating: true };

export default LoaderViewApi;
