import React, { useImperativeHandle, useState } from 'react';
import MonthPicker from 'react-native-month-year-picker';

import { DATE_PICKER_TYPE } from '../../config/Constants';
import { Util, AppUtil } from '../../utils';
import Modal from 'react-native-modal';
import { View, Platform } from 'react-native';

const MonthYearPickerModal = (props, forwardedRef) => {
  //set default state
  const [modalInfo, setInfo] = useState({
    onSelected: undefined,
    isVisiable: false,
    date: '',
    extraProps: {},
  });

  // hide modal function
  const hideDatePicker = () => {
    setInfo({ ...modalInfo, isVisiable: false });
  };

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: data => {
      const { extraProps, ...rest } = modalInfo;
      setInfo({
        ...rest,
        extraProps: data.extraProps ?? {},
        ...data,
        isVisiable: true,
      });
    },
  }));

  // handle date select click
  const onValueChange = React.useCallback(
    (event, newDate) => {
      //const selectedDate = newDate;

      hideDatePicker(false);

      if (newDate) {
        // format date
        const formattedDate = Util.formatDate2(
          newDate,
          AppUtil.getDateFormat(DATE_PICKER_TYPE.YEAR_MONTH)
        );

        if (modalInfo.onSelected) {
          // call onSelected
          modalInfo.onSelected(formattedDate);
        }
      }
    },
    [modalInfo]
  );

  // set selected date when popup open
  const currentDate = Util.stringToDateObject(
    modalInfo.date,
    AppUtil.getDateFormat(DATE_PICKER_TYPE.YEAR_MONTH)
  );

  const renderMonthPicker = () => {
    return (
      <MonthPicker
        onChange={onValueChange}
        value={currentDate}
        {...modalInfo.extraProps}
      />
    );
  };

  const renderModal = () => {
    return (
      <Modal
        style={{
          margin: 0,
        }}
        backdropOpacity={0.4}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={modalInfo.isVisiable}
        onBackdropPress={hideDatePicker}
      >
        {renderMonthPicker()}
      </Modal>
    );
  };

  if (modalInfo.isVisiable) {
    return (
      <View>{Platform.OS === 'ios' ? renderModal() : renderMonthPicker()}</View>
    );
  }
};
export default React.forwardRef(MonthYearPickerModal);
