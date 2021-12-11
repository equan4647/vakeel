import { put, takeLatest } from 'redux-saga/effects';
import { addRecentLocation } from './actions';
//import { SELECT_LOCATION } from './types';

function* watchSetLocation(action) {
  const { identifier, data } = action;

  yield put(addRecentLocation(identifier, data));
}

export default function* root() {
  //yield takeLatest(SELECT_LOCATION, watchSetLocation);
}
