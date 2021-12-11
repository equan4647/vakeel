import _ from 'lodash';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  AmountRow,
  BottomButton,
  DisplayAddress,
  DisplayPaymentMethod,
  HorizontalTitle,
  OrderSubItemList,
  Separator,
} from '../../common';
import { Loader } from '../../components';
import { ORDER_STATUS } from '../../config/Constants';
import { OrderUtil } from '../../DataUtils';
import {
  getAddressItem,
  getDefaultAddressID,
} from '../../ducks/addresses/selectors';
import { requestPlaceOrder } from '../../ducks/orders/actions';
import { getCheckoutData } from '../../ducks/orders/selectors';
import { resetWallet } from '../../ducks/payment/actions';
import { getCardItem } from '../../ducks/payment/selectors';
import { AppStyles } from '../../theme';
import { NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';

const OrderDetail = ({ navigation, route }) => {
  NavigationService.setTitle(navigation, '');

  const data = useSelector(getCheckoutData),
    defaultAddressID = useSelector(getDefaultAddressID),
    [selectedAddressID, setAddressID] = useState(defaultAddressID),
    address = useSelector(getAddressItem(selectedAddressID)),
    [paymentInfo, setPaymentMethod] = useState();

  const paymentCardInfo = useSelector(getCardItem(paymentInfo?.card_token));
  const amountToCharge = OrderUtil.getPriceToCharge(data);

  const dispatch = useDispatch();
  const placeOrder = () => {
    const payload = {
      status: ORDER_STATUS.PENDING,
      shipping_info: address,
      id: OrderUtil.getId(data),
    };
    const onSuccess = () => {
      dispatch(resetWallet());
      NavigationService.reset('OrderSuccess');
    };

    Util.promptPayment(() => {
      dispatch(requestPlaceOrder({ ...paymentInfo, ...payload }, onSuccess));
    });
  };

  const onSelectAddress = addressID => {
    setAddressID(addressID);
    NavigationService.pop();
  };

  const onSavePaymentMethod = paymentpayload => {
    NavigationService.pop();
    setPaymentMethod(paymentpayload);
  };

  return (
    <>
      <ScrollView
        style={AppStyles.container}
        contentContainerStyle={styles.content}
      >
        <DisplayAddress
          data={address}
          title={strings('app.shipping_address')}
          editable
          onEdit={() =>
            NavigationService.navigate(
              'AddressScreen',
              { onSave: onSelectAddress, id: selectedAddressID },
              'AddressModal'
            )
          }
        />

        {Util.isNotEmpty(address) && (
          <DisplayPaymentMethod
            {...paymentInfo}
            cardInfo={paymentCardInfo}
            isCardCharged={Util.isCardCharged(paymentInfo)}
            isWalletCharged={Util.isWalletCharged(paymentInfo)}
            paymentScreenParams={{ amountToCharge }}
            onSubmit={onSavePaymentMethod}
            rightTitle={
              _.isEmpty(paymentInfo)
                ? strings('app.addCaps')
                : strings('app.change')
            }
          />
        )}

        <HorizontalTitle
          title={strings('app.itemsCaps')}
          bar
          containerStyle={styles.containerStyle}
          barStyle={styles.barStyle}
        />

        <OrderSubItemList
          data={OrderUtil.getOrderData(data)}
          allowReview={false}
        />

        <Separator style={styles.listSeparator} />
        <AmountRow
          title={strings('app.subtotal')}
          amount={OrderUtil.getSum(data)}
        />

        <AmountRow
          title={strings('app.delivery')}
          amount={OrderUtil.getDeliveryCharges(data)}
        />

        <Separator style={styles.listTotal} />

        <AmountRow
          title={strings('app.total')}
          amount={OrderUtil.getSum(data) + OrderUtil.getDeliveryCharges(data)}
        />
      </ScrollView>

      <BottomButton
        title={strings('app.place_order')}
        onPress={placeOrder}
        disabled={_.isEmpty(address) || _.isEmpty(paymentInfo)}
      />

      <Loader type="PLACE_ORDER" />
    </>
  );
};

export default OrderDetail;
