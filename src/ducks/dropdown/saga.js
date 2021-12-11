import { call, put, takeLatest } from 'redux-saga/effects';

import { failureDropdownData, successDropdownData } from './actions';
import { DROPDOWN_DATA } from './types';
import { callRequest } from '../../utils/ApiSauce';

function* watchDropdownData(action) {
  const { api, identifier, payload } = action;

  try {
    const { data } = yield call(callRequest, api, payload);
    yield put(successDropdownData(data, identifier));
  } catch (err) {
    yield put(failureDropdownData(err.message, identifier));
  }
}

export default function* root() {
  yield takeLatest(DROPDOWN_DATA.REQUEST, watchDropdownData);
}
