import { Util } from '../../utils';

const defaultObject = {};

export const getDeliveryInfo = store => store.delivery.delivery_info;

export const getOngoingDelivery = store => store.delivery.onGoingOrder;

export const getActiveOrder = store =>
  store.delivery?.current_delivery ?? defaultObject;

export const isOrderActive = store =>
  Util.isStatusPending(getActiveOrder(store)) ||
  Util.isStatusInProgress(getActiveOrder(store));
