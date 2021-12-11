import { yupResolver } from '@hookform/resolvers/yup';
import { Keyboard, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import React from 'react';
import { useDispatch } from 'react-redux';

import { AppButton, LargeHeader, TextInput } from '../../common';
import { NavigationService, ValidationUtil } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { USER_TYPES } from '../../config/Constants';
import { authActions } from '../../ducks/auth';
import { Loader } from '../../components';

const ForgotPassword = ({ navigation }) => {
  // set title empty
  NavigationService.setTitle(navigation, '');

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.forgot),
  });
  const emailProps = useInputProps(formObj, 'email');
  const dispatch = useDispatch();

  //submit
  const submit = formObj.handleSubmit(values => {
    values.user_type = USER_TYPES.BASIC;
    const onSuccess = () =>
      NavigationService.navigate('OTPVerification', {
        isForgot: true,
        email: values?.email,
      });
    dispatch(authActions.requestSendEmailOTP(values, onSuccess));
    Keyboard.dismiss();
  });

  return (
    <ScrollView
      style={AppStyles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={AppStyles.contentContainerStyle}
    >
      <LargeHeader title={strings('app.forgot_password')} />
      <TextInput
        title={strings('app.email')}
        keyboardType="email-address"
        containerStyle={AppStyles.formTopSpace}
        onSubmit={submit}
        {...emailProps}
      />
      <AppButton title={strings('app.continue')} onPress={submit} />
      <Loader type="SEND_EMAIL_OTP" />
    </ScrollView>
  );
};
export default ForgotPassword;
