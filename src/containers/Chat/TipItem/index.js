import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { Text } from '../../../components';
import { strings } from '../../../utils/i18n';
import styles from './styles';

const TipItem = ({ amount }) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {strings('app.tipItemText')}
      {amount}
    </Text>
  </View>
);

TipItem.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TipItem.defaultProps = { amount: 0 };

export default React.memo(TipItem);
