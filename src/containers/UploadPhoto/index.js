import React, { useState } from 'react';
import { View } from 'react-native';

import {
  ADD_PRODUCT_ITEM_TYPE,
  PICKER_TYPE,
  UPLOAD_PHOTOS_FOR,
  MAX_UPLOAD_IMAGES_CLASSIFIED,
} from '../../config/Constants';
import {
  NavigationService,
  MediaPicker,
  DataHandler,
  Util,
} from '../../utils/';
import { PhotosGrid, BottomButton } from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';

const UploadPhoto = ({ navigation, route }) => {
  const uploadPhotosFor = route.params?.uploadPhotosFor ?? '';

  // set images array
  const imagesAdded = route.params?.images ?? [];
  const [imgList, setImgList] = useState(imagesAdded);

  const showMaxMessage = () => {
    Util.showMessage(
      strings('app.max_upload_file_classified_message', {
        key: 'limit',
        value: MAX_UPLOAD_IMAGES_CLASSIFIED,
      })
    );
  };

  // on press upload image
  const onPressUpload = () => {
    if (imgList.length >= MAX_UPLOAD_IMAGES_CLASSIFIED) {
      showMaxMessage();
    } else {
      MediaPicker.showPickerOptions(
        onImageSelected,
        PICKER_TYPE.CAMERA,
        {},
        PICKER_TYPE.MULTI_PICK,
        {}
      );
    }
  };

  // set header
  NavigationService.setAddHeader(
    navigation,
    strings('app.upload_photos'),
    onPressUpload,
    [imgList]
  );

  // onImageSelected
  const onImageSelected = imagesAttach => {
    // set images clicked event

    const imagesArray = Array.isArray(imagesAttach)
      ? imagesAttach
      : [imagesAttach];

    const maxImagesCanBeSelected =
      MAX_UPLOAD_IMAGES_CLASSIFIED - imgList.length;
    const isTrimImages = imagesArray.length > maxImagesCanBeSelected;
    const imagesCount = isTrimImages
      ? maxImagesCanBeSelected
      : imagesArray.length;

    // set images state array
    const newImages = [...imgList];
    for (let i = 0; i < imagesCount; i += 1) {
      const image = imagesArray[i];
      newImages.push({ url: image.path, is_local: 1, is_cover: 0 });
    }

    setImgList(newImages);

    if (uploadPhotosFor === UPLOAD_PHOTOS_FOR.CLASSIFIED) {
      DataHandler.setClassifiedAdInfo({ images: newImages });
    }

    if (isTrimImages) {
      showMaxMessage();
    }
  };

  const onChangeImagesCover = newImages => {
    setImgList(newImages);
  };

  // on press next
  const onNextPress = () => {
    // set images in datahanlder for persist
    if (uploadPhotosFor === UPLOAD_PHOTOS_FOR.CLASSIFIED) {
      DataHandler.setClassifiedAdInfo({ images: imgList });
    }

    // select conver photo
    NavigationService.navigate('SelectCoverPhoto', {
      images: imgList,
      uploadPhotosFor,
      onChangeImagesCover: onChangeImagesCover,
    });
  };

  // on press delete
  const onPressDelete = index => {
    // set images list
    const newImages = imgList.filter((_, ind) => ind !== index);
    setImgList(newImages);

    // set images in datahanlder for persist
    if (uploadPhotosFor === UPLOAD_PHOTOS_FOR.CLASSIFIED) {
      DataHandler.setClassifiedAdInfo({ images: newImages });
    }
  };

  // return view
  return (
    <View style={AppStyles.flex}>
      <PhotosGrid
        data={imgList}
        onPress={onPressDelete}
        type={ADD_PRODUCT_ITEM_TYPE.REMOVABLE}
      />
      <BottomButton
        title={strings('app.next')}
        onPress={onNextPress}
        disabled={imgList.length === 0}
      />
    </View>
  );
};

export default UploadPhoto;
