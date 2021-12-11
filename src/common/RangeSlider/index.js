import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Metrics, Images } from '../../theme';
import { Image } from '../../components';
import { Util } from '../../utils';
import styles from './styles';

const RangeSlider = props => {
  const { onChangeSliderValue, value, min, max, step, isMultiple } = props;

  // silder thumb
  const customSliderThumb = () => <Image source={Images.icons.sliderThumb} />;

  const sliderValue = isMultiple
    ? Util.isEmpty(value)
      ? [min, max]
      : value
    : value === null || value === ''
    ? [min]
    : [value];

  return (
    <View style={styles.sliderContainer}>
      <MultiSlider
        values={sliderValue}
        sliderLength={Metrics.screenWidth - Metrics.ratio(60)}
        onValuesChange={onChangeSliderValue}
        {...{ min, max, step }}
        allowOverlap
        snapped
        selectedStyle={styles.selectedTrackStyle}
        unselectedStyle={styles.unselectedTrackStyle}
        trackStyle={styles.trackStyle}
        touchDimensions={{
          height: Metrics.ratio(40),
          width: Metrics.ratio(40),
          borderRadius: Metrics.ratio(20),
          slipDisplacement: Metrics.ratio(40),
        }}
        customMarker={customSliderThumb}
      />
    </View>
  );
};

RangeSlider.propTypes = {
  step: PropTypes.number,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.any.isRequired,
  onChangeSliderValue: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool,
};

RangeSlider.defaultProps = { maxPlus: false, isMultiple: true };

export default RangeSlider;
