import {
  ADD_PAYMENT_METHOD,
  DELETE_PAYMENT_METHOD,
  GET_CARD_LIST,
  GET_WALLET,
  RESET_WALLET,
  SAVE_PREFFERED_CARD,
} from './types';

export function requestAddPaymentMethod(payload) {
  return { payload, type: ADD_PAYMENT_METHOD.REQUEST };
}

export function successAddPaymentMethod(data) {
  return { data, type: ADD_PAYMENT_METHOD.SUCCESS };
}

export function failureAddPaymentMethod(errorMessage) {
  return { errorMessage, type: ADD_PAYMENT_METHOD.FAILURE };
}

export function requestDeletePaymentMethod(payload) {
  return { payload, type: DELETE_PAYMENT_METHOD.REQUEST };
}

export function successDeletePaymentMethod(data) {
  return { data, type: DELETE_PAYMENT_METHOD.SUCCESS };
}

export function failureDeletePaymentMethod(errorMessage) {
  return { errorMessage, type: DELETE_PAYMENT_METHOD.FAILURE };
}

export function requestGetWallet(payload) {
  return { payload, type: GET_WALLET.REQUEST };
}

export function successGetWallet(data) {
  return { data, type: GET_WALLET.SUCCESS };
}

export function failureGetWallet(errorMessage) {
  return { errorMessage, type: GET_WALLET.FAILURE };
}

export function resetWallet() {
  return { type: RESET_WALLET };
}

export function savePreferedCard(id) {
  return { type: SAVE_PREFFERED_CARD, id };
}

export function requestCardList(
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
    type: GET_CARD_LIST.REQUEST,
  };
}

export function successCardList(data, page, reset) {
  return {
    data,
    page,
    reset,
    type: GET_CARD_LIST.SUCCESS,
  };
}

export function failureCardList(errorMessage) {
  return { errorMessage, type: GET_CARD_LIST.FAILURE };
}
