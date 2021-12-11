import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ID, OrderStatusTag, OrderSubItemList } from '..';
import { ButtonView, Text } from '../../components';
import { AppStyles } from '../../theme';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { ORDER_STATUS } from '../../config/Constants';
import { OrderUtil } from '../../DataUtils';
import { getOrderItem } from '../../ducks/orders/selectors';
import styles from './styles';

const OrderItem = ({ id, showStatus }) => {
  const data = useSelector(getOrderItem(id));
  // const status = OrderUtil.getStatus(data);
  const status =
    !OrderUtil.canCancel(data) &&
    OrderUtil.getStatus(data) == ORDER_STATUS.PENDING
      ? ORDER_STATUS.DISPATCHED
      : OrderUtil.getStatus(data);

  return (
    <ButtonView
      onPress={() => NavigationService.navigate('OrderDetail', { id })}
    >
      <View style={AppStyles.spreadRow}>
        <ID id={OrderUtil.getId(data)} />

        {showStatus ? <OrderStatusTag {...{ status }} /> : null}
      </View>
      <OrderSubItemList
        data={OrderUtil.getOrderData(data)}
        orderID={id}
        allowReview={status === ORDER_STATUS.COMPLETED}
      />

      {status === ORDER_STATUS.CANCELLED ? null : (
        <View style={[AppStyles.spreadRowAligned, styles.total]}>
          <Text>
            {`${OrderUtil.getOrderData(data).length} ${strings(
              'app.items'
            )}, ${strings('app.total')}`}
          </Text>

          <Text type="bold">{OrderUtil.getPriceToCharge(data, true)}</Text>
        </View>
      )}
    </ButtonView>
  );
};

OrderItem.propTypes = {
  status: PropTypes.string,
  items: PropTypes.array.isRequired,
  writeReview: PropTypes.bool,
  showStatus: PropTypes.bool,
};
OrderItem.defaultProps = {
  items: [],
  writeReview: true,
  showStatus: false,
};

export default React.memo(OrderItem);
