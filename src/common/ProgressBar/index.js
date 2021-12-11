import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import React from 'react';

import { Metrics, Colors } from '../../theme';
import styles from './styles';

const ProgressBar = props => {
  const { progress, width, style } = props;

  return (
    <View style={styles.sliderContainer}>
      <Progress.Bar
        unfilledColor={Colors.springGreen}
        color={Colors.frogGreen85}
        {...{ progress, width, style }}
        height={Metrics.ratio(10)}
        borderWidth={0}
        borderRadius={Metrics.ratio(14.5)}
      />
    </View>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
  width: PropTypes.number,
  style: ViewPropTypes.style,
};

ProgressBar.defaultProps = {
  progress: 0.5,
  width: Metrics.screenWidth - Metrics.ratio(40),
};

export default ProgressBar;
