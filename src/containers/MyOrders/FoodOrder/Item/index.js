import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { FoodOrderSubItemList, ID, OrderStatusTag } from '../../../../common';
import { ButtonView, Loader, Text } from '../../../../components';
import { AppStyles } from '../../../../theme';
import { NavigationService, Util } from '../../../../utils';
import { strings } from '../../../../utils/i18n';
import { ORDER_STATUS } from '../../../../config/Constants';
import { foodOrdersSelectors } from '../../../../ducks/foodOrders';
import { FoodOrderUtil, FoodUtil } from '../../../../DataUtils';
import styles from './styles';
import { useFoodOrderRating } from '../../../../utils/CustomHooks';

const Item = ({ id }) => {
  const data = useSelector(foodOrdersSelectors.getOrderItem(id)),
    status = Util.getStatus(data),
    reviewFoodOrder = useFoodOrderRating(data);

  return (
    <ButtonView
      onPress={() => NavigationService.navigate('FoodOrderDetail', { id })}
    >
      <ID
        titleContainerStyle={AppStyles.flex1}
        writeReview={FoodUtil.orderStatus(data) === ORDER_STATUS.DELIVERED}
        id={FoodUtil.getID(data)}
        onWriteReview={reviewFoodOrder}
        reviewButtonProps={{ isUpdate: FoodOrderUtil.isRated(data) }}
      />

      <Text>{FoodUtil.foodOrderDateCreated(data)}</Text>

      <View style={AppStyles.spreadRow}>
        <FoodOrderSubItemList
          data={FoodUtil.foodItems(data)}
          name={FoodUtil.getRestaurantName(data)}
          style={styles.itemList}
        />

        <OrderStatusTag {...{ status }} />
      </View>

      {status === ORDER_STATUS.CANCELLED ? null : (
        <View style={AppStyles.spreadRowAligned}>
          <Text>
            {`${FoodUtil.getItemsCount(FoodUtil.foodItems(data))} ${strings(
              'app.items'
            )}, ${strings('app.total')}`}
          </Text>

          <Text type="bold">{FoodUtil.subTotal(data, true)}</Text>
        </View>
      )}

      <Loader type="RATE_FOOD_ORDER" />
    </ButtonView>
  );
};

Item.propTypes = {};
Item.defaultProps = {};

export default React.memo(Item);
