import {
  ADD_TO_BUYING_CART,
  DELETE_FROM_BUYING_CART,
  GET_BUYING_CART,
  RESET_BUYING_CART,
} from './types';

export function requestAddToBuyingCart(payload, callback = undefined) {
  return { payload, callback, type: ADD_TO_BUYING_CART.REQUEST };
}

export function successAddToBuyingCart(data) {
  return { data, type: ADD_TO_BUYING_CART.SUCCESS };
}

export function failureAddToBuyingCart(payload, errorMessage) {
  return { payload, errorMessage, type: ADD_TO_BUYING_CART.FAILURE };
}

// export function requestGetBuyingCart() {
//   return { type: GET_BUYING_CART.REQUEST };
// }

// export function successGetBuyingCart(data) {
//   return { data, type: GET_BUYING_CART.SUCCESS };
// }

// export function failureGetBuyingCart(payload, errorMessage) {
//   return { payload, errorMessage, type: GET_BUYING_CART.FAILURE };
// }

export function requestDeleteFromBuyingCart(payload) {
  return { payload, type: DELETE_FROM_BUYING_CART.REQUEST };
}

export function successDeleteFromBuyingCart(data) {
  return { data, type: DELETE_FROM_BUYING_CART.SUCCESS };
}

export function failureDeleteFromBuyingCart(payload, errorMessage) {
  return { payload, errorMessage, type: DELETE_FROM_BUYING_CART.FAILURE };
}

export function requestFreshBuyingCart(
  payload,
  isPullToRefresh = false,
  isResetData = false
) {
  return {
    payload,
    isPullToRefresh,
    isResetData,
    type: GET_BUYING_CART.REQUEST,
  };
}

export function successFreshBuyingCart(data) {
  return {
    data,
    type: GET_BUYING_CART.SUCCESS,
  };
}

export function failureFreshBuyingCart(errorMessage) {
  return {
    errorMessage,
    type: GET_BUYING_CART.FAILURE,
  };
}

export function resetCart(params) {
  return { type: RESET_BUYING_CART };
}
