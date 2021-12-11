import {
  ADD_SERVICE_RATING,
  CANCEL_ORDER,
  CHECKOUT,
  GET_BOOKING,
  GET_SERVICE_HISTORY,
  PLACE_ORDER,
  UPDATE_BOOKING,
} from './types';

export function requestServiceHistory(
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
    type: GET_SERVICE_HISTORY.REQUEST,
  };
}

export function successServiceHistory(data, page, reset, identifier) {
  return {
    data,
    page,
    reset,
    identifier,
    type: GET_SERVICE_HISTORY.SUCCESS,
  };
}

export function failureServiceHistory(errorMessage, identifier) {
  return { errorMessage, identifier, type: GET_SERVICE_HISTORY.FAILURE };
}

export function requestUpdateBooking(payload, identifier) {
  return { payload, identifier, type: UPDATE_BOOKING.REQUEST };
}

export function successUpdateBooking(data, identifier) {
  return { data, identifier, type: UPDATE_BOOKING.SUCCESS };
}

export function failureUpdateBooking(errorMessage, identifier) {
  return { errorMessage, identifier, type: UPDATE_BOOKING.FAILURE };
}

export function requestAddServiceRating(payload, url) {
  return { payload, url, type: ADD_SERVICE_RATING.REQUEST };
}

export function successAddServiceRating(data) {
  return { data, type: ADD_SERVICE_RATING.SUCCESS };
}

export function failureAddServiceRating(errorMessage) {
  return { errorMessage, type: ADD_SERVICE_RATING.FAILURE };
}

export function resetCalendarSlots(identifier) {
  return {
    identifier,
    type: GET_SERVICE_HISTORY.RESET,
  };
}

export function requestGetBooking(
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
    type: GET_BOOKING.REQUEST,
  };
}

export function successGetBooking(data, identifier) {
  return {
    data,
    identifier,
    type: GET_BOOKING.SUCCESS,
  };
}

export function failureGetBooking(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: GET_BOOKING.FAILURE,
  };
}
