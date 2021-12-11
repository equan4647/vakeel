import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

import { HorizontalTitle, RangeSlider } from '../../common';
import { AppStyles } from '../../theme';
import Inputs from './Inputs';

const MultiSlider = props => {
  const {
    min,
    max,
    step,
    defaultValue,
    title,
    maxPlus,
    formatNumber,
    clearWithFocus,
    isRangeSlider,
    ...rest
  } = props;

  return (
    <Controller
      render={({ onChange, value }) => (
        <>
          <HorizontalTitle
            title={`${title}`}
            containerStyle={AppStyles.horizontalTitle}
          />
          <Inputs
            {...{
              min,
              max,
              value,
              maxPlus,
              clearWithFocus,
              formatNumber,
              isRangeSlider,
            }}
            onChangeInputValue={onChange}
          />
          {isRangeSlider && (
            <RangeSlider
              {...{ min, max, step, value }}
              onChangeSliderValue={onChange}
            />
          )}
        </>
      )}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

/*
<RangeSlider
            min={min}
            max={max}
            step={step}
            value={value}
            onChangeSliderValue={onChange}
          />
*/

MultiSlider.propTypes = {
  title: PropTypes.string.isRequired,
  step: PropTypes.number,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultValue: PropTypes.array,
  maxPlus: PropTypes.bool,
  formatNumber: PropTypes.bool,
  clearWithFocus: PropTypes.bool,
  isRangeSlider: PropTypes.bool,
};

MultiSlider.defaultProps = {
  maxPlus: false,
  defaultValue: [],
  formatNumber: true,
  clearWithFocus: false,
  isRangeSlider: true,
};

export default MultiSlider;
