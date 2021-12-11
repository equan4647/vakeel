import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  HorizontalTitle,
  Separator,
  BottomButton,
  AmountRow,
  DisplayPaymentMethod,
  DisplayAddress,
  FoodOrderSubItemList,
} from '../../common';
import { Loader } from '../../components';
import { FOOD_DELIVERY_VEHICLE_TYPE } from '../../config/Constants';
import { AddressUtil, FoodUtil } from '../../DataUtils';
import { getAddressItem } from '../../ducks/addresses/selectors';
import {
  getFoodCartItemKeys,
  getFoodCartItems,
  getRestaurantFromCart,
} from '../../ducks/foodCart/selectors';
import {
  requestGetDeliveryCharges,
  requestPlaceFoodOrder,
} from '../../ducks/foodOrders/actions';
import { getCardItem } from '../../ducks/payment/selectors';
import { AppStyles } from '../../theme';
import { DataHandler, NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';

const FoodOrderDetail = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, [navigation]);

  const dispatch = useDispatch();

  const [paymentInfo, setPaymentInfo] = useState({}),
    address = route?.params?.address ?? {},
    deliveryCharges = route?.params?.deliveryCharges ?? 0,
    distanceInKM = route?.params?.distanceInKM ?? 0,
    estimatedDeliveryTime = route?.params?.estimatedDeliveryTime ?? '',
    restaurantData = useSelector(getRestaurantFromCart),
    cardInfo = useSelector(getCardItem(paymentInfo?.card_token ?? '')),
    cartItems = useSelector(getFoodCartItems),
    cartItemKeys = useSelector(getFoodCartItemKeys),
    withDelivery = FoodUtil.isDeliveryEnabled(restaurantData),
    subTotal = FoodUtil.calculateTotal(cartItems),
    total = Number(subTotal) + Number(deliveryCharges);

  const onSavePaymentMethod = paymentpayload => {
    setPaymentInfo(paymentpayload);
    NavigationService.pop();
  };

  const onSaveLocation = addressID => {
    const addressItem = getAddressItem(addressID)(
        DataHandler.getStore().getState()
      ),
      payload = {
        resturant_id: FoodUtil.getID(restaurantData),
        drop_lat: AddressUtil.lat(addressItem),
        drop_long: AddressUtil.lng(addressItem),
      };

    if (Util.compareDeep(address, addressItem)) {
      setPaymentInfo({});
    }
    dispatch(requestGetDeliveryCharges(payload, addressItem));
  };
  console.log({ restaurantData });
  const submitOrder = () => {
    const commonPayload = {
      ...paymentInfo,
      pickup_data: FoodUtil.getRestaurantLocationObject(restaurantData),
      dropoff_data: Util.alterObjKeys(address, { lng: 'long' }),
      card_info: cardInfo,
    };

    const _payloadRestaurant = {
      ...commonPayload,
      items: cartItems,
      resturant_id: Util.getID(restaurantData),
      charges: { deliveryCharges, subTotal, total },
      resturant_name: FoodUtil.getRestaurantName(restaurantData),
      amount_to_charge: withDelivery ? total : subTotal,
      delivery_charges: withDelivery ? deliveryCharges : 0,
      subtotal: subTotal,
      bringer_enabled: withDelivery ? 0 : 1,
      resturantDeliveryTime: FoodUtil.estTime(restaurantData),
      contact: FoodUtil.getContact(restaurantData),
    };

    const _payloadDelivery = {
      ...commonPayload,
      bringerDeliveryTime: estimatedDeliveryTime,
      amount_to_charge: deliveryCharges,
      package_details: '',
      vehicle_type: FOOD_DELIVERY_VEHICLE_TYPE,
      distance_in_km: distanceInKM,
      resturant_delivery: 1,
      resturant_order_details: _payloadRestaurant,
    };

    Util.promptPayment(() => {
      dispatch(
        requestPlaceFoodOrder(
          withDelivery ? _payloadRestaurant : _payloadDelivery
        )
      );
    });
  };

  return (
    <>
      <ScrollView
        style={AppStyles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <DisplayAddress
          data={address}
          title={strings('app.delivery_address')}
          onEdit={() =>
            NavigationService.navigate('AddressModal', {
              screen: 'AddressScreen',
              params: { onSave: onSaveLocation },
            })
          }
        />

        {Util.isNotEmpty(address) && (
          <DisplayPaymentMethod
            isCardCharged={Util.isCardCharged(paymentInfo)}
            isWalletCharged={Util.isWalletCharged(paymentInfo)}
            // rightTitleButtonProps={{ disabled: Util.isEmpty(address) }}
            onSubmit={onSavePaymentMethod}
            paymentScreenParams={{
              amountToCharge: total,
              allowDefaultCard: false,
            }}
            {...{ cardInfo }}
          />
        )}

        <HorizontalTitle
          title={strings('app.itemsCaps')}
          containerStyle={styles.horizontalTitle}
          barStyle={styles.barStyle}
          bar
        />

        <FoodOrderSubItemList
          data={cartItemKeys}
          name={FoodUtil.getRestaurantName(restaurantData)}
          isData={false}
        />

        <Separator style={styles.listSeparator} />

        <AmountRow title={strings('app.subtotal')} amount={subTotal} />

        <AmountRow
          title={
            withDelivery
              ? strings('app.delivery')
              : strings('app.bringer_charges')
          }
          amount={deliveryCharges}
        />

        <Separator style={styles.listTotal} />
        <AmountRow title={strings('app.total')} amount={total} />
      </ScrollView>

      <BottomButton
        onPress={submitOrder}
        disabled={Util.isEmpty(paymentInfo) || Util.isEmpty(address)}
        title={
          withDelivery
            ? strings('app.place_order')
            : strings('app.search_bringer_&_place_order')
        }
      />

      <Loader type="GET_DELIVERY_CHARGES" />
    </>
  );
};

export default FoodOrderDetail;
