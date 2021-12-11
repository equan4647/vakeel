import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AppStyles, Colors, Metrics } from '../../theme';
import { Text } from '../../components';
import { IQKeyboardManager, ValidationUtil } from '../../utils';
import { strings } from '../../utils/i18n';
import { useInputProps } from '../../utils/CustomHooks';
import { BottomButton, DisplayPaymentMethod, TextInput } from '../../common';
import styles from './styles';

const Content = () => {
  const initialValues = { tip: '' };
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.setPrice),
    defaultValues: initialValues,
  });

  useEffect(() => {
    IQKeyboardManager.setEnable(false);
    return () => IQKeyboardManager.setEnable(true);
  }, []);

  const tipProps = useInputProps(formObj, 'tip');
  //submit
  const submit = formObj.handleSubmit(() => {
    Keyboard.dismiss();
  });

  return (
    <>
      <TextInput
        title={strings('app.enter_tip_amount')}
        renderLeft={() => <Text style={AppStyles.leftInputTextStyle}>$</Text>}
        onSubmit={submit}
        keyboardType="numeric"
        {...tipProps}
      />
      <DisplayPaymentMethod
        card_number="**** **** **** 6356"
        editTextColor={Colors.black}
        barOnTop={false}
        titleContainerStyle={{ marginTop: Metrics.ratio(26) }}
      />
    </>
  );
};

const TipPaymentModal = (props, forwardedRef) => {
  //set state and ref
  // const [modalInfo, setModalInfo] = useState({});
  const modalizeRef = useRef(null);

  // hide modal function
  const hide = () => {
    modalizeRef.current.close();
  };

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: data => {
      setImmediate(() => {
        // setModalInfo(data);
        modalizeRef.current.open();
      });
    },
    hide,
  }));

  const onSend = () => {
    hide();
  };

  // main render
  return (
    <Modalize
      ref={modalizeRef}
      modalTopOffset={10}
      handlePosition="inside"
      adjustToContentHeight
      handleStyle={AppStyles.handleModal}
      childrenStyle={styles.children}
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
      HeaderComponent={
        <Text style={styles.header}>{strings('app.tip_modal_header')}</Text>
      }
      FooterComponent={
        <BottomButton
          title={strings('app.send')}
          onPressCancel={hide}
          onPress={onSend}
        />
      }
    >
      <Content />
    </Modalize>
  );
};
export default React.forwardRef(TipPaymentModal);
