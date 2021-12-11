// @flow
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Util } from '.';
import { BuyingCartUtil, FoodOrderUtil, FoodUtil } from '../DataUtils';
import { requestAddToBuyingCart } from '../ducks/buyingCart/actions';
import { getProductCartItem } from '../ducks/buyingCart/selectors';
import { changeItemQuantity } from '../ducks/foodCart/actions';
import { getFoodItemFromCart } from '../ducks/foodCart/selectors';
import { getNetworkInfo } from '../ducks/network/selectors';
import { restaurantsActions } from '../ducks/restaurants';
import { isGuest as isGuestRole } from '../ducks/auth/selectors';
import { strings } from './i18n';
import AppUtil from './AppUtil';
import {
  API_ADD_RESTAURANT_RATING,
  API_UPDATE_RESTAURANT_RATING,
} from '../config/WebService';
import { requestAddResturantRating } from '../ducks/foodOrders/actions';
import NavigationService from './NavigationService';
import { foodOrdersSelectors } from '../ducks/foodOrders';

export const useInputProps = (formObj, name) => {
  const { control, errors } = formObj;
  const inputRef = useRef(null);
  return { forwardRef: inputRef, control, name, error: errors[name] };
};

export const useProductCartHandle = (id, attrId) => {
  const dispatch = useDispatch();

  const cartItemData = useSelector(getProductCartItem(attrId));
  const isNetworkConnected = useSelector(getNetworkInfo);

  const inStockQuantity = BuyingCartUtil.getStockCount(cartItemData);
  const count = BuyingCartUtil.getQuantity(cartItemData);

  const updateCart = (_count, callback = undefined) => {
    if (isNetworkConnected) {
      dispatch(
        requestAddToBuyingCart(
          {
            product_id: id,
            product_attribute_id: attrId,
            quantity: _count,
          },
          callback
        )
      );
    } else {
      Util.showMessage(strings('api_error_messages.network_not_available'));
    }
  };

  const onIncrement = () => {
    if (count == inStockQuantity) {
      Util.showMessage(strings('app.quantity_exceed_cart_message'));
    } else {
      updateCart(Number(count) + 1);
    }
  };

  const onDecrement = () => {
    if (count > 1) {
      updateCart(Number(count) - 1);
    }
  };
  return { updateCart, onIncrement, onDecrement, countInCart: count };
};

export function useFavToggleRestaurant(id) {
  const dispatch = useDispatch(),
    isNetworkConnected = useSelector(getNetworkInfo);

  let addToFav = () => {
    if (isNetworkConnected) {
      dispatch(restaurantsActions.requestAddToFavorite(id));
    } else {
      Util.showMessage(strings('api_error_messages.network_not_available'));
    }
  };

  const toggleFavorite = () => AppUtil.doIfAuthorized(addToFav);

  return toggleFavorite;
}

export function useFoodCartUtil(itemID) {
  const itemData = useSelector(getFoodItemFromCart(itemID)),
    dispatch = useDispatch();

  const changeQuantity = (quantity = 0) =>
    dispatch(changeItemQuantity(itemID, quantity));

  const onIncrement = () => {
    let quantity = FoodUtil.foodItemQuantity(itemData);
    quantity++;
    changeQuantity(quantity);
  };

  const onDecrement = () => {
    let quantity = FoodUtil.foodItemQuantity(itemData);
    if (quantity > 1) {
      quantity--;
      changeQuantity(quantity);
    }
  };

  const onRemove = () =>
    Util.showAlertConfirm(
      strings('app.are_you_sure'),
      strings('messages.food_cart_remove_title'),
      strings('app.confirm'),
      changeQuantity
    );

  return { onIncrement, onDecrement, onRemove };
}

export function useUserRole() {
  const isGuest = useSelector(isGuestRole);
  return isGuest;
}

export function useFoodOrderRating(data) {
  const dispatch = useDispatch(),
    isRated = FoodOrderUtil.isRated(data),
    ratingObject = FoodOrderUtil.getRatingData(data);

  const submitRating = values => {
    const payload = {
      rating: values.rating,
      review: values.description,
      resturant_id: FoodUtil.getRestaurantID(data),
      order_id: Util.getID(data),
    };

    if (isRated) {
      payload.id = Util.getID(ratingObject);
    }

    const url = isRated
      ? API_UPDATE_RESTAURANT_RATING
      : API_ADD_RESTAURANT_RATING;

    dispatch(requestAddResturantRating(payload, NavigationService.goBack, url));
  };

  const reviewFoodOrder = () =>
    NavigationService.navigate('Review', {
      submitRating,
      reviewData: ratingObject,
    });

  return reviewFoodOrder;
}
