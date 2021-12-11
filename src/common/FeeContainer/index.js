import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { AppStyles } from '../../theme';
import { Text } from '../../components';
import styles from './styles';

const FeeContainer = ({ text, price, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text size="size_16" style={AppStyles.flex1}>
        {text}
      </Text>

      <Text size="size_16" type="bold">
        {price}
      </Text>
    </View>
  );
};

FeeContainer.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.any.isRequired,
};
FeeContainer.defaultProps = {};

export default FeeContainer;
