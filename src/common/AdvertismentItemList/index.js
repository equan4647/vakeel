import { ImageBackground } from 'react-native';
import React from 'react';

import { ButtonView, Text } from '../../components';
import { Images, Colors } from '../../theme';
import styles from './styles';

const AdvertismentItemList = props => {
  return (
    <ButtonView onPress={() => {}}>
      <ImageBackground
        source={Images.dummyImages.camera}
        style={styles.trendingProductContainer}
        imageStyle={styles.trendingProductImage}
      >
        <Text size="size_25" type="semiBold" color={Colors.white}>
          Black Canon DSLR Camera
        </Text>
      </ImageBackground>
    </ButtonView>
  );
};

AdvertismentItemList.propTypes = {};
AdvertismentItemList.defaultProps = {};

export default React.memo(AdvertismentItemList);
