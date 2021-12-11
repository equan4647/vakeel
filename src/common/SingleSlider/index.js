import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import React from 'react';

import { HorizontalTitle, RangeSlider } from '../../common';
import { AppStyles } from '../../theme';
import styles from './styles';

const SingleSlider = props => {
  const { min, max, step, defaultValue, heading, rightTitle, ...rest } = props;

  return (
    <Controller
      render={({ onChange, value }) => (
        <>
          <HorizontalTitle
            title={`${heading}`}
            rightTitle={`${value || min} ${rightTitle}`}
            containerStyle={[AppStyles.horizontalTitle, styles.title]}
          />
          <RangeSlider
            min={min}
            max={max}
            step={step}
            value={value}
            onChangeSliderValue={onChange}
            isMultiple={false}
          />
        </>
      )}
      defaultValue={
        Array.isArray(defaultValue) ? defaultValue?.[0] : defaultValue
      }
      {...rest}
    />
  );
};

SingleSlider.propTypes = {
  heading: PropTypes.string.isRequired,
  rightTitle: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultValue: PropTypes.any,
};

SingleSlider.defaultProps = {
  defaultValue: '',
};

export default SingleSlider;
