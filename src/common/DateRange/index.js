import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import {
  SeparatorInputs,
  DatePickerInput,
  HorizontalTitle,
} from '../../common';
import { Text, ButtonView, Image } from '../../components';
import { strings } from '../../utils/i18n';
import { AppStyles, Metrics, Images } from '../../theme';
import styles from './styles';
import { PRESENT } from '../../config/Constants';
import { Util } from '../../utils';
import { useWatch } from 'react-hook-form';

const DateRange = props => {
  // const props
  const {
    heading,
    isFilter,
    leftInputProps,
    rightInputProps,
    containerStyle,
    separatorStyle,
    isEmptySeparator,
    presentCheckboxTitle,
  } = props;

  const [isPresent, setIsPresent] = React.useState(
    rightInputProps.defaultValue === PRESENT
  );

  // const leftDefaultDate = Util.isEmpty(leftInputProps.defaultValue)
  //   ? ''
  //   : new Date(leftInputProps.defaultValue);
  // const rightDefaultDate = Util.isEmpty(rightInputProps.defaultValue)
  //   ? ''
  //   : new Date(rightInputProps.defaultValue);

  // const [leftDateRange, setLeftDateRange] = React.useState(leftDefaultDate);
  // const [rightDateRange, setRightDateRange] = React.useState(rightDefaultDate);

  const leftDateRange = useWatch({
    control: leftInputProps.control,
    name: leftInputProps.name,
    defaultValue: leftInputProps.defaultValue,
  });

  const rightDateRange = useWatch({
    control: rightInputProps.control,
    name: rightInputProps.name,
    defaultValue: rightInputProps.defaultValue,
  });

  // const rightDateRange = new Date(rightDateRangeWatcher);
  // const leftDateRange = new Date(leftDateRangeWatcher);

  // console.log('leftInputProps D', leftDateRangeWatcher);
  // console.log('rightInputProps D', rightDateRangeWatcher);

  // set filter props for inputs
  const filterProps = isFilter
    ? {
        title: strings('app.date'),
        textAlign: 'center',
        arrowDown: false,
        showTitle: false,
      }
    : {};

  // render heading
  const renderHeading = () => {
    if (heading) {
      return (
        <HorizontalTitle
          title={`${heading}`}
          containerStyle={AppStyles.horizontalTitle}
        />
      );
    }
    return null;
  };

  const { setValue } = rightInputProps.control;
  const disableRightInputs = isPresent
    ? { disablePress: true, isPresent: true }
    : {};

  return (
    <>
      {presentCheckboxTitle ? (
        <ButtonView
          onPress={() => {
            if (isPresent) {
              setValue(rightInputProps.name, '');
              setIsPresent(false);
            } else {
              setValue(rightInputProps.name, 'Present');
              setIsPresent(true);
            }
          }}
          hitSlop={Metrics.hitSlop}
          style={styles.checkboxContainer}
        >
          <Image
            source={isPresent ? Images.icons.check2 : Images.icons.uncheck2}
          />
          <Text style={styles.checkText} type="medium">
            {presentCheckboxTitle}
          </Text>
        </ButtonView>
      ) : null}

      <View style={containerStyle}>
        {renderHeading()}
        <View style={styles.container}>
          <DatePickerInput
            {...filterProps}
            {...leftInputProps}
            extraProps={{
              ...leftInputProps.extraProps,
              maximumDate: rightDateRange
                ? new Date(rightDateRange)
                : new Date(),
            }}
          />
          {isEmptySeparator ? (
            <View style={styles.emptySeparator} />
          ) : (
            <SeparatorInputs style={separatorStyle} />
          )}
          <DatePickerInput
            {...filterProps}
            {...rightInputProps}
            {...disableRightInputs}
            extraProps={{
              minimumDate: leftDateRange ? new Date(leftDateRange) : '',
              ...rightInputProps.extraProps,
            }}
          />
        </View>
      </View>
    </>
  );
};

DateRange.propTypes = {
  heading: PropTypes.string,
  leftInputProps: PropTypes.object.isRequired,
  rightInputProps: PropTypes.object.isRequired,
  isFilter: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  separatorStyle: ViewPropTypes.style,
  isEmptySeparator: PropTypes.bool,
  setValue: PropTypes.func,
  presentCheckboxTitle: PropTypes.string,
};
DateRange.defaultProps = {
  heading: '',
  isFilter: false,
  containerStyle: {},
  isEmptySeparator: false,
  setValue: undefined,
  presentCheckboxTitle: '',
};

export default DateRange;
