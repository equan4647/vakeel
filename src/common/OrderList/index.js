import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { EmptyView, OrderItem } from '..';
import { AppStyles } from '../../theme';
import styles from './styles';
import { FlatListApi } from '../../components';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import { useSelector } from 'react-redux';
import { ordersSelectors } from '../../ducks/orders';
import { requestGetOrders } from '../../ducks/orders/actions';
import { strings } from '../../utils/i18n';

const OrderList = ({ style, containerStyle, itemProps, identifier }) => {
  const requestFlags = useSelector(
    getRequestFlag(`GET_ORDERS_${identifier.join('_')}`)
  );

  const data = useSelector(ordersSelectors.getOrdersList(identifier.join('_')));

  return (
    <FlatListApi
      {...{ requestFlags, data }}
      requestAction={requestGetOrders}
      showsVerticalScrollIndicator={false}
      style={[AppStyles.flex, style]}
      identifier={identifier.join('_')}
      payload={{ status: identifier.join() }}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={[containerStyle, styles.container]}
      renderItem={({ item }) => <OrderItem id={item} {...itemProps} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={() =>
        data?.length ? <View style={styles.separator} /> : null
      }
      ListEmptyComponent={
        <EmptyView
          withoutArrow
          image="orderCompleted"
          text={strings('app.orders_empty_text')}
          imageStyle={AppStyles.emptyViewImage}
          containerStyle={AppStyles.emptyContainerStyle}
        />
      }
    />
  );
};

OrderList.propTypes = {
  style: ViewPropTypes.style,
  identifier: PropTypes.array,
  containerStyle: ViewPropTypes.style,
};
OrderList.defaultProps = {
  identifier: [],
};
export default OrderList;
