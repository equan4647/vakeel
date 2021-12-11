import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text, ButtonView, ImageViewHttpRound } from '../../../components';
import { AppStyles, Metrics } from '../../../theme';
import styles from './styles';
import { FoodUtil } from '../../../DataUtils';
import { useDispatch, useSelector } from 'react-redux';
import { addFoodToCart } from '../../../ducks/foodCart/actions';
import {
  getQuantityOfItemInCart,
  getRestaurantIdFromCart,
} from '../../../ducks/foodCart/selectors';
import { AppUtil, Util } from '../../../utils';
import { strings } from '../../../utils/i18n';
import { getRestaurantItem } from '../../../ducks/restaurants/selectors';
import { foodOrdersSelectors } from '../../../ducks/foodOrders';

const Item = ({ data, borderBottomWidth }) => {
  const count = useSelector(getQuantityOfItemInCart(FoodUtil.getID(data))),
    restaurantIdInCart = useSelector(getRestaurantIdFromCart),
    restaurantID = FoodUtil.getRestaurantID(data),
    restaurantData = useSelector(getRestaurantItem(restaurantID)),
    activeOrder = useSelector(foodOrdersSelectors.getOrderInProgress),
    orderIsActive =
      Util.isStatusPending(activeOrder) || Util.isStatusInProgress(activeOrder);

  const dispatch = useDispatch();

  const onPressItem = () =>
    AppUtil.doIfAuthorized(() => {
      function updateCart() {
        dispatch(addFoodToCart(data, restaurantData));
      }
      if (orderIsActive) {
        Util.showMessage('Your last order is still in progress');
      } else {
        if (
          Util.isNotEmpty(restaurantIdInCart) &&
          restaurantIdInCart !== restaurantID
        ) {
          Util.showAlertConfirm(
            strings('app.assert_change_restaurant'),
            '',
            strings('app.confirm'),
            updateCart
          );
        } else {
          updateCart();
        }
      }
    });
  return (
    <ButtonView
      style={[styles.itemContainer, { borderBottomWidth }]}
      onPress={onPressItem}
    >
      <View style={AppStyles.flex1}>
        <Text size="size_16">{FoodUtil.foodItemTitle(data)}</Text>

        <Text style={styles.description}>
          {FoodUtil.foodItemDescription(data)}
        </Text>

        <Text size="size_14" type="bold">
          {FoodUtil.foodItemPrice(data)}
        </Text>
      </View>

      <View>
        <ImageViewHttpRound
          url={FoodUtil.foodItemImage(data)}
          size={60}
          //style={styles.itemImage}
          //placeholderStyle={styles.itemImage}
          borderRadius={Metrics.smallMargin}
        />

        {count !== 0 ? (
          <View style={styles.countCircle}>
            <Text size="size_12" type="bold" color="white">
              {count}
            </Text>
          </View>
        ) : null}
      </View>
    </ButtonView>
  );
};

const CategoryDetail = ({ data }) => {
  const itemLength = data?.items?.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title} size="size_22" type="bold">
        {FoodUtil.CuisineTitle(data)}
      </Text>

      {data?.items?.map((itemInner, index) => (
        <Item
          data={itemInner}
          borderBottomWidth={index === itemLength - 1 ? 0 : 1}
          key={index}
        />
      ))}
      <View style={styles.separator} />
    </View>
  );
};

CategoryDetail.propTypes = {
  data: PropTypes.object.isRequired,
};
CategoryDetail.defaultProps = { isHorizontal: false, hasCurrency: false };

export default React.memo(CategoryDetail);
