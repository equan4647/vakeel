import { SET_CATEGORIES, CATEGORIES_LIST, CATEGORY_DETAIL } from './types';

export function requestCategoryListing(
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
    type: CATEGORIES_LIST.REQUEST,
  };
}

export function successCategoryListing(data, page, reset, identifier) {
  return {
    data,
    page,
    reset,
    identifier,
    type: CATEGORIES_LIST.SUCCESS,
  };
}

export function failureCategoryListing(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: CATEGORIES_LIST.FAILURE,
  };
}

export function setCategories(identifier, data) {
  return {
    identifier,
    data,
    reset: true,
    type: SET_CATEGORIES,
  };
}

export function requestCategoryDetail(categoryId, identifier, callback) {
  return {
    categoryId,
    identifier,
    callback,
    type: CATEGORY_DETAIL.REQUEST,
  };
}

export function successCategoryDetail(identifier, data) {
  return {
    identifier,
    data,
    type: CATEGORY_DETAIL.SUCCESS,
  };
}

export function failureCategoryDetail(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: CATEGORY_DETAIL.FAILURE,
  };
}
