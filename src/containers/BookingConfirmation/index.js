import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { AppStyles, Colors } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';
import {
  TitleDescription,
  AdAuthor,
  DisplayAddress,
  BottomButtonContainer,
  AppButton,
  PackageDetails,
  FeeContainer,
  DisplayPaymentMethod,
  BottomButton,
} from '../../common';
import { AppUtil, NavigationService, Util } from '../../utils';
import {
  getAddressItem,
  getDefaultAddressID,
} from '../../ducks/addresses/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { servicesActions, servicesSelectors } from '../../ducks/services';
import { ServicesUtil } from '../../DataUtils';
import { Loader } from '../../components';
import _ from 'lodash';
import { getCardItem } from '../../ducks/payment/selectors';

const BookingConfirmation = ({ navigation, route }) => {
  NavigationService.setHeader(navigation, strings('app.booking_confirmation'));

  const defaultAddressID = useSelector(getDefaultAddressID);
  const [selectedAddressID, setAddressID] = useState(defaultAddressID);

  const [paymentInfo, setPaymentInfo] = useState({}),
    cardInfo = useSelector(getCardItem(paymentInfo?.card_token ?? ''));

  const address = useSelector(getAddressItem(selectedAddressID));

  const service_id = route?.params?.service_id ?? '';

  const date = route?.params?.date ?? {};

  const slots = route?.params?.selectedSlot ?? {};

  const serviceItem = useSelector(
    servicesSelectors.getServicesItem(service_id)
  );

  const dispatch = useDispatch();

  const onPaymentSuccess = bookingObj => {
    NavigationService.reset('ServiceSuccess', {
      service_id,
      date: { ...date, ...slots },
      address_obj: address,
      booking_id: bookingObj._id,
    });
  };

  const onSavePaymentMethod = paymentpayload => {
    setPaymentInfo(paymentpayload);
    NavigationService.pop();
  };

  const onConfirmPress = () => {
    const { start_time, end_time } = slots;
    const payload = {
      address_obj: address,
      service_obj: serviceItem,
      service_id,
      start_time,
      end_time,
      ...date,
      ...paymentInfo,
    };

    Util.promptPayment(() => {
      dispatch(
        servicesActions.requestBookAppointment(payload, onPaymentSuccess)
      );
    });
  };

  const onSelectAddress = addressID => {
    setAddressID(addressID);
    NavigationService.pop();
  };

  return (
    <>
      <ScrollView style={AppStyles.container}>
        <TitleDescription
          titleTextStyle={styles.serviceName}
          title={ServicesUtil.title(serviceItem)}
          subText={AppUtil.formatedBookingTime({ ...date, ...slots })}
          containerStyle={styles.serviceIdContainer}
          bar={false}
        />

        <PackageDetails
          details={ServicesUtil.description(serviceItem)}
          title={strings('app.service_details')}
        />

        <AdAuthor
          hasRightArrow={false}
          data={ServicesUtil.getVendor(serviceItem)}
          title="Boomin User"
          containerStyle={styles.author}
        />

        <DisplayAddress
          data={address}
          title={strings('app.address')}
          editable
          style={styles.address}
          editTextColor={Colors.black}
          onEdit={() =>
            NavigationService.navigate('AddressModal', {
              screen: 'AddressScreen',
              params: { onSave: onSelectAddress, id: selectedAddressID },
            })
          }
        />

        <DisplayPaymentMethod
          isCardCharged={Util.isCardCharged(paymentInfo)}
          isWalletCharged={Util.isWalletCharged(paymentInfo)}
          rightTitleButtonProps={{ disabled: Util.isEmpty(address) }}
          onSubmit={onSavePaymentMethod}
          paymentScreenParams={{
            amountToCharge: ServicesUtil.price(serviceItem),
            allowDefaultCard: false,
          }}
          {...{ cardInfo }}
        />

        <FeeContainer
          style={styles.feeContainer}
          text={strings('app.servie_fee')}
          price={AppUtil.formatPrice(ServicesUtil.price(serviceItem))}
        />
      </ScrollView>

      <BottomButton
        onPress={onConfirmPress}
        title={strings('app.confirm_booking')}
        disabled={Util.isEmpty(address) || Util.isEmpty(paymentInfo)}
      />

      <Loader type="BOOK_APPOINTMENT" />
    </>
  );
};

export default BookingConfirmation;
