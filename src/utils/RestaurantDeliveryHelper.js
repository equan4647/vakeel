import { resetFoodCart } from '../ducks/foodCart/actions';
import { foodOrdersSelectors } from '../ducks/foodOrders';
import {
  requestAddResturantRating,
  resetFoodOrder,
  updateFoodOrder,
} from '../ducks/foodOrders/actions';

import { NavigationService, Util, DataHandler } from '.';
import {
  ORDER_STATUS,
  MODULE,
  NOTIFICATION_IDENTIFIERS,
} from '../config/Constants';
import { DeliveryUtil, FoodUtil } from '../DataUtils';
import { strings } from './i18n';
import { getOrderInProgress } from '../ducks/foodOrders/selectors';

function isMessageForRestaurantDelivery(message) {
  const { getState } = DataHandler.getStore();
  const activeOrder = foodOrdersSelectors.getOrderInProgress(getState());
  return (
    message?.fields?.args[1]?.roomName ==
    DeliveryUtil.orderChatRoomName(activeOrder)
  );
}

function handleRestaurantDelivery(message) {
  const { getState, dispatch } = DataHandler.getStore(),
    activeOrder = foodOrdersSelectors.getOrderInProgress(getState());

  const msgOrderObject = JSON.parse(message?.fields?.args[0]?.msg);

  switch (Util.getStatus(msgOrderObject)) {
    case ORDER_STATUS.CANCELLED_DUE_TO_PAYMENT_ERROR:
      Util.hideBlurView(MODULE.FOOD);
      dispatch(resetFoodOrder);

      if (Util.isRouteActive('FoodOrderInProgress')) {
        NavigationService.goBack();
      }
      Util.showMessage(strings('app.insufficient_amount'));

      break;

    case ORDER_STATUS.NO_DRIVER_FOUND:
      Util.hideBlurView(MODULE.FOOD);
      dispatch(resetFoodOrder);

      if (Util.isRouteActive('FoodOrderInProgress')) {
        NavigationService.goBack();
      }
      Util.showMessage(strings('app.no_driver_found'));
      break;

    case ORDER_STATUS.IN_PROGRESS:
      dispatch(updateFoodOrder(msgOrderObject));
      if (Util.isStatusPending(activeOrder)) {
        dispatch(resetFoodCart);
        Util.hideBlurView(MODULE.FOOD);

        if (Util.isRouteActive('FoodOrderInProgress')) {
          NavigationService.reset('FoodOrderDetail', {
            isHistory: false,
          });
        } else {
          Util.showMessage(strings('app.order_accepted'), 'success');
        }
      }
      break;

    case ORDER_STATUS.DELIVERED:
      dispatch(updateFoodOrder(msgOrderObject));
      const name = NavigationService.getCurrentRoute().name ?? '';
      const isHistory =
        NavigationService.getCurrentRoute()?.params?.isHistory ?? true;
      if (
        (name === 'FoodOrderDetail' && !isHistory) ||
        name === 'FoodTabHome'
      ) {
        showRatingModal();
      }
      break;

    case ORDER_STATUS.CANCELLED:
      dispatch(updateFoodOrder(msgOrderObject));
      Util.showMessage(strings('app.order_cancelled_by_restaurant_msg'));
      break;
  }
}

function isRestaurantNotification(identifier) {
  const {
    RESTURANT_ORDER_COMPLETED,
    RESTURANT_ORDER_CANCELLED,
    RESTURANT_ORDER_DELIVERED,
  } = NOTIFICATION_IDENTIFIERS;
  return [
    RESTURANT_ORDER_COMPLETED,
    RESTURANT_ORDER_CANCELLED,
    RESTURANT_ORDER_DELIVERED,
  ].includes(identifier);
}

function isRestaurantDeliveryNotification(identifier) {
  const {
    RESTURANT_DRIVER_FOUND,
    RESTURANT_DRIVER_ARRIVED,
  } = NOTIFICATION_IDENTIFIERS;
  return [RESTURANT_DRIVER_FOUND, RESTURANT_DRIVER_ARRIVED].includes(
    identifier
  );
}

function showRatingModal() {
  const { getState } = DataHandler.getStore(),
    data = getOrderInProgress(getState());

  DataHandler.getCompletedModalRef().show({
    submitAction: requestAddResturantRating,
    title: strings('app.items_delivered'),

    onComplete: () => NavigationService.navigate('FoodTabHome'),

    requestFlag: 'RATE_FOOD_ORDER',
    extraPayload: {
      resturant_id: FoodUtil.getRestaurantID(data),
      order_id: FoodUtil.isBringerEnabled(data)
        ? FoodUtil.getRestaurantOrderID(data)
        : Util.getID(data),
    },
  });
}

export {
  showRatingModal,
  isMessageForRestaurantDelivery,
  handleRestaurantDelivery,
  isRestaurantNotification,
  isRestaurantDeliveryNotification,
};
