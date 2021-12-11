import React from 'react';
import { View, ViewPropTypes } from 'react-native';

import styles from './styles';

const Separator = ({ style }) => (
  <View style={[styles.separatorStyle, style]} />
);

Separator.propTypes = {
  style: ViewPropTypes.style,
};

export default React.memo(Separator);
