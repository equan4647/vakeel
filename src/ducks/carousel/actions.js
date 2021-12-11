import { CAROUSEL_LIST } from './types';

export function requestCarouselData(
  payload,
  isPullToRefresh = false,
  url,
  identifier,
  dynamicAction,
  isResetData = false
) {
  return {
    payload,
    isPullToRefresh,
    url,
    identifier,
    dynamicAction,
    isResetData,
    type: CAROUSEL_LIST.REQUEST,
  };
}

export function successCarouselData(identifier, data) {
  return {
    identifier,
    data,
    type: CAROUSEL_LIST.SUCCESS,
  };
}

export function failureCarouselData(identifier, errorMessage) {
  return {
    identifier,
    errorMessage,
    type: CAROUSEL_LIST.FAILURE,
  };
}
