import {
  PRODUCT_LIST,
  SET_PRODUCTS,
  ADD_PRODUCT_TO_FAVORITE,
  REMOVE_PRODUCT_FROM_FAVORITE,
  GET_PRODUCT,
} from './types';

export function requestProductListing(
  payload,
  reset,
  isPullToRefresh,
  identifier,
  url,
  isResetData = false
) {
  return {
    payload,
    reset,
    isPullToRefresh,
    identifier,
    url,
    isResetData,
    type: PRODUCT_LIST.REQUEST,
  };
}

export function successProductListing(data, page, reset, identifier) {
  return {
    data,
    page,
    reset,
    identifier,
    type: PRODUCT_LIST.SUCCESS,
  };
}

export function failureProductListing(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: PRODUCT_LIST.FAILURE,
  };
}

export function setProducts(identifier, data) {
  return {
    identifier,
    data,
    reset: true,
    type: SET_PRODUCTS,
  };
}

export function requestAddtoFavorite(payload) {
  return { payload, type: ADD_PRODUCT_TO_FAVORITE.REQUEST };
}

export function successAddtoFavorite(data) {
  return { data, type: ADD_PRODUCT_TO_FAVORITE.SUCCESS };
}

export function failureAddtoFavorite(payload, errorMessage) {
  return { payload, errorMessage, type: ADD_PRODUCT_TO_FAVORITE.FAILURE };
}

export function requestRemoveFromFavorite(payload) {
  return { payload, type: REMOVE_PRODUCT_FROM_FAVORITE.REQUEST };
}

export function successRemoveFromFavorite(data) {
  return { data, type: REMOVE_PRODUCT_FROM_FAVORITE.SUCCESS };
}

export function failureRemoveFromFavorite(payload, errorMessage) {
  return { payload, errorMessage, type: REMOVE_PRODUCT_FROM_FAVORITE.FAILURE };
}

export function resetListBuying(identifier) {
  return {
    identifier,
    type: PRODUCT_LIST.RESET,
  };
}

export function requestGetProduct(
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
    type: GET_PRODUCT.REQUEST,
  };
}

export function successGetProduct(data, identifier) {
  return {
    data,
    identifier,
    type: GET_PRODUCT.SUCCESS,
  };
}

export function failureGetProduct(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: GET_PRODUCT.FAILURE,
  };
}
