import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  successRestaurantListing,
  failureRestaurantListing,
  successAddToFavorite,
  failureAddToFavorite,
  successRestaurantDetail,
  failureRestaurantDetail,
} from './actions';
import { callRequest } from '../../utils/ApiSauce';
import {
  ADD_RESTAURANT_TO_FAVORITE,
  RESTAURANTS_DETAIL,
  RESTAURANTS_LIST,
} from './types';
import {
  API_TOGGLE_FAVORITE_RESTAURANT,
  API_GET_RESTAURANT_DETAIL,
} from '../../config/WebService';
import { IDENTIFIERS } from '../../config/Constants';

function* watchRestaurantListRequest(action) {
  const { payload, identifier, url, reset } = action;
  try {
    const response = yield call(callRequest, url, payload);
    const newData =
      identifier === IDENTIFIERS.FAVORITE_RESTAURANTS
        ? response?.data?.map(i => i?.resturant_detail)
        : response?.data;
    yield put(
      successRestaurantListing(
        newData ?? [],
        response?.page ?? {},
        reset,
        identifier
      )
    );
  } catch (err) {
    yield put(failureRestaurantListing(err.message, identifier));
  }
}

function* watchAddToFavoriteRequest(action) {
  const { id: resturant_id, isFavourite } = action;

  try {
    yield call(callRequest, API_TOGGLE_FAVORITE_RESTAURANT, { resturant_id });
    yield put(successAddToFavorite(resturant_id));
  } catch (err) {
    yield put(failureAddToFavorite(resturant_id, isFavourite, err.message));
  }
}

function* watchRestaurantDetailRequest(action) {
  const { payload } = action;

  try {
    const response = yield call(
      callRequest,
      API_GET_RESTAURANT_DETAIL,
      payload
    );

    yield put(successRestaurantDetail(response?.data, payload?.resturant_id));
  } catch (err) {
    yield put(failureRestaurantDetail(err.message));
  }
}

export default function* root() {
  yield takeLatest(RESTAURANTS_LIST.REQUEST, watchRestaurantListRequest);
  yield takeLatest(RESTAURANTS_DETAIL.REQUEST, watchRestaurantDetailRequest);
  yield takeEvery(
    ADD_RESTAURANT_TO_FAVORITE.REQUEST,
    watchAddToFavoriteRequest
  );
}
