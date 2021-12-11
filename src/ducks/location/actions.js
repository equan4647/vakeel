import { ADD_RECENT_LOCATION, SET_LAST_LOCATION } from './types';

export function addRecentLocation(data) {
  return {
    data,
    type: ADD_RECENT_LOCATION,
  };
}
export function setLastLocation(identifier, data) {
  return {
    identifier,
    data,
    type: SET_LAST_LOCATION,
  };
}
