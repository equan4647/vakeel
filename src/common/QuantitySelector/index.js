import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { ButtonView, Text } from '../../components';
import { AppStyles, Metrics } from '../../theme';
import styles from './styles';

const QuantitySelector = props => {
  const { onIncrement, onDecrement, count, isDisabled } = props;

  const opacity = isDisabled ? 0.5 : 1;
  const pointerEvents = isDisabled ? 'none' : 'auto';

  return (
    <View
      style={[AppStyles.rowAligned, { opacity }]}
      pointerEvents={pointerEvents}
    >
      <ButtonView
        hitSlop={Metrics.hitSlop}
        onPress={onDecrement}
        style={styles.counterButtonContainer}
        // disabled={count == 1}
      >
        <Text style={styles.counterButtonText}>-</Text>
      </ButtonView>

      <View style={styles.countContainer}>
        <Text type="semiBold" size="size_15">
          {count}
        </Text>
      </View>

      <ButtonView
        hitSlop={Metrics.hitSlop}
        onPress={onIncrement}
        style={styles.counterButtonContainer}
      >
        <Text style={styles.counterButtonText}>+</Text>
      </ButtonView>
    </View>
  );
};

QuantitySelector.propTypes = {
  count: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  isDisabled: PropTypes.bool,
};

QuantitySelector.defaultProps = {
  count: 1,
  onIncrement: () => {},
  onDecrement: () => {},
  isDisabled: false,
};

export default React.memo(QuantitySelector);
