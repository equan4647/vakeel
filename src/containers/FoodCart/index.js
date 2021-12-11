import React from 'react';
import { FlatList, Image, View } from 'react-native';
import { useSelector } from 'react-redux';

import { AmountRow, BottomButton, EmptyView } from '../../common';
import { Text } from '../../components';
import styles from './styles';
import Item from './Item';

import { NavigationService } from '../../utils';
import { Images } from '../../theme';
import { strings } from '../../utils/i18n';
import { FoodUtil } from '../../DataUtils';
import {
  getFoodCartItemKeys,
  getRestaurantFromCart,
  getFoodCartItems,
} from '../../ducks/foodCart/selectors';

const HireBringer = () => (
  <View style={styles.bringer}>
    <Image style={styles.bringerImg} source={Images.icons.bringer} />
    <Text>{strings('app.proceed_to_hire_bringer')}</Text>
  </View>
);

const ListHeader = React.memo(() => {
  const data = useSelector(getRestaurantFromCart),
    cartItemKeys = useSelector(getFoodCartItemKeys);
  if (cartItemKeys.length) {
    return (
      <>
        <Text size="size_16" type="bold">
          {FoodUtil.getRestaurantName(data)}
        </Text>

        <View style={styles.spreadRow}>
          <Text>{strings('app.estimated_delivery')}</Text>
          <Text size="size_16" type="bold">
            {FoodUtil.estTime(data)}
          </Text>
        </View>
      </>
    );
  }
  return null;
});

const Footer = React.memo(({ total }) => {
  const cartRestaurant = useSelector(getRestaurantFromCart),
    cartItemKeys = useSelector(getFoodCartItemKeys);
  if (cartItemKeys.length) {
    return (
      <>
        <AmountRow
          title={strings('app.subtotal')}
          amount={total}
          style={styles.subTotal}
        />

        {FoodUtil.isDeliveryEnabled(cartRestaurant) ? (
          <Text style={styles.deliveryAvailablity}>
            {strings('app.restaurant_delivery_available')}
          </Text>
        ) : (
          <>
            <Text style={styles.deliveryAvailablity}>
              {strings('app.restaurant_delivery_not_available')}
            </Text>
            <HireBringer />
          </>
        )}
      </>
    );
  }
  return null;
});

const FoodCart = ({ navigation }) => {
  NavigationService.setCrossBackHeader(navigation, strings('app.my_cart'));

  const cartItemKeys = useSelector(getFoodCartItemKeys),
    cartItems = useSelector(getFoodCartItems),
    total = FoodUtil.calculateTotal(cartItems);

  return [
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      data={cartItemKeys}
      ListHeaderComponent={() => <ListHeader />}
      ListFooterComponent={() => <Footer {...{ total }} />}
      renderItem={({ item: id }) => <Item {...{ id }} />}
      ListEmptyComponent={
        <EmptyView
          withoutArrow
          image="cart"
          text={strings('app.mycart_empty_text')}
          containerStyle={styles.emptyContainerStyle}
        />
      }
    />,

    <BottomButton
      title={strings('app.review_payment_and_address')}
      onPress={() => NavigationService.navigate('FoodOrderInProgress')}
      disabled={!cartItemKeys.length}
    />,
  ];
};
export default FoodCart;
