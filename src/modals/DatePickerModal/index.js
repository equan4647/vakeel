import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, { useImperativeHandle, useState } from 'react';

import { DATE_PICKER_TYPE } from '../../config/Constants';
import { Util, AppUtil } from '../../utils';

const DatePickerModal = (props, forwardedRef) => {
  //set default state
  const [modalInfo, setInfo] = useState({
    mode: DATE_PICKER_TYPE.DATE,
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
      setInfo({ ...rest, extraProps: {}, ...data, isVisiable: true });
    },
  }));

  // handle date select click
  const handleConfirm = date => {
    // hide datepicker
    hideDatePicker();

    // check onSelected
    if (modalInfo.onSelected) {
      // format date
      const formattedDate = Util.formatDate2(
        date,
        AppUtil.getDateFormat(modalInfo.mode)
      );

      // call onSelected
      modalInfo.onSelected(formattedDate);
    }
  };

  // set selected date when popup open
  const currentDate = Util.stringToDateObject(
    modalInfo.date,
    AppUtil.getDateFormat(modalInfo.mode)
  );

  // main render
  return (
    <DateTimePickerModal
      isVisible={modalInfo.isVisiable}
      mode={modalInfo.mode}
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      date={currentDate}
      display="spinner"
      {...modalInfo.extraProps}
    />
  );
};
export default React.forwardRef(DatePickerModal);
