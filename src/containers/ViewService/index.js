import React from 'react';
import { View } from 'react-native';

import {
  FavoriteButton,
  HorizontalTitle,
  ProductDetails,
  Swiper,
  StarRating,
  // RatingList,
  AdAuthor,
  InlineMaps,
  ParallaxScrollView,
  BottomButtonWithChat,
} from '../../common';
import { Text, Image } from '../../components';
import { serviceDetail } from '../../data/serviceDetail';
import { NavigationService, Util } from '../../utils';
import { Images } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { RATING_TYPE, CHAT_ROLE, STAR_SIZE } from '../../config/Constants';
import { ServicesUtil } from '../../DataUtils';
import { servicesSelectors } from '../../ducks/services';
import { useSelector } from 'react-redux';
import { API_SERVICE_REVIEWS } from '../../config/WebService';
import { RatingList } from './components';
import { AppUtil } from '../../utils';

const TitlePriceRating = React.memo(
  ({ title, price, rating, count, type, time }) => (
    <>
      <Text style={styles.serviceType} type="bold" size="size_14">
        {type}
      </Text>
      <Text type="semiBold" size="size_25">
        {title}
      </Text>
      <StarRating
        showRating
        type={RATING_TYPE.RATING_WITH_COUNT}
        count={count}
        size={STAR_SIZE.MEDIUM}
        rating={rating}
      />
      <Text style={styles.priceTextStyle}>{AppUtil.formatPrice(price)}</Text>
      <View style={styles.timeContainer}>
        <Image source={Images.icons.clock} />
        <Text style={styles.timeText} size="size_14">
          {`${AppUtil.convertMinToHrs(time)} service time`}
        </Text>
      </View>
    </>
  )
);

const Description = React.memo(({ description }) => (
  <>
    <HorizontalTitle
      title={strings('app.description')}
      bar
      barStyle={styles.barStyle}
    />
    <Text style={styles.productDescriptionTextStyle}>{description}</Text>
  </>
));

export default ({ data = serviceDetail, navigation, route }) => {
  // hide header
  NavigationService.hideHeader(navigation);

  const service_id = route?.params?.service_id ?? '';

  const onBookingPress = () => {
    AppUtil.doIfAuthorized(() =>
      NavigationService.navigate('BookingAppointmentStack', {
        screen: 'BookAppointment',
        params: { service_id },
      })
    );
  };
  // NavigationService.navigate('BookingAppointmentStack');

  const serviceItem = useSelector(
    servicesSelectors.getServicesItem(service_id)
  );

  const onChatPress = () => {
    ServicesUtil.goToChatScreen(serviceItem);
  };

  const onPressFavorite = isFavourite =>
    Util.addServiceToFavorites(service_id, isFavourite);

  const headerRight = () => (
    <FavoriteButton
      circle
      favorite={ServicesUtil.isFavourite(serviceItem)}
      {...{ onPressFavorite }}
    />
  );

  return (
    <>
      <ParallaxScrollView headerRight={headerRight} transparentBack={false}>
        <Swiper data={ServicesUtil.images(serviceItem)} />

        <View style={styles.container}>
          <TitlePriceRating
            title={ServicesUtil.title(serviceItem)}
            price={ServicesUtil.price(serviceItem)}
            rating={ServicesUtil.rating(serviceItem)}
            count={ServicesUtil.ratingCount(serviceItem)}
            type={ServicesUtil.category(serviceItem)}
            time={ServicesUtil.serviceTime(serviceItem)}
          />

          {/* description======== */}
          <Description description={ServicesUtil.description(serviceItem)} />

          {/* details======== */}
          <HorizontalTitle
            title={strings('app.availability')}
            barStyle={styles.barStyle}
            bar
          />

          <ProductDetails
            data={ServicesUtil.availability(serviceItem)}
            // data={data.details}
            attributeName="day"
            attributeValue="time_from"
            attributeValue2="time_to"
            // attributeValueKey="time_to"
          />

          <AdAuthor
            data={ServicesUtil.getVendor(serviceItem)}
            title="Boomin User"
            onPress={() =>
              NavigationService.push('Publisher', {
                vendor: ServicesUtil.getVendor(serviceItem),
              })
            }
          />

          {/* location======== */}
          <HorizontalTitle
            title={strings('app.service_available_at')}
            barStyle={styles.barStyle}
            bar
          />
          <InlineMaps
            latitude={ServicesUtil.getLat(serviceItem)}
            longitude={ServicesUtil.getLong(serviceItem)}
          />

          {/* rating======== */}
          {/* <HorizontalTitle
            title={strings('app.rating_and_reviews')}
            barStyle={styles.barStyle}
            rightTitle={strings('app.see_all')}
            onPress={() => NavigationService.navigate('RatingsAndReviews')}
            bar
          /> */}
          {/* <RatingList
            style={styles.ratingList}
            bounces={false}
            hasRating
            averageRating={ServicesUtil.rating(serviceItem)}
          /> */}

          <RatingList
            style={styles.ratingList}
            url={API_SERVICE_REVIEWS}
            _id={service_id}
            // {...{ service_id }}
          />
        </View>
      </ParallaxScrollView>

      <BottomButtonWithChat
        onChat={onChatPress}
        title={strings('app.booking')}
        onPress={onBookingPress}
      />
    </>
  );
};
