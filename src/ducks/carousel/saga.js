import { put, call, takeEvery, delay } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';

import { successCarouselData, failureCarouselData } from './actions';
import { callRequest } from '../../utils/ApiSauce';
import { CAROUSEL_LIST } from './types';

function* watchCarouselListRequest(action) {
  const { payload, identifier, url, dynamicAction } = action;

  try {
    const response = yield call(callRequest, url, payload);

    yield put(
      batchActions([
        successCarouselData(identifier, { data: true }),
        dynamicAction(identifier, response?.data ?? []),
      ])
    );

    //yield put(successCarouselData({ data: true }, identifier));
  } catch (err) {
    yield put(failureCarouselData(identifier, err.message));
  }
}

export default function* root() {
  yield takeEvery(CAROUSEL_LIST.REQUEST, watchCarouselListRequest);
}
