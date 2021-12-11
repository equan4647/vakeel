import { call, put, takeLatest } from 'redux-saga/effects';

import { successGuestToken, failureGuestToken } from './actions';
import { API_GUEST_USER_TOKEN } from '../../config/WebService';
import { callRequest } from '../../utils/ApiSauce';
import { GUEST_TOKEN } from './types';

function* guestUserTokenRequest(action) {
  const { payload } = action;
  try {
    const { data } = yield call(callRequest, API_GUEST_USER_TOKEN, payload);
    yield put(successGuestToken(data?.token ?? '', payload.device_id));
  } catch (err) {
    yield put(failureGuestToken(err.message));
  }
}

export default function* root() {
  yield takeLatest(GUEST_TOKEN.REQUEST, guestUserTokenRequest);
}
