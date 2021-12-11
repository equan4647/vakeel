import {
  ADD_RESTAURANT_TO_FAVORITE,
  RESTAURANTS_DETAIL,
  RESTAURANTS_LIST,
  SET_RESTAURANTS,
} from './types';

export function requestRestaurantListing(
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
    type: RESTAURANTS_LIST.REQUEST,
  };
}

export function successRestaurantListing(data, page, reset, identifier) {
  return {
    data,
    page,
    reset,
    identifier,
    type: RESTAURANTS_LIST.SUCCESS,
  };
}

export function failureRestaurantListing(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: RESTAURANTS_LIST.FAILURE,
  };
}

export function setRestaurants(identifier, data) {
  return {
    identifier,
    data,
    reset: true,
    type: SET_RESTAURANTS,
  };
}

export function resetListFood(identifier) {
  return { identifier, type: RESTAURANTS_LIST.RESET };
}

export function requestAddToFavorite(id) {
  return { id, type: ADD_RESTAURANT_TO_FAVORITE.REQUEST };
}

export function successAddToFavorite(id) {
  return { id, type: ADD_RESTAURANT_TO_FAVORITE.SUCCESS };
}

export function failureAddToFavorite(id, errorMessage) {
  return {
    id,
    errorMessage,
    type: ADD_RESTAURANT_TO_FAVORITE.FAILURE,
  };
}
export function requestRestaurantDetail(
  payload,
  isPullToRefresh = false,
  isResetData = false
) {
  return {
    payload,
    isPullToRefresh,
    isResetData,
    type: RESTAURANTS_DETAIL.REQUEST,
  };
}
export function successRestaurantDetail(data, id) {
  return { data, id, type: RESTAURANTS_DETAIL.SUCCESS };
}

export function failureRestaurantDetail(errorMessage) {
  return { errorMessage, type: RESTAURANTS_DETAIL.FAILURE };
}
