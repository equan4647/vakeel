import { GET_REVIEWS, ADD_REVIEW, RESET_REVIEWS } from './types';

export function requestGetReviews(
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
    type: GET_REVIEWS.REQUEST,
  };
}

export function successGetReviews(data, page, reset, identifier) {
  return {
    data,
    page,
    reset,
    identifier,
    type: GET_REVIEWS.SUCCESS,
  };
}

export function failureGetReviews(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: GET_REVIEWS.FAILURE,
  };
}

export function requestAddReview(payload, url) {
  return { payload, url, type: ADD_REVIEW.REQUEST };
}

export function successAddReview(data) {
  return { data, type: ADD_REVIEW.SUCCESS };
}

export function failureAddReview(errorMessage) {
  return { errorMessage, type: ADD_REVIEW.FAILURE };
}

export function resetReviews(identifier) {
  return { type: RESET_REVIEWS, identifier };
}
