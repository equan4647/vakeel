import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import React from 'react';

import {
  DataHandler,
  NavigationService,
  Util,
  ValidationUtil,
} from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { FormContainer, TextInput } from '../../common';
import { strings } from '../../utils/i18n';

const CreateAd = ({ navigation, route }) => {
  function getInitialData() {
    return {
      title: DataHandler.getAdvertisingInfo().title,
      description: DataHandler.getAdvertisingInfo().description,
    };
  }

  const isEdit = route?.params?.isEdit;

  // header
  NavigationService.setCrossBackHeader(
    navigation,
    !isEdit ? strings('app.create_ad') : strings('app.edit_ad'),
    () => {
      Keyboard.dismiss();
      Util.showAlertConfirm(
        strings('messages.quit_post_title'),
        strings('messages.quit_post_description'),
        strings('app.leave'),
        () => {
          DataHandler.resetAdvertisingInfo({});
          NavigationService.pop();
        }
      );
    }
  );

  // set form hooks
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.createAd),
    defaultValues: getInitialData(),
  });
  const titleProps = useInputProps(formObj, 'title');
  const descriptionProps = useInputProps(formObj, 'description');

  //submit
  const onPressSave = data => {
    const { title, description } = data;

    DataHandler.setAdvertisingInfo({ title, description });

    Keyboard.dismiss();
    NavigationService.navigate('AdContactDetails');
  };

  const submit = formObj.handleSubmit(onPressSave);

  return (
    <FormContainer buttonText={strings('app.next')} buttonPress={submit}>
      <TextInput
        title={strings('app.title')}
        customTitle={strings('app.ad_title')}
        hint={strings('app.type_in_important_feature_of_item')}
        nextFocusRef={descriptionProps.forwardRef}
        required
        bottomSpaceLarge
        showCharCount
        maxLength={50}
        {...titleProps}
      />
      <TextInput
        title={strings('app.description')}
        customTitle={strings('app.ad_describe')}
        multiline
        required
        showCharCount
        maxLength={200}
        {...descriptionProps}
      />
    </FormContainer>
  );
};

export default CreateAd;
