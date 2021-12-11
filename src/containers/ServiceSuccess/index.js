import { useBackHandler } from '@react-native-community/hooks';
import { View } from 'react-native';
import React from 'react';

import { SuccessHeader, SuccessButtons, TitleDescription } from '../../common';
import { AppStyles, Images } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { AppUtil, NavigationService } from '../../utils';
import { Image, ImageViewHttpRound, Text } from '../../components';
import { useSelector } from 'react-redux';
import { servicesSelectors } from '../../ducks/services';
import { ServicesUtil } from '../../DataUtils';

const ServiceSuccess = ({ navigation, route }) => {
  // set header title
  // NavigationService.setTitle(navigation, '');

  const service_id = route?.params?.service_id ?? '';
  const booking_id = route?.params?.booking_id ?? '';

  const date = route?.params?.date ?? {};

  const address_obj = route?.params?.address_obj ?? {};

  const serviceItem = useSelector(
    servicesSelectors.getServicesItem(service_id)
  );

  React.useEffect(() => {
    navigation.setOptions({ title: '', headerLeft: null });
  });

  useBackHandler(() => NavigationService.navigate('Services'));

  const onDonePress = () => {
    // NavigationService.navigate('Services');
    NavigationService.pop();
  };

  const onViewAppointment = () => {
    NavigationService.pop();
    NavigationService.navigate('ServiceBookingDetails', {
      service_id,
      date,
      address_obj,
      booking_id,
    });
  };

  return (
    <View style={[AppStyles.container, styles.container]}>
      <View style={AppStyles.flex}>
        <View style={styles.emptySeperator} />
        <SuccessHeader
          containerStyle={[AppStyles.flex]}
          description={strings('app.your_booking_has_been_made')}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.userContainer}>
            {/* <Image source={Images.dummyImages.dummyProfilePic} /> */}
            <ImageViewHttpRound
              url={ServicesUtil.getVendorImage(serviceItem)}
              style={styles.image}
              size={80}
            />
            <Text style={styles.buyerName}>
              {ServicesUtil.getVendorName(serviceItem)}
            </Text>
            <Text style={styles.time}>{AppUtil.formatedBookingTime(date)}</Text>
          </View>

          <TitleDescription
            bar={false}
            title={ServicesUtil.title(serviceItem)}
            subText={strings('app.your_calendar_updated')}
            subTextStyle={styles.serviceSubText}
            titleTextStyle={styles.serviceName}
            containerStyle={styles.serviceNameContainer}
          />
        </View>
      </View>

      <SuccessButtons
        titleBtnOne={strings('app.view_appointment')}
        titleBtnTwo={strings('app.done')}
        onPressBtnOne={onViewAppointment}
        onPressBtnTwo={onDonePress}
      />
    </View>
  );
};
export default ServiceSuccess;
