import { Marker } from 'react-native-maps';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Metrics } from '../../theme';
import styles from './styles';

const CustomMarker = ({ latitude, longitude, size }) => {
  const customStyle = { width: size, height: size, borderRadius: size / 2 };
  return (
    <Marker coordinate={{ latitude: latitude, longitude: longitude }}>
      <View style={[styles.circle, customStyle]} />
    </Marker>
  );
};

CustomMarker.propTypes = {
  latitude: PropTypes.any,
  longitude: PropTypes.any,
  size: PropTypes.number,
};
CustomMarker.defaultProps = {
  latitude: 0,
  longitude: 0,
  size: Metrics.ratio(30),
};

export default CustomMarker;
