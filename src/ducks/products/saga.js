import { call, put, takeEvery, fork, take } from 'redux-saga/effects';

import {
  successProductListing,
  failureProductListing,
  successAddtoFavorite,
  failureAddtoFavorite,
  successRemoveFromFavorite,
  failureRemoveFromFavorite,
  successGetProduct,
  failureGetProduct,
} from './actions';
import { callRequest } from '../../utils/ApiSauce';
import {
  PRODUCT_LIST,
  ADD_PRODUCT_TO_FAVORITE,
  REMOVE_PRODUCT_FROM_FAVORITE,
  GET_PRODUCT,
} from './types';
import {
  API_MARKETPLACE_PRODUCT_LIST,
  API_WISHLIST,
} from '../../config/WebService';

function* watchProductListRequest(action) {
  const { payload, url, identifier, reset } = action;
  try {
    const response = yield call(callRequest, url, payload);
    yield put(
      successProductListing(
        response?.data ?? [],
        response?.page ?? {},
        reset,
        identifier
      )
    );
  } catch (err) {
    yield put(failureProductListing(err.message, identifier));
  }
}

function* watchAddToFavoriteRequest(action) {
  const { payload } = action;

  try {
    const response = yield call(callRequest, API_WISHLIST, payload);
    yield put(successAddtoFavorite(response?.data));
  } catch (err) {
    yield put(failureAddtoFavorite(payload, err.message));
  }
}

function* watchRemoveFromFavoriteRequest(action) {
  const { payload } = action;

  try {
    const response = yield call(callRequest, API_WISHLIST, payload);
    yield put(successRemoveFromFavorite(response?.data));
  } catch (err) {
    yield put(failureRemoveFromFavorite(payload, err.message));
  }
}

function* watchtProductGetRequest() {
  while (true) {
    const { payload, identifier } = yield take(GET_PRODUCT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        API_MARKETPLACE_PRODUCT_LIST,
        payload
      );

      yield put(successGetProduct(response?.data ?? {}, identifier));
    } catch (err) {
      yield put(failureGetProduct(err.message, identifier));
    }
  }
}

export default function* root() {
  // yield takeEvery(GET_PRODUCT.REQUEST, watchtProductGetRequest);

  yield takeEvery(PRODUCT_LIST.REQUEST, watchProductListRequest);
  yield takeEvery(ADD_PRODUCT_TO_FAVORITE.REQUEST, watchAddToFavoriteRequest);
  yield takeEvery(
    REMOVE_PRODUCT_FROM_FAVORITE.REQUEST,
    watchRemoveFromFavoriteRequest
  );
  yield fork(watchtProductGetRequest);
}
