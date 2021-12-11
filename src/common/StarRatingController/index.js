import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

import { StarRating } from '../../common';
import { strings } from '../../utils/i18n';
import { useInputProps } from '../../utils/CustomHooks';

const StarRatingController = props => {
  const { size, type, defaultValue, style, ...rest } = props;

  //   const ratingProps = useInputProps(formObj, 'rating');

  return (
    <Controller
      //   control={ratingProps.control}
      //   name={ratingProps.name}
      render={({ onChange, value }) => (
        <StarRating
          style={style}
          title={strings('app.rating_required')}
          onPress={onChange}
          rating={value}
          size={size}
          type={type}
          {...rest}
        />
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

StarRatingController.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
  defaultValue: PropTypes.array,
};

StarRatingController.defaultProps = {
  maxPlus: false,
  defaultValue: [],
  formatNumber: true,
  clearWithFocus: false,
  isRangeSlider: true,
};

export default StarRatingController;
