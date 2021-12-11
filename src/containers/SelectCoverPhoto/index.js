import React, { useState } from 'react';
import { View } from 'react-native';
import _ from 'lodash';

import {
  ADD_PRODUCT_ITEM_TYPE,
  UPLOAD_PHOTOS_FOR,
} from '../../config/Constants';
import { strings } from '../../utils/i18n';
import { NavigationService, Util, DataHandler } from '../../utils';
import { PhotosGrid, BottomButton } from '../../common';
import { AppStyles } from '../../theme';

const SelectCoverPhoto = ({ route, navigation }) => {
  // set header
  NavigationService.setTitle(navigation, strings('app.select_cover_photo'));

  // set images array
  const imagesAdded = route.params?.images ?? [];
  const onChangeImagesCover = route.params?.onChangeImagesCover ?? undefined;
  const [imgList, setImgList] = useState(imagesAdded);

  const uploadPhotosFor = route.params?.uploadPhotosFor ?? '';
  const isButtonDisabled = Util.isEmpty(_.find(imgList, ['is_cover', 1]));

  const onPressSelect = selectedIndex => {
    // reset is_cover for items
    const newImages = [];
    imgList.map((item, index) => {
      const is_cover = selectedIndex === index ? 1 : 0;
      newImages.push({ ...item, is_cover });
    });
    setImgList(newImages);

    // set images in datahanlder for persist
    if (uploadPhotosFor === UPLOAD_PHOTOS_FOR.CLASSIFIED) {
      DataHandler.setClassifiedAdInfo({ images: newImages });
    }
    if (onChangeImagesCover) {
      onChangeImagesCover(newImages);
    }
  };

  return (
    <View style={AppStyles.flex}>
      <PhotosGrid
        data={imgList}
        onPress={onPressSelect}
        type={ADD_PRODUCT_ITEM_TYPE.SELECTABLE}
      />
      <BottomButton
        onPress={() => {
          navigateToNext(uploadPhotosFor);
        }}
        title={strings('app.next')}
        disabled={isButtonDisabled}
      />
    </View>
  );
};

export default SelectCoverPhoto;

function navigateToNext(identifier) {
  switch (identifier) {
    case UPLOAD_PHOTOS_FOR.CLASSIFIED:
      NavigationService.navigate('SetPrice');
      break;
    case UPLOAD_PHOTOS_FOR.TOPIC:
      NavigationService.navigate('TopicEditor');
      break;
    default:
      return;
  }
}
