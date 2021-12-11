import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const BottomButtonContainer = ({ children, style }) => (
  <View style={[styles.container, style]}>{children}</View>
);

BottomButtonContainer.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node,
};
BottomButtonContainer.defaultProps = {};

export default React.memo(BottomButtonContainer);
