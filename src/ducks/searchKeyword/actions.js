import { SEARCH_KEYWORD, RESET_SEARCH_KEYWORD } from './types';

export function requestSearchKeyword(identifier, payload, callback) {
  return {
    identifier,
    payload,
    callback,
    type: SEARCH_KEYWORD.REQUEST,
  };
}

export function successSearchKeyword(data, identifier) {
  return {
    data,
    identifier,
    type: SEARCH_KEYWORD.SUCCESS,
  };
}

export function failureSearchKeyword(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: SEARCH_KEYWORD.FAILURE,
  };
}

export function resetSearchHistory(identifier) {
  return {
    identifier,
    type: RESET_SEARCH_KEYWORD,
  };
}
