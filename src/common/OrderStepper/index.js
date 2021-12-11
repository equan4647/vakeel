import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';

import styles from './styles';
import { AppStyles } from '../../theme';
import { StepIndicator } from '..';
import { Text } from '../../components';

const Description = React.memo(({ info, time }) => (
  <View style={AppStyles.spreadRow}>
    <Text style={styles.bottomTextLeft}>{info}</Text>

    <Text type="bold" size="size_16">
      {time}
    </Text>
  </View>
));

const OrderStepper = props => {
  const { activeStep, stepCount, containerStyle, title } = props;

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>{title}</Text>

      <StepIndicator
        {...{ activeStep, stepCount }}
        style={styles.stepIndicator}
      />

      <Description {...props} />
    </View>
  );
};

OrderStepper.propTypes = {
  activeStep: PropTypes.number,
  stepCount: PropTypes.number,
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string,
  info: PropTypes.string,
  time: PropTypes.string,
};

OrderStepper.defaultProps = {
  activeStep: 1,
  stepCount: 3,
  title: '',
  info: '',
  time: '',
};

export default OrderStepper;
