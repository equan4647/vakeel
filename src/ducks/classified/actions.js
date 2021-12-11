import {
  CLASSIFIED_LIST,
  SET_CLASSIFIED,
  CLASSIFIED_ADD,
  ADD_CLASSIFIED_TO_FAVORITE,
  REPORT_CLASSIFIED,
  USER_PROFILE,
  REPORT_USER_CLASSIFIED,
  DELETE_CLASSIFIED,
  GET_CLASSIFIED,
} from './types';

export function requestClassifiedListing(
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
    type: CLASSIFIED_LIST.REQUEST,
  };
}

export function successClassifiedListing(data, page, reset, identifier) {
  return {
    data,
    page,
    reset,
    identifier,
    type: CLASSIFIED_LIST.SUCCESS,
  };
}

export function failureClassifiedListing(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: CLASSIFIED_LIST.FAILURE,
  };
}

export function setClassifieds(identifier, data) {
  return {
    identifier,
    data,
    reset: true,
    type: SET_CLASSIFIED,
  };
}

export function requestClassifiedAd(payload) {
  return {
    payload,
    type: CLASSIFIED_ADD.REQUEST,
  };
}

export function successClassifiedAd(data) {
  return {
    data,
    type: CLASSIFIED_ADD.SUCCESS,
  };
}

export function failureClassifiedAd(errorMessage) {
  return {
    errorMessage,
    type: CLASSIFIED_ADD.FAILURE,
  };
}

export function resetListClassified(identifier) {
  return {
    identifier,
    type: CLASSIFIED_LIST.RESET,
  };
}

export function requestAddtoFavorite(product_id, isFavourite) {
  return {
    product_id,
    isFavourite,
    type: ADD_CLASSIFIED_TO_FAVORITE.REQUEST,
  };
}

export function successAddtoFavorite() {
  return {
    type: ADD_CLASSIFIED_TO_FAVORITE.SUCCESS,
  };
}

export function failureAddtoFavorite(product_id, isFavourite, errorMessage) {
  return {
    product_id,
    isFavourite,
    errorMessage,
    type: ADD_CLASSIFIED_TO_FAVORITE.FAILURE,
  };
}

export function requestReportProduct(payload) {
  return {
    payload,
    type: REPORT_CLASSIFIED.REQUEST,
  };
}

export function successReportProduct() {
  return {
    type: REPORT_CLASSIFIED.SUCCESS,
  };
}

export function failureReportProduct(errorMessage) {
  return {
    errorMessage,
    type: REPORT_CLASSIFIED.FAILURE,
  };
}

export function requestUserProfile(
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
    type: USER_PROFILE.REQUEST,
  };
}

export function successUserProfile(identifier, data) {
  return {
    identifier,
    data,
    type: USER_PROFILE.SUCCESS,
  };
}

export function failureUserProfile(identifier, errorMessage) {
  return {
    identifier,
    errorMessage,
    type: USER_PROFILE.FAILURE,
  };
}

export function requestReportUserClassified(payload) {
  return {
    payload,
    type: REPORT_USER_CLASSIFIED.REQUEST,
  };
}

export function successReportUserClassified() {
  return {
    type: REPORT_USER_CLASSIFIED.SUCCESS,
  };
}

export function failureReportUserClassified(errorMessage) {
  return {
    errorMessage,
    type: REPORT_USER_CLASSIFIED.FAILURE,
  };
}

export function requestDeleteClassified(classifiedId) {
  return {
    classifiedId,
    type: DELETE_CLASSIFIED.REQUEST,
  };
}

export function successDeleteClassified(classifiedId) {
  return {
    classifiedId,
    type: DELETE_CLASSIFIED.SUCCESS,
  };
}

export function failureDeleteClassified(errorMessage) {
  return {
    errorMessage,
    type: DELETE_CLASSIFIED.FAILURE,
  };
}

export function requestGetClassified(
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
    type: GET_CLASSIFIED.REQUEST,
  };
}

export function successGetClassified(data, identifier) {
  return {
    data,
    identifier,
    type: GET_CLASSIFIED.SUCCESS,
  };
}

export function failureGetClassified(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: GET_CLASSIFIED.FAILURE,
  };
}
