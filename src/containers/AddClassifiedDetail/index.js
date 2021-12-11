import { Keyboard } from 'react-native';
import React from 'react';

import { NavigationService, DataHandler, Util } from '../../utils';
import { UPLOAD_PHOTOS_FOR } from '../../config/Constants';
import { ClassifiedUtil } from '../../DataUtils';
import { FormGenerator } from '../../common';
import { strings } from '../../utils/i18n';

const AddClassifiedDetail = ({ navigation, route }) => {
  // set header
  const isEdit = route?.params?.isEdit ?? false;

  NavigationService.setCrossBackHeader(
    navigation,
    strings('app.details'),
    () => {
      Keyboard.dismiss();
      Util.showAlertConfirm(
        strings('messages.quit_post_title'),
        strings('messages.quit_post_description'),
        strings('app.leave'),
        () => {
          DataHandler.resetClassifiedAdInfo({});
          NavigationService.pop();
        }
      );
    },
    isEdit
  );

  /*
  if (isEdit) {
    NavigationService.setCrossBackHeader(
      navigation,
      strings('app.details'),
      () => {
        Util.showAlertConfirm(
          strings('messages.quit_post_title'),
          '',
          strings('app.quit'),
          () => {
            NavigationService.pop();
          }
        );
      }
    );
  } else {
    NavigationService.setHeader(navigation, strings('app.details'));
  }
  */

  const formArray = ClassifiedUtil.classifiedAddForm();

  const onSubmitForm = data => {
    const {
      title,
      description,
      attributes_value,
    } = ClassifiedUtil.getClassifiedFormAttributes(data);

    DataHandler.setClassifiedAdInfo({
      title,
      description,
      attributes_value,
    });

    const images = DataHandler.getClassifiedAddInfo()?.images ?? [];

    Keyboard.dismiss();
    NavigationService.navigate('UploadPhoto', {
      images,
      uploadPhotosFor: UPLOAD_PHOTOS_FOR.CLASSIFIED,
    });
  };

  return (
    <>
      <FormGenerator formInputs={formArray} onSubmitForm={onSubmitForm} />
    </>
  );
};

export default AddClassifiedDetail;
