import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import React from 'react';

import {
  NavigationService,
  ValidationUtil,
  Util,
  DataHandler,
} from '../../utils';
import { ImageViewHttpRound, Loader } from '../../components';
import { useInputProps } from '../../utils/CustomHooks';
import { BottomButton, TextInput } from '../../common';
import { UserUtil } from '../../DataUtils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';

import { classifiedActions } from '../../ducks/classified';
import { getUser } from '../../ducks/auth/selectors';

export default ({ navigation }) => {
  // set title
  NavigationService.setTitle(navigation, strings('app.review_your_details'));

  // use dispatch
  const dispatch = useDispatch();

  // get user and phoneNumber
  const user = useSelector(getUser);
  const phoneNumber = UserUtil.fullPhoneNumber(user);
  const firstName = UserUtil.firstName(user);
  const lastName = UserUtil.lastName(user);
  const avatar = UserUtil.avatar(user);

  // set form objects
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.reviewDetails),
    defaultValues: {},
  });
  const firstNameProps = useInputProps(formObj, 'first_name');
  const lastNameProps = useInputProps(formObj, 'last_name');
  const phoneNumberProps = useInputProps(formObj, 'phone');

  // update phone number when user update it
  React.useEffect(() => {
    formObj.setValue('phone', UserUtil.fullPhoneNumber(user));
  }, [user]);

  //onSubmit
  const onSubmit = () => {
    if (phoneNumber === '') {
      Util.showMessage(strings('messages.add_phone_number_message'));
    } else {
      const adInfo = DataHandler.getClassifiedAddInfo();
      dispatch(classifiedActions.requestClassifiedAd(adInfo));
    }
  };

  // on onPhonePress
  const onPhonePress = () => NavigationService.navigate('EditPhone', {});

  return (
    <>
      <ScrollView
        style={AppStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <ImageViewHttpRound url={avatar} size={80} style={styles.avatar} />

        <TextInput
          editable={false}
          title={strings('app.first_name')}
          value={firstName}
          {...firstNameProps}
        />
        <TextInput
          editable={false}
          title={strings('app.last_name')}
          value={`${lastName}`}
          {...lastNameProps}
        />

        <TextInput
          title={strings('app.phone')}
          customTitle={strings('app.verfied_phone_number')}
          customPlaceholder={strings('app.add_phone_number')}
          isRightArrow
          value={phoneNumber}
          onPress={onPhonePress}
          {...phoneNumberProps}
        />
      </ScrollView>
      <BottomButton title={strings('app.post_now')} onPress={onSubmit} />
      <Loader type="CLASSIFIED_ADD" />
    </>
  );
};
