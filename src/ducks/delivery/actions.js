import { API_ADD_DELIVERY_RATING } from '../../config/WebService';
import {
  ADD_DELIVERY_RATING,
  CANCEL_DELIVERY_ORDER,
  CREATE_DELIVERY,
  FIND_DRIVER,
  GET_ONGOING_ORDER,
  PLACE_DELIVERY_ORDER,
  REPORT_DELIVERY_ORDER,
  RESET_CURRENT_DELIVERY,
  SET_DELIEVERY_PAYMENT_METHOD,
  UPDATE_CURRENT_DELIVERY,
  UPDATE_DELIVERY_INFO,
} from './types';

export function setDeliveryPaymentMethod(data) {
  return { data, type: SET_DELIEVERY_PAYMENT_METHOD };
}

export function updateCurrentDelivery(data, otherInfo) {
  return { data, otherInfo, type: UPDATE_CURRENT_DELIVERY };
}

export function resetCurrentDelivery(id) {
  return { id, type: RESET_CURRENT_DELIVERY };
}

export function updateDeliveryInfo(data = {}) {
  return { data, type: UPDATE_DELIVERY_INFO };
}

export function requestCreateDelivery(payload, onSuccess) {
  return { payload, onSuccess, type: CREATE_DELIVERY.REQUEST };
}

export function successCreateDelivery(data) {
  return { data, type: CREATE_DELIVERY.SUCCESS };
}

export function failureCreateDelivery(errorMessage) {
  return { errorMessage, type: CREATE_DELIVERY.FAILURE };
}

export function requestPlaceDeliveryOrder(payload, onComplete) {
  return { payload, onComplete, type: PLACE_DELIVERY_ORDER.REQUEST };
}

export function successPlaceDeliveryOrder(data) {
  return { data, type: PLACE_DELIVERY_ORDER.SUCCESS };
}

export function failurePlaceDeliveryOrder(errorMessage) {
  return { errorMessage, type: PLACE_DELIVERY_ORDER.FAILURE };
}

export function requestCancelDeliveryOrder(payload, onComplete) {
  return { payload, onComplete, type: CANCEL_DELIVERY_ORDER.REQUEST };
}

export function successCancelDeliveryOrder(data) {
  return { data, type: CANCEL_DELIVERY_ORDER.SUCCESS };
}

export function failureCancelDeliveryOrder(errorMessage) {
  return { errorMessage, type: CANCEL_DELIVERY_ORDER.FAILURE };
}

export function requestFindDriver(payload, onComplete) {
  return { payload, onComplete, type: FIND_DRIVER.REQUEST };
}

export function successFindDriver(data) {
  return { data, type: FIND_DRIVER.SUCCESS };
}

export function failureFindDriver(errorMessage) {
  return { errorMessage, type: FIND_DRIVER.FAILURE };
}

export function requestOngoingOrder(payload, isPullToRefresh, isResetData) {
  return {
    payload,
    isPullToRefresh,
    isResetData,
    type: GET_ONGOING_ORDER.REQUEST,
  };
}

export function successOngoingOrder(data) {
  return { data, type: GET_ONGOING_ORDER.SUCCESS };
}

export function failureOngoingOrder(errorMessage) {
  return { errorMessage, type: GET_ONGOING_ORDER.FAILURE };
}

export function requestAddDeliveryRating(
  payload,
  onComplete,
  url = API_ADD_DELIVERY_RATING
) {
  return { payload, url, onComplete, type: ADD_DELIVERY_RATING.REQUEST };
}

export function successAddDeliveryRating(data) {
  return { data, type: ADD_DELIVERY_RATING.SUCCESS };
}

export function failureAddDeliveryRating(errorMessage) {
  return { errorMessage, type: ADD_DELIVERY_RATING.FAILURE };
}

export function requestReportDeliveryOrder(payload) {
  return { payload, type: REPORT_DELIVERY_ORDER.REQUEST };
}

export function successReportDeliveryOrder(data) {
  return { data, type: REPORT_DELIVERY_ORDER.SUCCESS };
}

export function failureReportDeliveryOrder(errorMessage) {
  return { errorMessage, type: REPORT_DELIVERY_ORDER.FAILURE };
}
