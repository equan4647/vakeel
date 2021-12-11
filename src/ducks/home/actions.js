import {
  GET_HOME_MARKETPLACE,
  GET_HOME_CLASSIFIED,
  GET_HOME_SERVICES,
  GET_HOME_FOOD,
} from './types';

export function requestMarketPlaceHome(
  payload,
  isPullToRefresh = false,
  isResetData = false
) {
  return {
    payload,
    isPullToRefresh,
    isResetData,
    type: GET_HOME_MARKETPLACE.REQUEST,
  };
}

export function successMarketPlaceHome(data) {
  return { data, type: GET_HOME_MARKETPLACE.SUCCESS };
}

export function failureMarketPlaceHome(errorMessage) {
  return { errorMessage, type: GET_HOME_MARKETPLACE.FAILURE };
}

export function requestFoodHome(
  payload,
  isPullToRefresh = false,
  isResetData = false
) {
  return {
    payload,
    isPullToRefresh,
    isResetData,
    type: GET_HOME_FOOD.REQUEST,
  };
}

export function successFoodHome(data) {
  return { data, type: GET_HOME_FOOD.SUCCESS };
}

export function failureFoodHome(errorMessage) {
  return { errorMessage, type: GET_HOME_FOOD.FAILURE };
}

export function requestClassifiedHome(
  payload,
  isPullToRefresh = false,
  isResetData = false
) {
  return {
    payload,
    isPullToRefresh,
    isResetData,
    type: GET_HOME_CLASSIFIED.REQUEST,
  };
}

export function successClassifiedHome(data) {
  return {
    data,
    type: GET_HOME_CLASSIFIED.SUCCESS,
  };
}

export function failureClassifiedHome(errorMessage) {
  return {
    errorMessage,
    type: GET_HOME_CLASSIFIED.FAILURE,
  };
}

export function requestServicesHome(
  payload,
  isPullToRefresh = false,
  isResetData = false
) {
  return {
    payload,
    isPullToRefresh,
    isResetData,
    type: GET_HOME_SERVICES.REQUEST,
  };
}

export function successServicesHome(data) {
  return {
    data,
    type: GET_HOME_SERVICES.SUCCESS,
  };
}

export function failureServicesHome(errorMessage) {
  return {
    errorMessage,
    type: GET_HOME_SERVICES.FAILURE,
  };
}
