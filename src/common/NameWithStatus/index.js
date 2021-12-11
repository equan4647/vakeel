import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from '../../components';
import { OrderStatusTag } from '..';
import styles from './styles';

const NameWithStatus = ({ name, status, style }) => (
  <View style={[styles.nameContainer, style]}>
    <Text type="semiBold" size="size_16">
      {name}
    </Text>
    <OrderStatusTag status={status} />
  </View>
);

NameWithStatus.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};
NameWithStatus.defaultProps = { style: {} };

export default NameWithStatus;
