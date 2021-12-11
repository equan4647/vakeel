import React from 'react';
import { useSelector } from 'react-redux';

import { ActionButton } from '..';
import { getFoodCartItems } from '../../ducks/foodCart/selectors';
import { AppUtil, NavigationService, Util } from '../../utils';
import { ViewPropTypes } from 'react-native';
import { foodOrdersSelectors } from '../../ducks/foodOrders';

const FoodActionButton = ({ containerStyle }) => {
  const buyingCart = useSelector(getFoodCartItems),
    activeOrder = useSelector(foodOrdersSelectors.getOrderInProgress),
    badgeCount = buyingCart.reduce(
      (acc, value) => acc + Number(value?.quantity),
      0
    );

  if (
    Util.isStatusInProgress(activeOrder) ||
    Util.isStatusPending(activeOrder)
  ) {
    return null;
  }

  const navigateToFoodCart = () =>
    AppUtil.doIfAuthorized(() =>
      NavigationService.navigate('FoodCart', {}, 'FoodCartStack')
    );

  return (
    <ActionButton
      {...{ badgeCount, containerStyle }}
      onPress={navigateToFoodCart}
    />
  );
};

FoodActionButton.propTypes = {
  containerStyle: ViewPropTypes.style,
};

FoodActionButton.defaultProps = {};

export default FoodActionButton;
