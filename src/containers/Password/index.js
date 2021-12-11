import React from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { AppButton, LargeHeader, TextInput } from '../../common';
import { ValidationUtil, NavigationService } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { authActions } from '../../ducks/auth';
import { USER_TYPES } from '../../config/Constants';
import { Loader } from '../../components';

const Password = ({ navigation, route }) => {
  const email = route.params?.email ?? '';
  NavigationService.setTitle(navigation, '');

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.password),
  });
  const passwordProps = useInputProps(formObj, 'password');
  const confirmPasswordProps = useInputProps(formObj, 'confirm_password');
  const dispatch = useDispatch();

  //submit
  const submit = formObj.handleSubmit(values => {
    delete values.confirm_password;
    values.email = email;
    values.user_type = USER_TYPES.BASIC;
    dispatch(authActions.requestSetNewPassword(values));
    Keyboard.dismiss();
  });

  return (
    <ScrollView
      style={AppStyles.container}
      contentContainerStyle={AppStyles.contentContainerStyle}
      keyboardShouldPersistTaps="handled"
    >
      <LargeHeader title={strings('app.change_password')} />
      <TextInput
        title={strings('app.password')}
        secureTextEntry
        nextFocusRef={confirmPasswordProps.forwardRef}
        containerStyle={AppStyles.formTopSpace}
        {...passwordProps}
      />
      <TextInput
        title={strings('app.confirm_password')}
        secureTextEntry
        onSubmit={submit}
        {...confirmPasswordProps}
      />
      <AppButton title={strings('app.save')} onPress={submit} />
      <Loader type="SET_NEW_PASSWORD" />
    </ScrollView>
  );
};
export default Password;
