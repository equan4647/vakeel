import {
  CREATE_ADVERTISE,
  ADVERTISING_LIST,
  ADVERTISIEMENT_VIEW,
  ADVERTISIEMENT_CLICKED,
  ADVERTISIEMENT_STATS,
  GET_SINGLE_ADVERTISIEMENT,
  REPORT_ADVERTISIEMENT,
  GET_ADVERTISIEMENT,
} from './types';

export function requestAdvertisingListing(
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
    type: ADVERTISING_LIST.REQUEST,
  };
}

export function successAdvertisingListing(data, page, reset, identifier) {
  return {
    data,
    page,
    reset,
    identifier,
    type: ADVERTISING_LIST.SUCCESS,
  };
}

export function failureAdvertisingListing(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: ADVERTISING_LIST.FAILURE,
  };
}

export function requestCreateAdvertise(payload, identifier, onSuccess) {
  return {
    payload,
    identifier,
    onSuccess,
    type: CREATE_ADVERTISE.REQUEST,
  };
}

export function successCreateAdvertise(data, identifier) {
  return {
    data,
    identifier,
    type: CREATE_ADVERTISE.SUCCESS,
  };
}

export function failureCreateAdvertise(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: CREATE_ADVERTISE.FAILURE,
  };
}

export function requestAdvertismentView(payload, identifier) {
  return {
    payload,
    identifier,
    type: ADVERTISIEMENT_VIEW.REQUEST,
  };
}

export function successAdvertismentView(data) {
  return {
    data,
    type: ADVERTISIEMENT_VIEW.SUCCESS,
  };
}

export function failureAdvertismentView(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: ADVERTISIEMENT_VIEW.FAILURE,
  };
}

export function requestAdvertismentClick(payload, identifier) {
  return {
    payload,
    identifier,
    type: ADVERTISIEMENT_CLICKED.REQUEST,
  };
}

export function successAdvertismentClick(data) {
  return {
    data,
    type: ADVERTISIEMENT_CLICKED.SUCCESS,
  };
}

export function failureAdvertismentClick(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: ADVERTISIEMENT_CLICKED.FAILURE,
  };
}

export function requestAdvertismentStats(payload, onSuccess, onFailure) {
  return {
    payload,
    onSuccess,
    onFailure,
    type: ADVERTISIEMENT_STATS.REQUEST,
  };
}

export function requestReportAd(payload) {
  return {
    payload,
    type: REPORT_ADVERTISIEMENT.REQUEST,
  };
}

export function successReportAd() {
  return {
    type: REPORT_ADVERTISIEMENT.SUCCESS,
  };
}

export function requestSingleAdvertisment(payload, onSuccess, onFailure) {
  return {
    payload,
    onSuccess,
    onFailure,
    type: GET_SINGLE_ADVERTISIEMENT.REQUEST,
  };
}

export function successSingleAdvertisment(data) {
  return {
    data,
    type: GET_SINGLE_ADVERTISIEMENT.SUCCESS,
  };
}

export function failureSingleAdvertisment(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: GET_SINGLE_ADVERTISIEMENT.FAILURE,
  };
}

export function resetAdvertismentList(identifier) {
  return {
    identifier,
    type: ADVERTISING_LIST.RESET,
  };
}

export function requestGetAdvertisment(
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
    type: GET_ADVERTISIEMENT.REQUEST,
  };
}

export function successGetAdvertisment(data, identifier) {
  return {
    data,
    identifier,
    type: GET_ADVERTISIEMENT.SUCCESS,
  };
}

export function failureGetAdvertisment(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: GET_ADVERTISIEMENT.FAILURE,
  };
}
