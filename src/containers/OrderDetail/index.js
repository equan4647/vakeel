import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  AmountRow,
  DisplayAddress,
  DisplayPaymentMethod,
  HorizontalTitle,
  ID,
  OrderStatusTag,
  OrderSubItemList,
  Separator,
} from '../../common';
import { Loader, ScrollViewApi, Text } from '../../components';
import { ORDER_CANCEL_ROLE, ORDER_STATUS } from '../../config/Constants';
import { OrderUtil } from '../../DataUtils';
import { ordersActions } from '../../ducks/orders';
import { requestCancelOrder } from '../../ducks/orders/actions';
import { getCheckoutData, getOrderItem } from '../../ducks/orders/selectors';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { AppStyles, Colors } from '../../theme';
import { NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';

const OrderDetail = ({ navigation, route }) => {
  const id = route.params?.id ?? null;
  const data = useSelector(id ? getOrderItem(id) : getCheckoutData);
  const status =
    !OrderUtil.canCancel(data) &&
    OrderUtil.getStatus(data) == ORDER_STATUS.PENDING
      ? ORDER_STATUS.DISPATCHED
      : OrderUtil.getStatus(data);

  const isCancelled = useCallback(() => status === ORDER_STATUS.CANCELLED, [
    status,
  ]);

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`GET_ORDER_${id}`)
  );

  const dispatch = useDispatch();

  const cancelOrder = () =>
    Util.showAlertConfirm(
      strings('app.are_you_sure'),
      strings('app.you_want_to_cancel_order'),
      strings('app.confirm'),
      () =>
        dispatch(
          requestCancelOrder({
            id,
            status: ORDER_STATUS.CANCELLED,
            cancelled_by: ORDER_CANCEL_ROLE.USER,
          })
        )
    );

  NavigationService.setRightHeader(
    navigation,
    '',
    status === ORDER_STATUS.PENDING ? strings('app.cancel_order') : '',
    cancelOrder,
    { textStyle: { color: Colors.primary } },
    [status, dispatch]
  );

  const renderContent = () => {
    return (
      <>
        <View style={AppStyles.spreadRow}>
          <ID id={OrderUtil.getId(data)} time={OrderUtil.getUpdatedAt(data)} />
          <OrderStatusTag {...{ status }} />
        </View>

        {isCancelled() ? (
          <Text style={styles.cancelText}>
            {OrderUtil.cancelledBy(data) === ORDER_CANCEL_ROLE.USER
              ? strings('app.order_cancelled_by_me_msg')
              : strings('app.order_cancelled_by_vendor_msg')}
          </Text>
        ) : null}

        <DisplayAddress
          data={OrderUtil.getShippingInfo(data)}
          title={strings('app.shipping_address')}
          style={styles.displayAddress}
        />

        <DisplayPaymentMethod
          cardInfo={OrderUtil.getCardInfo(data)}
          isCardCharged={OrderUtil.isCardCharged(data)}
          isWalletCharged={OrderUtil.isWalletCharged(data)}
          amountDeductedFromCard={OrderUtil.getAmountchargedFromCard(data)}
          amountDeductedFromWallet={OrderUtil.getAmountchargedFromWallet(data)}
          editable={false}
        />

        <HorizontalTitle
          title={strings('app.itemsCaps')}
          bar
          containerStyle={styles.containerStyle}
          barStyle={styles.barStyle}
        />

        <OrderSubItemList
          orderID={OrderUtil.getId(data)}
          data={OrderUtil.getOrderData(data)}
          allowReview={status === ORDER_STATUS.DELIVERED}
        />

        {isCancelled() ? null : (
          <>
            <Separator style={styles.listSeparator} />

            <AmountRow
              title={strings('app.subtotal')}
              amount={OrderUtil.getSum(data)}
            />

            <AmountRow
              title={strings('app.delivery')}
              amount={OrderUtil.getDeliveryCharges(data)}
            />
          </>
        )}

        <Separator style={styles.listTotal} />

        <AmountRow
          title={strings('app.total')}
          amount={OrderUtil.getPriceToCharge(data)}
          negative={isCancelled()}
        />

        <Loader type="CANCEL_ORDER" />
      </>
    );
  };

  return (
    <ScrollViewApi
      identifier={id}
      {...{ requestFlags, data }}
      payload={{ id }}
      checkDataEmpty
      showsVerticalScrollIndicator={false}
      requestAction={ordersActions.requestGetOrder}
      content={renderContent}
      style={AppStyles.container}
      contentContainerStyle={styles.container}
    />
  );
};

export default OrderDetail;
