import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from '../../components';
import styles from './styles';

const EstimatedTime = ({ time, style }) =>
  time ? (
    <View style={[styles.estimatedTime, style]}>
      <Text type="semiBold">{time}</Text>
    </View>
  ) : null;

EstimatedTime.propTypes = {
  time: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};
EstimatedTime.defaultProps = {};

export default EstimatedTime;
