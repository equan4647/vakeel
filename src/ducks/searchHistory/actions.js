import { CLEAR_SEARCH_HISTORY, SAVE_SEARCH_HISTORY } from './types';

export function saveSearchHistory(identifier, data) {
  return {
    identifier,
    data,
    type: SAVE_SEARCH_HISTORY,
  };
}

export function clearSearchHistory(identifier) {
  return {
    identifier,
    type: CLEAR_SEARCH_HISTORY,
  };
}
