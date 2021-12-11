import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  API_ADD_ADDRESS,
  API_DELETE_ADDRESS,
  API_GET_ADDRESS,
  API_UPDATE_ADDRESS,
} from '../../config/WebService';

import {
  failureAddAddress,
  failureDeleteAddress,
  failureGetAddress,
  failureUpdateAddress,
  successAddAddress,
  successDeleteAddress,
  successGetAddress,
  successUpdateAddress,
} from './actions';

import {
  ADD_ADDRESS,
  GET_ADDRESSES,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
} from './types';
import { callRequest } from '../../utils/ApiSauce';
import { NavigationService, Util } from '../../utils';

function* watchAddAddress(action) {
  const { payload } = action;

  try {
    const response = yield call(callRequest, API_ADD_ADDRESS, payload);
    yield put(successAddAddress(response?.data));

    NavigationService.goBack();
  } catch (err) {
    yield put(failureAddAddress(err.message));
    Util.showMessage(err.message);
  }
}

function* watchUpdateAddress(action) {
  const { payload } = action;

  try {
    const response = yield call(callRequest, API_UPDATE_ADDRESS, payload);
    yield put(successUpdateAddress(response?.data));

    // yield put(requestGetAddress());
    NavigationService.goBack();
  } catch (err) {
    yield put(failureUpdateAddress(err.message));
  }
}

function* watchGetAddress() {
  try {
    const response = yield call(callRequest, API_GET_ADDRESS);
    yield put(successGetAddress(response?.data ?? []));
  } catch (err) {
    yield put(failureGetAddress(err.message));
  }
}

function* watchDeleteAddress(action) {
  const { payload } = action;

  try {
    yield call(callRequest, API_DELETE_ADDRESS, payload);

    yield put(successDeleteAddress(payload.id));
  } catch (err) {
    yield put(failureDeleteAddress(err.message));
  }
}

export default function* root() {
  yield takeLatest(ADD_ADDRESS.REQUEST, watchAddAddress);
  yield takeLatest(UPDATE_ADDRESS.REQUEST, watchUpdateAddress);
  yield takeLatest(GET_ADDRESSES.REQUEST, watchGetAddress);
  yield takeEvery(DELETE_ADDRESS.REQUEST, watchDeleteAddress);
}
