import {
  ADD_SERVICE_TO_FAVORITE,
  BOOK_APPOINTMENT,
  SERVICES_LIST,
  SET_SERVICES,
  AVAILABLE_SLOTS,
  REPORT_SERVICE,
} from './types';

export function requestServicesListing(
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
    type: SERVICES_LIST.REQUEST,
  };
}

export function successServicesListing(data, page, reset, identifier) {
  return {
    data,
    page,
    reset,
    identifier,
    type: SERVICES_LIST.SUCCESS,
  };
}

export function failureServicesListing(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: SERVICES_LIST.FAILURE,
  };
}

export function setServices(identifier, data) {
  return {
    identifier,
    data,
    reset: true,
    type: SET_SERVICES,
  };
}

export function resetListServices(identifier) {
  return {
    identifier,
    type: SERVICES_LIST.RESET,
  };
}

export function requestAddtoFavorite(service_id, isFavourite, user_id) {
  return {
    service_id,
    isFavourite,
    user_id,
    type: ADD_SERVICE_TO_FAVORITE.REQUEST,
  };
}

export function successAddtoFavorite() {
  return {
    type: ADD_SERVICE_TO_FAVORITE.SUCCESS,
  };
}

export function failureAddtoFavorite(payload, isFavourite, errorMessage) {
  return {
    payload,
    isFavourite,
    errorMessage,
    type: ADD_SERVICE_TO_FAVORITE.FAILURE,
  };
}

export function requestBookAppointment(payload, onSuccess) {
  return {
    payload,
    onSuccess,
    type: BOOK_APPOINTMENT.REQUEST,
  };
}

export function successBookAppointment(data) {
  return {
    data,
    type: BOOK_APPOINTMENT.SUCCESS,
  };
}

export function failureBookAppointment(errorMessage) {
  return {
    errorMessage,
    type: BOOK_APPOINTMENT.FAILURE,
  };
}

export function requestAvailableBookingSlots(payload) {
  return {
    payload,
    type: AVAILABLE_SLOTS.REQUEST,
  };
}

export function successAvailableBookingSlots(data, payload) {
  return {
    data,
    payload,
    type: AVAILABLE_SLOTS.SUCCESS,
  };
}

export function failureAvailableBookingSlots(errorMessage) {
  return {
    errorMessage,
    type: AVAILABLE_SLOTS.FAILURE,
  };
}

export function resetAvailableBookingSlots() {
  return {
    type: AVAILABLE_SLOTS.RESET,
  };
}

export function requestReportService(payload) {
  return {
    payload,
    type: REPORT_SERVICE.REQUEST,
  };
}

export function successReportService(data) {
  return {
    data,
    type: REPORT_SERVICE.SUCCESS,
  };
}

export function failureReportService(errorMessage) {
  return {
    errorMessage,
    type: REPORT_SERVICE.FAILURE,
  };
}
