import { put, call, takeLatest, fork, take } from 'redux-saga/effects';

import {
  failureGetReviews,
  successGetReviews,
  successAddReview,
  failureAddReview,
} from './actions';
import { GET_REVIEWS, ADD_REVIEW } from './types';
import { callRequest } from '../../utils/ApiSauce';
import { NavigationService, Util } from '../../utils';
import { USER_TYPES } from '../../config/Constants';

function* watchGetReviews(action) {
  const { payload, url, identifier, reset } = action;
  try {
    const response = yield call(callRequest, url, payload);

    console.log('payload.target_type', payload.target_type);

    const data =
      payload?.target_type === USER_TYPES.BRINGER
        ? response?.data?.rating_list?.list
        : response?.data;
    const page = payload.target_type
      ? response?.data.rating_list.page
      : response?.page;

    yield put(successGetReviews(data ?? [], page ?? {}, reset, identifier));
  } catch (err) {
    yield put(failureGetReviews(err.message, identifier));
  }
}

function* watchAddReviews() {
  while (true) {
    const { payload, url } = yield take(ADD_REVIEW.REQUEST);

    try {
      const response = yield call(callRequest, url, payload);
      yield put(successAddReview(response?.data));

      NavigationService.pop();
    } catch (err) {
      yield put(failureAddReview(err.message));
      Util.showMessage(err.message);
    }
  }
}

export default function* root() {
  yield takeLatest(GET_REVIEWS.REQUEST, watchGetReviews);
  yield fork(watchAddReviews);
}
