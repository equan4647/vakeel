import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from '../../components';
import styles from './styles';

const VehicleNumber = ({ number, style }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.text} numberOfLines={1}>
      {number}
    </Text>
  </View>
);

VehicleNumber.propTypes = {
  number: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};
VehicleNumber.defaultProps = {};

export default VehicleNumber;
