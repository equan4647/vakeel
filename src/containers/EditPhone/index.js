import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import React from 'react';

import { NavigationService, ValidationUtil } from '../../utils';
import { PhoneInput, FormContainer } from '../../common';
import { useInputProps } from '../../utils/CustomHooks';
import { getUser } from '../../ducks/auth/selectors';
import { authActions } from '../../ducks/auth';
import { strings } from '../../utils/i18n';
import { UserUtil } from '../../DataUtils';
import { Loader } from '../../components';

export default ({ navigation, route }) => {
  // get info user
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  // set header title
  const headerTitle = UserUtil.phone(user)
    ? strings('app.edit_phone_number')
    : strings('app.add_phone_number');
  NavigationService.setTitle(navigation, headerTitle);

  // init values
  const initialValues = {
    phone: UserUtil.phone(user),
    country_code: {
      dial_code: UserUtil.countryCode(user) || '+1',
      code: UserUtil.countryID(user) || 'US',
    },
  };

  const formOptions = {
    resolver: yupResolver(ValidationUtil.editPhone),
    defaultValues: initialValues,
  };

  const formObj = useForm(formOptions);
  const phoneNumberProps = useInputProps(formObj, 'phone');

  const submit = formObj.handleSubmit(values => {
    const payload = {
      country_code: values?.country_code?.dial_code,
      country_id: values?.country_code?.code,
      phone_number: values.phone,
    };

    const onSuccess = () => {
      NavigationService.navigate('OTPVerification', {
        ...payload,
        isPhone: true,
      });
    };

    dispatch(authActions.requestSendPhoneOTP(payload, onSuccess));
    Keyboard.dismiss();
  });

  return (
    <FormContainer buttonText={strings('app.next')} buttonPress={submit}>
      <PhoneInput
        title={strings('app.phone')}
        onSubmit={submit}
        {...phoneNumberProps}
        required
      />
      <Loader type={'SEND_PHONE_OTP'} />
    </FormContainer>
  );
};
