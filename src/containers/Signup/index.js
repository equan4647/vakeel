import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Keyboard, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import {
  AppButton,
  HeaderBackImage,
  LargeHeader,
  PrivacyAndTermsLink,
  TextInput,
} from '../../common';
import { NavigationService, ValidationUtil } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { strings } from '../../utils/i18n';
import { AppStyles, Metrics } from '../../theme';
import { authActions } from '../../ducks/auth';
import { USER_TYPES } from '../../config/Constants';
import { ButtonView, Loader } from '../../components';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';

const getValues = data => ({
  first_name: data?.first_name ?? '',
  last_name: data?.last_name ?? '',
  email: data?.email ?? '',
});

const loadingFlag = 'SIGN_UP';

const Signup = ({ navigation, route }) => {
  const data = route.params?.data ?? {},
    isPrefilledInfo = !_.isUndefined(route.params?.data) ?? false,
    fromMenu = route.params?.fromMenu ?? false;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <ButtonView
          onPress={NavigationService.goBack}
          hitSlop={Metrics.hitSlop}
        >
          <HeaderBackImage isCross={fromMenu} />
        </ButtonView>
      ),
    });
  }, [navigation, fromMenu]);

  //const { loading } = useSelector(getRequestFlag(loadingFlag));

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(
      isPrefilledInfo ? ValidationUtil.signupSocial : ValidationUtil.signup
    ),
    defaultValues: getValues(data),
  });

  const firstNameProps = useInputProps(formObj, 'first_name');
  const lastNameProps = useInputProps(formObj, 'last_name');
  const emailProps = useInputProps(formObj, 'email');
  const referrelProps = useInputProps(formObj, 'referral_code');
  const passwordProps = useInputProps(formObj, 'password');
  const confirmPasswordProps = useInputProps(formObj, 'confirm_password');
  const dispatch = useDispatch();

  //submit
  const submit = formObj.handleSubmit(values => {
    if (isPrefilledInfo) {
      dispatch(authActions.requestSocialAuth({ ...data, email: values.email }));
    } else {
      delete values.confirm_password;
      values.user_type = USER_TYPES.BASIC;
      dispatch(authActions.requestSignup(values));
    }
    Keyboard.dismiss();
  });

  return (
    <ScrollView
      contentContainerStyle={AppStyles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      style={AppStyles.container}
      keyboardShouldPersistTaps="handled"
    >
      <LargeHeader title={strings('app.sign_up')} />
      <TextInput
        title={strings('app.first_name')}
        nextFocusRef={lastNameProps.forwardRef}
        containerStyle={AppStyles.formTopSpace}
        editable={!isPrefilledInfo}
        {...firstNameProps}
      />

      <TextInput
        title={strings('app.last_name')}
        nextFocusRef={emailProps.forwardRef}
        editable={!isPrefilledInfo}
        {...lastNameProps}
      />

      <TextInput
        title={strings('app.email')}
        keyboardType="email-address"
        nextFocusRef={
          isPrefilledInfo ? referrelProps.forwardRef : passwordProps.forwardRef
        }
        {...emailProps}
      />

      {isPrefilledInfo ? null : (
        <>
          <TextInput
            title={strings('app.password')}
            secureTextEntry
            nextFocusRef={confirmPasswordProps.forwardRef}
            {...passwordProps}
          />
          <TextInput
            title={strings('app.confirm_password')}
            secureTextEntry
            nextFocusRef={referrelProps.forwardRef}
            {...confirmPasswordProps}
          />
        </>
      )}

      <TextInput
        title={strings('app.referrel_code')}
        nextFocusRef={isPrefilledInfo ? undefined : passwordProps.forwardRef}
        onSubmit={submit}
        {...referrelProps}
      />

      <AppButton
        title={strings('app.sign_up')}
        onPress={submit}
        //{...{ loading }}
      />

      <PrivacyAndTermsLink />

      <Loader type={loadingFlag} />
    </ScrollView>
  );
};
export default Signup;
