import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';

import { HeaderRightImage, BottomButton, EmptyView } from '../../common';
import {
  NavigationService,
  MediaPicker,
  Util,
  DataHandler,
} from '../../utils/';
import { PICKER_TYPE } from '../../config/Constants';
import { ButtonView, Image, ImageViewHttpBackground } from '../../components';
import { AppStyles, Images, Metrics } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';

export default ({ navigation }) => {
  const image = DataHandler.getAdvertisingInfo().image ?? '';

  const [img, setImg] = useState(image.url);

  const onImageSelected = img => {
    setImg(img.path);
    const image = {
      url: img.path,
      is_local: 1,
    };
    DataHandler.setAdvertisingInfo({ image });
  };

  // React.useLayoutEffect(() => {
  const onPressUpload = () => {
    MediaPicker.showPickerOptions(
      onImageSelected,
      PICKER_TYPE.CAMERA,
      {},
      PICKER_TYPE.GALLERY,
      {}
    );
  };

  const headerRight = () => (
    // Util.isEmpty(img) && (
    <HeaderRightImage img={Images.icons.add} onPress={onPressUpload} />
  );
  // );

  NavigationService.setHeader(
    navigation,
    strings('app.upload_photo'),
    headerRight
  );

  const onNextPress = () => {
    if (!Util.isEmpty(img)) {
      NavigationService.navigate('AdPrefrences');
    } else {
      Util.showMessage('Please add image');
    }
  };

  const onPressDelete = () => {
    setImg({});
    DataHandler.setAdvertisingInfo({ image: '' });
  };

  const renderEmptyView = () => (
    <EmptyView
      image="photo"
      containerStyle={styles.emptyView}
      indented
      text={strings('app.add_photo_empty_text2')}
    />
  );

  return (
    <View style={AppStyles.flex}>
      {Util.isEmpty(img) ? (
        renderEmptyView()
      ) : (
        /*   <ImageBackground
          source={{ uri: img }}
          style={styles.container}
          imageStyle={styles.image}
          resizeMode="cover"
        >
          <ButtonView onPress={onPressDelete}>
            <Image source={Images.icons.remove} />
          </ButtonView>
        </ImageBackground>*/
        <View style={{ flex: 1 }}>
          <ImageViewHttpBackground
            url={img}
            // isLocal
            containerStyle={styles.container}
            width={Metrics.scale(335)}
            height={Metrics.ratio(222)}
          >
            <ButtonView style={styles.crossbtn} onPress={onPressDelete}>
              <Image source={Images.icons.remove} />
            </ButtonView>
          </ImageViewHttpBackground>
        </View>
      )}
      <BottomButton title={strings('app.next')} onPress={onNextPress} />
    </View>
  );
};
