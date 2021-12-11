import { getRequestFlag } from '../../../ducks/requestFlags/selectors';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

import { AppStyles } from '../../../theme';
import styles from './styles';
import Item from './Item';
import {
  foodOrdersSelectors,
  foodOrdersActions,
} from '../../../ducks/foodOrders';
import { FlatListApi } from '../../../components';
import { ORDER_STATUS } from '../../../config/Constants';
import { EmptyView } from '../../../common';
import { strings } from '../../../utils/i18n';

const statuses = [
  ORDER_STATUS.CANCELLED,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.IN_PROGRESS,
];

const FoodOrder = () => {
  const data = useSelector(foodOrdersSelectors.getOrdersList),
    requestFlags = useSelector(getRequestFlag('FOOD_ORDERS_LIST'));

  return (
    <FlatListApi
      {...{ requestFlags, data }}
      payload={{ status: statuses.join() }}
      requestAction={foodOrdersActions.requestFoodOrdersList}
      showsVerticalScrollIndicator={false}
      style={AppStyles.flex}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => <Item id={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      emptyView={() => (
        <EmptyView
          withoutArrow
          image="foodOrder"
          containerStyle={AppStyles.emptyContainerStyle}
          text={strings('app.no_food_order')}
        />
      )}
      ListFooterComponent={() =>
        data?.length ? <View style={styles.separator} /> : null
      }
    />
  );
};

export default FoodOrder;
