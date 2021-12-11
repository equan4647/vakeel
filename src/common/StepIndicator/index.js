import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import _ from 'lodash';

import styles from './styles';
import { AppStyles, Colors } from '../../theme';

const Circle = ({ _color }) => (
  <View style={StyleSheet.flatten([styles.circle, _color])} />
);

const Line = ({ _color }) => (
  <View style={StyleSheet.flatten([styles.line, _color])} />
);

const Step = props => {
  const { activeStep, index } = props;
  const isRemaining = index >= activeStep;
  const _color = {
    backgroundColor: isRemaining ? Colors.lightBlueGrey : Colors.primary,
  };
  return (
    <>
      {index > 0 ? <Line {...{ _color, ...props }} /> : null}
      <Circle {...{ _color, ...props }} />
    </>
  );
};

const StepIndicator = props => {
  const { stepCount, style, activeStep } = props;
  if (activeStep < 0) {
    return null;
  }
  return (
    <View style={[AppStyles.rowAligned, style]}>
      {_.range(stepCount).map((__, index) => (
        <Step {...{ index, activeStep }} key={index} />
      ))}
    </View>
  );
};

StepIndicator.propTypes = {
  stepCount: PropTypes.number,
  activeStep: PropTypes.number,
  style: ViewPropTypes.style,
};
StepIndicator.defaultProps = {
  stepCount: 4,
  activeStep: 1,
};
export default StepIndicator;
