import { Util } from '../../utils';

const defaultList = [];
const defaultObject = {};

export const getOrdersData = store => store.foodOrders.data;

export const getOrdersList = store => store.foodOrders.ids ?? defaultList;

export const getOrderItem = id => store =>
  store.foodOrders.data?.[id] ?? defaultObject;

export const getOrderInProgress = store =>
  store.foodOrders?.orderInProgress ?? defaultObject;

export const isOrderInProgress = store => {
  const _data = store.foodOrders?.orderInProgress ?? {};

  return Util.isNotEmpty(_data) && Util.isStatusInProgress(_data);
};

export const isOrderInProgressOrPending = store =>
  Util.isStatusPending(getOrderInProgress(store)) ||
  Util.isStatusInProgress(getOrderInProgress(store));
