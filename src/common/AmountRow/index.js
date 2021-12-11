import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { Text } from '../../components';
import styles from './styles';
import { AppUtil, Util } from '../../utils';

const AmountRow = ({ amount, title, style, negative }) => (
  <View style={[styles.row, style]}>
    <Text style={styles.textRegular}>{title}</Text>

    <Text style={styles.textBold}>{`${negative ? '-' : ''}${AppUtil.formatPrice(
      Util.toFixedIfNecessary(amount, 2)
    )}`}</Text>
  </View>
);

AmountRow.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  negative: PropTypes.bool,
};
AmountRow.defaultProps = {
  amount: 0,
  title: '',
  style: {},
  negative: false,
};

export default React.memo(AmountRow);
