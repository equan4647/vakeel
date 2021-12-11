import { Modalize } from 'react-native-modalize';
import { View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { AdAuthor, VehicleItem, PackageDetails } from '../../common';
import { NavigationService, DeliveryRoomHelper, Util } from '../../utils';
import { Text, ButtonView, Loader } from '../../components';
import DeliveryImages from './DeliveryImages';
import ContactOptions from './ContactOptions';
import { strings } from '../../utils/i18n';
import GoogleMap from './GoogleMap';
import FixHeader from './FixHeader';
import Header from './Header';
import styles from './styles';
import { deliverySelectors } from '../../ducks/delivery';
import { DeliveryUtil } from '../../DataUtils';
import { AppStyles } from '../../theme';
import {
  API_DRIVER_RAINTG_REVIEW,
  API_SERVICE_REVIEWS,
} from '../../config/WebService';
import { USER_TYPES } from '../../config/Constants';

const ViewCurrentDelivery = ({ navigation, route }) => {
  // hide header
  NavigationService.hideHeader(navigation);

  // set modal ref
  const modalizeRef = React.useRef(null);

  // open modal
  React.useEffect(() => {
    setTimeout(() => {
      modalizeRef.current.open();
    }, 500);
  }, []);

  const currentDelivery = useSelector(deliverySelectors.getActiveOrder);

  // const { _id = '', avg_rating = 0 } = currentDelivery.driver_obj;

  const onRatingPress = () => {
    NavigationService.navigate('RatingsAndReviews', {
      _id: currentDelivery.driver_obj?._id,
      ratingCount: currentDelivery.driver_obj?.rating_count,
      averageRating: currentDelivery.driver_obj?.avg_rating,
      url: API_DRIVER_RAINTG_REVIEW,
      payload: {
        target_type: USER_TYPES.BRINGER,
        driver_id: currentDelivery.driver_obj?._id,
      },
    });
  };

  const renderModalInfo = () => {
    return (
      <View style={styles.container}>
        <View style={AppStyles.container}>
          <AdAuthor
            data={DeliveryUtil.driverInfo(currentDelivery)}
            hasRightArrow={false}
            containerStyle={styles.bringerContainer}
            rating
            onRatingPress={onRatingPress}
            rightView={() => (
              <ContactOptions
                onChat={() => {
                  DeliveryUtil.chatWithBringer(currentDelivery);
                }}
                onCall={() => {
                  DeliveryUtil.callWithBringer(currentDelivery);
                }}
              />
            )}
          />

          <Text style={styles.distance}>
            {
              DeliveryRoomHelper.getDeliveryUpdate(currentDelivery)
                .distanceAndTime
            }
          </Text>

          <VehicleItem
            data={DeliveryUtil.vehicleTypeSelected(currentDelivery)}
            vehicleNumber={DeliveryUtil.vehicleRegNum(currentDelivery)}
            style={styles.vehicleItem}
            isSmall
          />

          <PackageDetails
            hasBar={false}
            details={DeliveryUtil.packageDetail(currentDelivery)}
          />
        </View>

        {!Util.pickupReached(currentDelivery) && (
          <ButtonView
            style={styles.cancelButton}
            onPress={DeliveryRoomHelper.onpressCancelDelivery}
          >
            <Text type="bold" size="size_16" color="primary">
              {strings('app.cancel_delivery')}
            </Text>
          </ButtonView>
        )}

        <DeliveryImages />
      </View>
    );
  };

  // main render
  return (
    <>
      <GoogleMap />

      <FixHeader />

      <Modalize
        onBackButtonPress={Util.DoNothing}
        ref={modalizeRef}
        withHandle={false}
        withOverlay={false}
        snapPoint={205}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          bounces: false,
        }}
        HeaderComponent={
          <Header
            title={DeliveryRoomHelper.getDeliveryUpdate(currentDelivery).msg}
          />
        }
        openAnimationConfig={{
          timing: { duration: 1000 },
          spring: { speed: 14, bounciness: 5 },
        }}
        alwaysOpen={205}
      >
        {renderModalInfo()}
      </Modalize>

      <Loader type="CANCEL_DELIVERY_ORDER" />
    </>
  );
};

export default ViewCurrentDelivery;
