import PropTypes from 'prop-types';
import React from 'react';

import { DATE_PICKER_TYPE } from '../../config/Constants';
import { DataHandler, AppUtil } from '../../utils';
import { TextInput } from '..';

const DatePickerInput = props => {
  const { mode, yearAdd, startFrom, extraProps, isPresent, ...rest } = props;

  const formatValue = date => {
    if (date !== '') {
      return AppUtil.getFormattedDate(date, mode);
    }
    return date;
  };

  const onInputPress = (onDateSelected, selectedDate) => {
    if (mode === DATE_PICKER_TYPE.DATE || mode === DATE_PICKER_TYPE.TIME) {
      DataHandler.getDatePickerModalRef().show({
        mode: mode,
        date: selectedDate,
        onSelected: onDateSelected,
        extraProps,
      });
    }

    if (mode === DATE_PICKER_TYPE.YEAR_MONTH) {
      DataHandler.getMonthYearPickerModalRef().show({
        date: selectedDate,
        onSelected: onDateSelected,
        extraProps,
      });
    }

    if (mode === DATE_PICKER_TYPE.YEAR) {
      const yearsData = AppUtil.generateYears(yearAdd, startFrom);
      const selectedItem =
        selectedDate === '' ? {} : { id: Number(selectedDate) };
      DataHandler.getDropDownModalRef().show({
        onItemSelected: item => {
          onDateSelected(item.id);
        },
        data: yearsData,
        idKey: 'id',
        titleKey: 'id',
        selectedItem: selectedItem,
        title: 'Year',
        hideSearch: true,
      });
    }
  };

  const inputProps =
    mode === DATE_PICKER_TYPE.YEAR || isPresent
      ? {}
      : { formatValue: formatValue };

  return <TextInput {...rest} {...inputProps} onPress={onInputPress} />;
};

DatePickerInput.propTypes = {
  mode: PropTypes.string,
  defaultValue: PropTypes.string,
  yearAdd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isPresent: PropTypes.bool,
};
DatePickerInput.defaultProps = {
  mode: DATE_PICKER_TYPE.DATE,
  defaultValue: '',
  yearAdd: 0,
  isPresent: false,
};

export default DatePickerInput;
