import { GET_DELIVERY_HISTORY } from './types';

export function requestGetDeliveryHistory(
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
    type: GET_DELIVERY_HISTORY.REQUEST,
  };
}

export function successGetDeliveryHistory(data, page, reset) {
  return {
    data,
    page,
    reset,
    type: GET_DELIVERY_HISTORY.SUCCESS,
  };
}

export function failureGetDeliveryHistory(errorMessage) {
  return { errorMessage, type: GET_DELIVERY_HISTORY.FAILURE };
}
