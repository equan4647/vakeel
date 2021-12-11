import React from 'react';
import { ScrollView, Image, TouchableOpacity, Keyboard } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  TextInput,
  AppButton,
  SocialButton,
  PrivacyAndTermsLink,
  HeaderBackImage,
} from '../../common';
import { NavigationService, ValidationUtil } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { USER_TYPES } from '../../config/Constants';
import { AppStyles, Images, Metrics } from '../../theme';
import { strings } from '../../utils/i18n';
import { Loader, Text, ButtonView } from '../../components';
import styles from './styles';
import { authActions } from '../../ducks/auth';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';

const SignupLink = React.memo(() => (
  <Text size="size_16" lineHeight={20} textAlign="center">
    {strings('app.dont_have_account')}
    <Text
      size="size_16"
      lineHeight={20}
      type="semiBold"
      onPress={() => NavigationService.navigate('Signup')}
    >
      {strings('app.signup')}
    </Text>
  </Text>
));

const ForgotLink = React.memo(() => (
  <TouchableOpacity
    onPress={() => NavigationService.navigate('ForgotPassword')}
  >
    <Text style={styles.forgotLink}>{strings('app.forgotlink')}</Text>
  </TouchableOpacity>
));

const loadingFlag = 'LOGIN';

const Login = ({ navigation, route }) => {
  const showCross = route.params?.showCross ?? true;

  //const { loading } = useSelector(getRequestFlag(loadingFlag));

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.login),
  });
  const emailProps = useInputProps(formObj, 'email');
  const passwordProps = useInputProps(formObj, 'password');
  const dispatch = useDispatch();

  //submit
  const submit = formObj.handleSubmit(values => {
    values.user_type = USER_TYPES.BASIC;
    dispatch(authActions.requestLogin(values));
    Keyboard.dismiss();
  });

  const renderFogot = () => <ForgotLink />;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <ButtonView
          onPress={NavigationService.goBack}
          hitSlop={Metrics.hitSlop}
        >
          <HeaderBackImage isCross={showCross} />
        </ButtonView>
      ),
    });
  }, [navigation, showCross]);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={AppStyles.contentContainerStyle}
        style={[AppStyles.container]}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <Image source={Images.images.logo} style={styles.logo} />

        <TextInput
          title={strings('app.email')}
          keyboardType="email-address"
          nextFocusRef={passwordProps.forwardRef}
          {...emailProps}
        />
        <TextInput
          title={strings('app.password')}
          secureTextEntry
          renderRight={renderFogot}
          onSubmit={submit}
          {...passwordProps}
        />

        <AppButton
          title={strings('app.sign_in')}
          onPress={submit}
          //{...{ loading }}
        />

        <Text style={styles.or}>{strings('app.or')}</Text>

        <SocialButton />

        <SignupLink />

        <PrivacyAndTermsLink />
      </ScrollView>

      <Loader type={loadingFlag} />
    </>
  );
};

export default Login;
