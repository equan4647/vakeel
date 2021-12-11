import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ScrollView } from 'react-native';

import {
  BottomButton,
  TextInput,
  PhoneInput,
  UserProfilePicture,
} from '../../common';
import { AppStyles } from '../../theme';
import { strings } from '../../utils/i18n';
import { NavigationService, ValidationUtil } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import styles from './styles';

export default ({ navigation }) => {
  NavigationService.setTitle(navigation, strings('app.review_your_details'));

  const initialValues = {
    first_name: 'Jushawn',
    last_name: 'A.',
    phone: '0900786012',
  };
  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.reviewDetails),
    defaultValues: initialValues,
  });
  const firstNameProps = useInputProps(formObj, 'first_name');
  const lastNameProps = useInputProps(formObj, 'last_name');
  const phoneNumberProps = useInputProps(formObj, 'phone');

  //submit
  const submit = formObj.handleSubmit(() =>
    NavigationService.navigate('OTPVerification', { publishAd: true })
  );
  return (
    <>
      <ScrollView
        style={AppStyles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* <UserProfilePicture isEdit={false} style={styles.avatar} /> */}

        <TextInput
          editable={false}
          title={strings('app.first_name')}
          nextFocusRef={lastNameProps.forwardRef}
          {...firstNameProps}
        />
        <TextInput
          editable={false}
          title={strings('app.last_name')}
          nextFocusRef={phoneNumberProps.forwardRef}
          {...lastNameProps}
        />

        <PhoneInput
          title={strings('app.phone')}
          onSubmit={submit}
          {...phoneNumberProps}
        />
      </ScrollView>
      <BottomButton title={strings('app.verify_account')} onPress={submit} />
    </>
  );
};
