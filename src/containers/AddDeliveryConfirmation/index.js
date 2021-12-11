import React, { useEffect } from 'react';
import { View } from 'react-native';
import _ from 'lodash';

import {
  PickAndDropLocation,
  FormContainer,
  DisplayPaymentMethod,
  PackageDetails,
  DeliveryMethod,
  AmountRow,
} from '../../common';
import { DeliveryRoomHelper, NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestPlaceDeliveryOrder,
  setDeliveryPaymentMethod,
} from '../../ducks/delivery/actions';
import { getDeliveryInfo } from '../../ducks/delivery/selectors';
import { DeliveryUtil, PaymentUtil, UserUtil } from '../../DataUtils';
import { requestGetWallet } from '../../ducks/payment/actions';
import { getCardItem } from '../../ducks/payment/selectors';

const AddDeliveryConfirmation = ({ navigation, route }) => {
  // set header
  NavigationService.setTitle(navigation, '');

  const store = useSelector(_s => _s);

  // get info
  const info = route?.params?.info;
  //dispatch
  const dispatch = useDispatch();

  const onSavePaymentMethod = paymentpayload => {
    NavigationService.pop();
    dispatch(
      setDeliveryPaymentMethod({
        cardInfo: getCardItem(paymentpayload.card_token)(store),
        isCardCharged: Util.isCardCharged(paymentpayload),
        isWalletCharged: Util.isWalletCharged(paymentpayload),
      })
    );
  };

  const deliveryInfo = useSelector(getDeliveryInfo),
    paymentInfo = DeliveryUtil.deliveryInfoPaymentMethod(deliveryInfo),
    amountToCharge = DeliveryUtil.deliveryInfoDeliveryCharges(deliveryInfo);

  const searchBringer = () => {
    const locationKeysToBeChanged = {
      formattedAddress: 'address',
      lng: 'long',
    };

    const payload = {
      pickup_data: Util.alterObjKeys(info?.pickup, locationKeysToBeChanged),
      dropoff_data: Util.alterObjKeys(info?.dropOff, locationKeysToBeChanged),
      use_wallet: paymentInfo?.isWalletCharged ? 1 : 0,
      use_card: paymentInfo?.isCardCharged ? 1 : 0,
      package_details: info?.packageDetails,
      vehicle_type: info?.vehicle?.type ?? '',
      vehicle_type_obj: info?.vehicle,
      distance_in_km: DeliveryUtil.deliveryInfoDistInKM(deliveryInfo),
      amount_to_charge: amountToCharge,
      card_token: PaymentUtil.getId(paymentInfo?.cardInfo),
      customer_id: UserUtil.getStripeCustID(Util.getUserInfo()),
      card_info: paymentInfo?.cardInfo,
    };

    if (info?.pickup?.city === info?.dropOff?.city) {
      dispatch(requestPlaceDeliveryOrder(payload, Util.hideBlurView));
      DeliveryRoomHelper.displaySearchingBringer();
    } else {
      Util.showMessage(strings('app.ensure_same_city'));
    }
  };

  useEffect(() => {
    dispatch(requestGetWallet());
  }, [dispatch]);

  // main render
  return (
    <FormContainer
      style={AppStyles.container}
      buttonText={`${strings('app.search_bringer')}`}
      buttonPress={searchBringer}
      isButtonDisabled={_.isEmpty(paymentInfo)}
    >
      <View style={[AppStyles.bar, styles.topBar]} />

      <PickAndDropLocation
        pickAddress={info?.pickup?.formattedAddress}
        dropAddress={info?.dropOff?.formattedAddress}
        viewableOnly
      />

      <PackageDetails style={styles.pkgDetail} details={info.packageDetails} />

      <DeliveryMethod data={info?.vehicle} />

      <DisplayPaymentMethod
        {...paymentInfo}
        paymentScreenParams={{ amountToCharge }}
        onSubmit={onSavePaymentMethod}
        barStyle={styles.barStyle}
      />

      <AmountRow
        style={styles.bar}
        title={strings('app.delivery_charges')}
        amount={amountToCharge}
      />
    </FormContainer>
  );
};

export default AddDeliveryConfirmation;
