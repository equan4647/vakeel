import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { Text } from '../../components';
import styles from './styles';

const Badge = ({ count, style, showActualCount }) =>
  count > 0 ? (
    <View style={[styles.circle, style]}>
      <Text style={styles.text}>
        {!showActualCount && count >= 100 ? '99+' : count}
      </Text>
    </View>
  ) : null;

Badge.propTypes = {
  count: PropTypes.number,
  style: ViewPropTypes.style,
  showActualCount: PropTypes.bool,
};
Badge.defaultProps = { showActualCount: true };
export default Badge;
