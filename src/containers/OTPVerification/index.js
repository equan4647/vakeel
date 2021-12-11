import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';

import {
  OTP_RESEND_TIMER,
  USER_TYPES,
  VERIFY_CODE_COUNT,
} from '../../config/Constants';
import { Text, ButtonView, Loader } from '../../components';
import { NavigationService, Util } from '../../utils';
import { LargeHeader, AppButton } from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles, Metrics } from '../../theme';
import styles from './styles';

import { authActions } from '../../ducks/auth';

export default ({ navigation, route }) => {
  NavigationService.setTitle(navigation, '');

  const isForgot = route.params?.isForgot ?? false,
    isPhone = route.params?.isPhone ?? false,
    device_token = route.params?.device_token ?? '';

  const messgaeInfo = isForgot
    ? strings('app.otp_description_email_forgot')
    : isPhone
    ? strings('app.otp_description_phone')
    : strings('app.otp_description_email_signup');

  const email = route.params?.email ?? '',
    country_code = route.params?.country_code ?? '',
    country_id = route.params?.country_id ?? '',
    phone_number = route.params?.phone_number ?? '';

  const dispatch = useDispatch(),
    [verificationTime, setVerificationTime] = useState(OTP_RESEND_TIMER),
    [code, setCode] = useState(''),
    timer = useRef(null),
    otpInput = useRef(null);

  React.useEffect(() => {
    timer.current = setInterval(() => {
      if (verificationTime <= 0) {
        clearInterval(timer.current);
      } else {
        setVerificationTime(verificationTime - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timer.current);
    };
  });

  const onResendSuccess = () => {
    // clear fields
    clearInterval(timer.current);
    setVerificationTime(OTP_RESEND_TIMER);
    // show success message
    if (isPhone) {
      Util.showMessage(strings('messages.resend_success_phone'), 'success');
    } else {
      Util.showMessage(strings('messages.resend_success_email'), 'success');
    }
  };

  const getFormattedTime = time => {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return `${minutes > 9 ? minutes : `${minutes}`}:${
      seconds > 9 ? seconds : `0${seconds}`
    }`;
  };

  const onResendPress = () => {
    // reset code
    otpInput.current.clearAllFields2();
    setCode('');

    // send request for verification
    const payload = isPhone
      ? { phone_number, country_code }
      : { email, user_type: USER_TYPES.BASIC };
    const otpAction = isPhone ? 'requestSendPhoneOTP' : 'requestSendEmailOTP';
    dispatch(authActions[otpAction](payload, onResendSuccess));
  };

  const onVerifyPhoneSuccess = () => {
    const payload = { country_id, country_code, phone: phone_number };
    const onProfileUpdate = () => NavigationService.pop(2);
    dispatch(authActions.requestUpdateProfile(payload, onProfileUpdate));
  };

  const onFailureVerifyCode = () => {
    // reset code
    otpInput.current.clearAllFields2();
    setCode('');
  };

  const onSubmit = () => {
    const payload = isPhone
      ? { country_code, phone_number, code }
      : { email, code: code, user_type: USER_TYPES.BASIC };

    if (isForgot) {
      dispatch(
        authActions.requestVerifyEmailForgot(payload, onFailureVerifyCode)
      );
    } else if (isPhone) {
      dispatch(
        authActions.requestVerifyPhone(
          payload,
          onVerifyPhoneSuccess,
          onFailureVerifyCode
        )
      );
    } else {
      if (device_token) {
        payload.device_token = device_token;
      }

      dispatch(
        authActions.requestVerifyEmailSignup(payload, onFailureVerifyCode)
      );
    }
  };

  const onCodeChanged = _code => {
    setCode(_code);
  };

  const inActive = verificationTime !== 0;

  return (
    <View style={AppStyles.container}>
      <LargeHeader title={strings('app.otp_verification')} />

      <Text style={styles.descriptionTextStyle}>{messgaeInfo}</Text>

      <OTPInputView
        style={styles.otpInputContainer}
        pinCount={VERIFY_CODE_COUNT}
        autoFocusOnLoad={false}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeChanged={onCodeChanged}
        ref={otpInput}
      />

      <View style={styles.timerContainer}>
        <View style={AppStyles.row}>
          <Text type="semiBold" style={styles.timeText} lineHeight={20}>
            {getFormattedTime(verificationTime)}
          </Text>

          <Text lineHeight={20}>{` ${strings('app.remaining')}`}</Text>
        </View>

        <ButtonView
          disabled={inActive}
          onPress={onResendPress}
          hitSlop={Metrics.hitSlop}
        >
          <Text style={[styles.resendTextStyle]}>{strings('app.resend')}</Text>
        </ButtonView>
      </View>

      <AppButton
        title={strings('app.verify')}
        container={styles.appButton}
        onPress={onSubmit}
        disabled={code.length < VERIFY_CODE_COUNT}
      />

      <Loader
        type={[
          'VERIFY_EMAIL_FORGOT',
          'VERIFY_EMAIL_SIGNUP',
          'VERIFY_PHONE',
          'UPDATE_PROFILE',
          'SEND_EMAIL_OTP',
        ]}
      />
    </View>
  );
};
