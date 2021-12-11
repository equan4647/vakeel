import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from '../../components';
import styles from './styles';

const LargeHeader = ({ title, style }) => (
  <Text style={[styles.text, style]}>{title}</Text>
);

LargeHeader.propTypes = {
  title: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};
LargeHeader.defaultProps = { style: {} };

export default React.memo(LargeHeader, () => {
  return true;
});
