import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import {
  ValidationUtil,
  NavigationService,
  MediaPicker,
  Util,
} from '../../utils';
import { TextInput, DatePickerInput, FormContainer } from '../../common';
import { useInputProps } from '../../utils/CustomHooks';
import { strings } from '../../utils/i18n';
import { Images } from '../../theme';
import styles from './styles';
import { ButtonView, Loader, Text } from '../../components';
import { PICKER_TYPE } from '../../config/Constants';
import { getUser } from '../../ducks/auth/selectors';
import { authActions } from '../../ducks/auth';
import { UserUtil } from '../../DataUtils';

function getData(user) {
  return {
    email: UserUtil.email(user),
    first_name: UserUtil.firstName(user),
    last_name: UserUtil.lastName(user),
    phone: UserUtil.fullPhoneNumber(user),
    dob: UserUtil.dob(user),
    password: '***********',
    country_code: {
      dial_code: UserUtil.countryCode(user) ?? '+1',
      code: UserUtil.countryID(user) ?? 'US',
    },
  };
}

export default props => {
  const { navigation } = props;
  NavigationService.setHeader(navigation, strings('app.edit_personal_info'));

  const [img, setImg] = useState({});
  const user = useSelector(getUser);

  //console.log('JSON.stringify()', JSON.stringify(user.rocket_chat_account));

  const formObj = useForm({
    resolver: yupResolver(
      UserUtil.isPlatformSocial(user)
        ? ValidationUtil.editProfileWithoutPass
        : ValidationUtil.editProfile
    ),
    defaultValues: getData(user),
  });
  const firstNameProps = useInputProps(formObj, 'first_name');
  const lastNameProps = useInputProps(formObj, 'last_name');
  const emailProps = useInputProps(formObj, 'email');
  const phoneNumberProps = useInputProps(formObj, 'phone');
  const dateOfBirthProps = useInputProps(formObj, 'dob');
  const passwordProps = useInputProps(formObj, 'password');

  const dispatch = useDispatch();

  const onImageSelected = image => setImg(image.path);

  const onPressUpload = () => {
    MediaPicker.showPickerOptions(
      onImageSelected,
      PICKER_TYPE.CAMERA,
      {},
      PICKER_TYPE.GALLERY,
      {}
    );
  };

  const onPasswordPress = () => NavigationService.navigate('ChangePassword');
  const onUpdateSuccess = () => NavigationService.navigate('ViewProfile');
  const onPhonePress = () =>
    NavigationService.navigate('EditPhone', {
      phone: formObj.getValues().phone,
    });

  //submit
  const submit = formObj.handleSubmit(values => {
    delete values.password;
    values.image = img;
    values.phone = values.phone.replace(UserUtil.countryCode(user), '');
    values.country_code = UserUtil.countryCode(user);
    values.country_id = UserUtil.countryID(user);

    dispatch(authActions.requestUpdateProfile(values, onUpdateSuccess));
    Keyboard.dismiss();
  });

  const renderRightArrow = () => (
    <Image source={Images.icons.arrowRight} style={styles.arrow} />
  );

  useEffect(() => {
    formObj.setValue('phone', UserUtil.fullPhoneNumber(user));
  }, [UserUtil.fullPhoneNumber(user)]);

  return (
    <FormContainer buttonText={strings('app.save')} buttonPress={submit}>
      <ButtonView onPress={onPressUpload} style={styles.editBtnContainer}>
        <ImageBackground
          style={styles.imageContainer}
          imageStyle={styles.imageStyle}
          source={{ uri: Util.isNotEmpty(img) ? img : UserUtil.avatar(user) }}
        >
          <View style={styles.ediBtnTextContainer}>
            <Text type="bold" color="white">
              {strings('app.edit')}
            </Text>
          </View>
        </ImageBackground>
      </ButtonView>

      <TextInput
        title={strings('app.first_name')}
        nextFocusRef={lastNameProps.forwardRef}
        {...firstNameProps}
      />

      <TextInput
        title={strings('app.last_name')}
        nextFocusRef={emailProps.forwardRef}
        {...lastNameProps}
      />

      <TextInput
        title={strings('app.email')}
        {...emailProps}
        editable={false}
      />

      <DatePickerInput
        {...dateOfBirthProps}
        title={strings('app.dob')}
        customPlaceholder={strings('app.add_dob')}
        extraProps={{ maximumDate: new Date() }}
      />

      <TextInput
        title={strings('app.phone')}
        renderRight={renderRightArrow}
        onPress={() => onPhonePress(phoneNumberProps.control)}
        {...phoneNumberProps}
        editable={false}
      />

      {UserUtil.isPlatformSocial(user) ? null : (
        <TextInput
          renderRight={renderRightArrow}
          title={strings('app.password')}
          {...passwordProps}
          editable={false}
          onPress={onPasswordPress}
        />
      )}
      <Loader type={'UPDATE_PROFILE'} />
    </FormContainer>
  );
};
