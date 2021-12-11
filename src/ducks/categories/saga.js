import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  successCategoryListing,
  failureCategoryListing,
  successCategoryDetail,
  failureCategoryDetail,
} from './actions';
import { API_CLASSIFIED_CATEGORY_DETAIL } from '../../config/WebService';
import { CATEGORIES_LIST, CATEGORY_DETAIL } from './types';
import { callRequest } from '../../utils/ApiSauce';

function* watchCategoryListRequest(action) {
  const { payload, url, identifier, reset } = action;
  try {
    const response = yield call(callRequest, url, payload);
    yield put(
      successCategoryListing(
        response?.data ?? [],
        response?.page ?? {},
        reset,
        identifier
      )
    );
  } catch (err) {
    yield put(failureCategoryListing(err.message, identifier));
  }
}

function* watchGetCategoryDetaildRequest(action) {
  const { categoryId, identifier, callback } = action;
  try {
    const response = yield call(
      callRequest,
      API_CLASSIFIED_CATEGORY_DETAIL,
      {},
      {},
      categoryId
    );
    yield put(successCategoryDetail(identifier, response?.data ?? {}));
    if (callback) {
      callback(true, response?.data ?? {});
    }
  } catch (err) {
    yield put(failureCategoryDetail(err.message, identifier));
    if (callback) {
      callback(false, err.message);
    }
  }
}

export default function* root() {
  yield takeEvery(CATEGORIES_LIST.REQUEST, watchCategoryListRequest);
  yield takeLatest(CATEGORY_DETAIL.REQUEST, watchGetCategoryDetaildRequest);
}
