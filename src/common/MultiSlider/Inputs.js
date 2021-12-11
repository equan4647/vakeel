import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { SeparatorInputs } from '../../common';
import { Colors, AppStyles } from '../../theme';
import { strings } from '../../utils/i18n';
import { Util } from '../../utils';
import styles from './styles';

const CustomTextInput = ({
  value,
  min,
  max,
  plusSign,
  onBlurInput,
  formatNumber,
  clearWithFocus,
  isRangeSlider,
  placeholder = '',
}) => {
  // set store state
  const [inputValue, setInputValue] = useState(value);
  const [lastValue, setLastValue] = useState(value);
  const [lastValueProp, setLastValueProp] = useState(value);
  const [focus, setFocus] = useState(false);

  if (value !== lastValueProp) {
    setInputValue(value);
    setLastValueProp(value);
  }

  const showPlusSign = plusSign && inputValue === max;

  const inputValueString =
    focus || formatNumber === false
      ? inputValue.toString()
      : `${Util.formatNumberToLocal(inputValue)}${showPlusSign ? '+' : ''}`;

  const customStyle = focus ? { borderColor: Colors.primary } : {};

  return (
    <TextInput
      style={[AppStyles.inputContainerFilter, customStyle]}
      placeholderTextColor={Colors.placeholder}
      keyboardType="number-pad"
      value={inputValueString}
      onChangeText={val => {
        setInputValue(val);
      }}
      onFocus={() => {
        if (clearWithFocus) {
          setInputValue('');
        }
        setLastValue(inputValue);
        setFocus(true);
      }}
      onBlur={() => {
        let finalValue = String(inputValue === '' ? lastValue : inputValue);
        if (finalValue !== '') {
          finalValue = finalValue.replace(/[^0-9]/g, '');
        }

        finalValue = Math.floor(Number(finalValue?.replace(',', '')));
        if (finalValue < min && min !== '') {
          finalValue = min;
        }
        if (finalValue > max && max !== '') {
          finalValue = max;
        }

        if (isRangeSlider === false && finalValue == 0) {
          finalValue = '';
        }

        setInputValue(finalValue);
        onBlurInput(finalValue);
        setFocus(false);
      }}
      placeholder={placeholder}
      returnKeyType="done"
    />
  );
};

const Inputs = props => {
  const {
    min,
    max,
    maxPlus,
    onChangeInputValue,
    value,
    formatNumber,
    clearWithFocus,
    isRangeSlider,
  } = props;
  const inputValues = Util.isEmpty(value)
    ? isRangeSlider
      ? [min, max]
      : ['', '']
    : value;
  return (
    <View style={styles.textInputsContainer}>
      <CustomTextInput
        //value=""
        value={inputValues[0]}
        min={min}
        max={inputValues[1]}
        placeholder={isRangeSlider ? '' : strings('app.min')}
        plusSign={false}
        isRangeSlider={isRangeSlider}
        onBlurInput={newMin => {
          onChangeInputValue([newMin, inputValues[1]]);
        }}
        formatNumber={formatNumber}
        clearWithFocus={clearWithFocus}
      />
      <SeparatorInputs />
      <CustomTextInput
        //value=""
        value={inputValues[1]}
        min={inputValues[0]}
        max={max}
        placeholder={isRangeSlider ? '' : strings('app.max')}
        isRangeSlider={isRangeSlider}
        plusSign={maxPlus}
        onBlurInput={newMax => {
          onChangeInputValue([inputValues[0], newMax]);
        }}
        formatNumber={formatNumber}
        clearWithFocus={clearWithFocus}
      />
    </View>
  );
};

Inputs.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  maxPlus: PropTypes.bool.isRequired,
  value: PropTypes.array.isRequired,
  onChangeInputValue: PropTypes.func.isRequired,
  formatNumber: PropTypes.bool.isRequired,
  clearWithFocus: PropTypes.bool.isRequired,
  isRangeSlider: PropTypes.bool,
};

Inputs.defaultProps = { maxPlus: false, isRangeSlider: true };

export default Inputs;
