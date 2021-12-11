import {
  CANCEL_ORDER,
  CHECKOUT,
  GET_ORDERS,
  PLACE_ORDER,
  GET_ORDER,
} from './types';

export function requestGetOrders(
  payload,
  reset,
  isPullToRefresh,
  identifier,
  isResetData = false
) {
  return {
    payload,
    reset,
    isPullToRefresh,
    identifier,
    isResetData,
    type: GET_ORDERS.REQUEST,
  };
}

export function successGetOrders(data, page, reset, identifier) {
  return {
    data,
    page,
    reset,
    identifier,
    type: GET_ORDERS.SUCCESS,
  };
}

export function failureGetOrders(errorMessage, identifier) {
  return { errorMessage, identifier, type: GET_ORDERS.FAILURE };
}

export function requestCheckout(payload) {
  return { payload, type: CHECKOUT.REQUEST };
}

export function successCheckout(data) {
  return { data, type: CHECKOUT.SUCCESS };
}

export function failureCheckout(errorMessage) {
  return { errorMessage, type: CHECKOUT.FAILURE };
}

export function requestPlaceOrder(payload, callback) {
  return { payload, callback, type: PLACE_ORDER.REQUEST };
}

export function successPlaceOrder(data, card_token) {
  return { data, card_token, type: PLACE_ORDER.SUCCESS };
}

export function failurePlaceOrder(errorMessage) {
  return { errorMessage, type: PLACE_ORDER.FAILURE };
}

export function requestCancelOrder(payload) {
  return { payload, type: CANCEL_ORDER.REQUEST };
}

export function successCancelOrder(data) {
  return { data, type: CANCEL_ORDER.SUCCESS };
}

export function failureCancelOrder(errorMessage) {
  return { errorMessage, type: CANCEL_ORDER.FAILURE };
}

export function requestGetOrder(
  payload,
  isPullToRefresh = false,
  identifier,
  isResetData = false
) {
  return {
    payload,
    isPullToRefresh,
    identifier,
    isResetData,
    type: GET_ORDER.REQUEST,
  };
}

export function successGetOrder(data, identifier) {
  return {
    data,
    identifier,
    type: GET_ORDER.SUCCESS,
  };
}

export function failureGetOrder(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: GET_ORDER.FAILURE,
  };
}
