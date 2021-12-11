import { ViewPropTypes, StyleSheet } from 'react-native';
import React from 'react';

import { Text } from '../../components';
import styles from './styles';

const SeparatorInputs = ({ style }) => (
  <Text style={StyleSheet.flatten([styles.separatorText, style])}>-</Text>
);

SeparatorInputs.propTypes = {
  style: ViewPropTypes.style,
};
SeparatorInputs.defaultProps = { style: {} };
export default SeparatorInputs;
