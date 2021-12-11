import { API_ADD_RESTAURANT_RATING } from '../../config/WebService';
import {
  FOOD_ORDERS_LIST,
  GET_DELIVERY_CHARGES,
  GET_FOOD_ORDER,
  PLACE_FOOD_ORDER,
  RATE_FOOD_ORDER,
  RATE_RESTAURANT,
  RESET_FOOD_ORDER,
  UPDATE_FOOD_ORDER,
  REPORT_FOOD_ORDER,
} from './types';

export function requestFoodOrdersList(
  payload,
  reset,
  isPullToRefresh,
  isResetData = false
) {
  return {
    payload,
    reset,
    isPullToRefresh,
    isResetData,
    type: FOOD_ORDERS_LIST.REQUEST,
  };
}

export function successFoodOrdersList(data, page, reset) {
  return {
    data,
    page,
    reset,
    type: FOOD_ORDERS_LIST.SUCCESS,
  };
}

export function failureFoodOrdersList(errorMessage) {
  return { errorMessage, type: FOOD_ORDERS_LIST.FAILURE };
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
    type: GET_FOOD_ORDER.REQUEST,
  };
}

export function successGetOrder(data, identifier) {
  return {
    data,
    identifier,
    type: GET_FOOD_ORDER.SUCCESS,
  };
}

export function failureGetOrder(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: GET_FOOD_ORDER.FAILURE,
  };
}

export function requestAddResturantRating(
  payload,
  onComplete,
  url = API_ADD_RESTAURANT_RATING
) {
  return { payload, url, onComplete, type: RATE_FOOD_ORDER.REQUEST };
}

export function successAddResturantRating(data) {
  return { data, type: RATE_FOOD_ORDER.SUCCESS };
}

export function failureAddResturantRating(errorMessage) {
  return { errorMessage, type: RATE_FOOD_ORDER.FAILURE };
}

export function requestGetDeliveryCharges(payload, address) {
  return { payload, address, type: GET_DELIVERY_CHARGES.REQUEST };
}

export function successGetDeliveryCharges(data) {
  return { data, type: GET_DELIVERY_CHARGES.SUCCESS };
}

export function failureGetDeliveryCharges(errorMessage) {
  return { errorMessage, type: GET_DELIVERY_CHARGES.FAILURE };
}

export function requestPlaceFoodOrder(payload) {
  return { payload, type: PLACE_FOOD_ORDER.REQUEST };
}

export function successPlaceFoodOrder(data) {
  return { data, type: PLACE_FOOD_ORDER.SUCCESS };
}

export function failurePlaceFoodOrder(errorMessage) {
  return { errorMessage, type: PLACE_FOOD_ORDER.FAILURE };
}

export const resetFoodOrder = { type: RESET_FOOD_ORDER };

export function updateFoodOrder(data) {
  return { type: UPDATE_FOOD_ORDER, data };
}

export function requestReportFoodOrder(payload) {
  return {
    payload,
    type: REPORT_FOOD_ORDER.REQUEST,
  };
}

export function successReportFoodOrder(data) {
  return {
    data,
    type: REPORT_FOOD_ORDER.SUCCESS,
  };
}

export function failureReportFoodOrder(errorMessage) {
  return {
    errorMessage,
    type: REPORT_FOOD_ORDER.FAILURE,
  };
}
