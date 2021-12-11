import { View, Image } from 'react-native';
import React from 'react';

import {
  FavoriteButton,
  HorizontalTitle,
  AdsCarousel,
  HeaderRightImage,
  ContactButtonBar,
  ProductDetails,
  Swiper,
  AdAuthor,
  InlineMaps,
  ParallaxScrollView,
} from '../../common';

import { productDetail } from '../../data/productDetail';
import { NavigationService, Util } from '../../utils';
import { AppStyles, Images } from '../../theme';
import { strings } from '../../utils/i18n';
import { Text } from '../../components';
import styles from './styles';

const navigateToReport = () => NavigationService.navigate('Report');
const options = { Share: Util.DoNothing, 'Report this ad': navigateToReport };

const ProductTitle = ({ title }) => {
  return (
    <View style={styles.productTitleContainer}>
      <Text style={styles.titleTextStyle}>{title}</Text>
      <FavoriteButton border />
    </View>
  );
};

const ProductLocation = ({ location, time }) => {
  return (
    <View style={styles.locationContainer}>
      <View style={AppStyles.rowAligned}>
        <Image source={Images.icons.location} style={styles.locationIcon} />
        <Text size="size_12">{location}</Text>
      </View>
      <Text size="size_12">{time}</Text>
    </View>
  );
};

export default ({ data = productDetail, navigation, route }) => {
  const isMine = route.params?.isMine ?? false;
  // hide header
  NavigationService.hideHeader(navigation);

  const onPressCarousalItem = itemData =>
    NavigationService.push('ViewProduct', { data: itemData });

  const headerRight = () => (
    <HeaderRightImage
      img={Images.icons.moreObaqueBG}
      activeOpacity={0.7}
      onPress={() => {
        Util.showMoreOptions(options, 1);
      }}
    />
  );

  return (
    <>
      <ParallaxScrollView headerRight={headerRight} transparentBack={false}>
        <Swiper data={data.images} />

        <View style={styles.container}>
          <ProductTitle title={`${data.name} - ${data.kms_driven}`} />

          <Text style={styles.priceTextStyle}>{data.price}</Text>

          <ProductLocation location={data.location} time={data.time} />

          {/* details======== */}
          <HorizontalTitle
            title={strings('app.details')}
            bar
            barStyle={styles.barStyle}
          />
          <ProductDetails data={data.details} />

          {/* description======== */}
          <HorizontalTitle
            title={strings('app.description')}
            bar
            barStyle={styles.barStyle}
          />
          <Text style={styles.productDescriptionTextStyle}>
            {data.description}
          </Text>

          <AdAuthor
            {...data.seller}
            onPress={() =>
              NavigationService.navigate(
                isMine ? 'ViewProfile' : 'ClassifiedPublisher'
              )
            }
          />

          {/* location======== */}
          <HorizontalTitle
            title={strings('app.post_location')}
            bar
            barStyle={styles.barStyle}
          />
          <InlineMaps />

          {/* related_ads======== */}
          <HorizontalTitle
            title={strings('app.related_ads')}
            bar
            barStyle={styles.barStyle}
          />
        </View>

        <AdsCarousel
          style={styles.adsStyle}
          contentContainerStyle={styles.adsContainerStyle}
          onItemPress={onPressCarousalItem}
        />
      </ParallaxScrollView>

      {isMine ? null : <ContactButtonBar onChat={() => {}} />}
    </>
  );
};
