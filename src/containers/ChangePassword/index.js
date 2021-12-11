import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Keyboard, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import { AppButton, LargeHeader, TextInput } from '../../common';
import { ValidationUtil, NavigationService } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { authActions } from '../../ducks/auth';
import { USER_TYPES } from '../../config/Constants';
import { Loader } from '../../components';

const ChangePassword = ({ navigation, route }) => {
  NavigationService.setTitle(navigation, '');
  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.changePass),
  });
  const oldPasswordProps = useInputProps(formObj, 'old_password');
  const newPasswordProps = useInputProps(formObj, 'new_password');
  const confirmPasswordProps = useInputProps(formObj, 'confirm_password');
  const dispatch = useDispatch();

  //submit
  const submit = formObj.handleSubmit(values => {
    delete values.confirm_password;
    values.user_type = USER_TYPES.BASIC;
    dispatch(authActions.requestChangePassword(values));
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
        title={strings('app.old_password')}
        secureTextEntry
        nextFocusRef={newPasswordProps.forwardRef}
        containerStyle={AppStyles.formTopSpace}
        {...oldPasswordProps}
      />

      <TextInput
        title={strings('app.new_password')}
        secureTextEntry
        nextFocusRef={confirmPasswordProps.forwardRef}
        {...newPasswordProps}
      />

      <TextInput
        title={strings('app.confirm_password')}
        secureTextEntry
        onSubmit={submit}
        {...confirmPasswordProps}
      />
      <AppButton title={strings('app.save')} onPress={submit} />
      <Loader type="CHANGE_PASSWORD" />
    </ScrollView>
  );
};
export default ChangePassword;
