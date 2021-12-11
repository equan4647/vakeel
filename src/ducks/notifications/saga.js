import { call, put, takeLatest } from 'redux-saga/effects';

import {
  successGetNotifications,
  failureGetNotifications,
  successGetNotificationsCount,
  failureGetNotificationsCount,
  resetNotificationsCount,
} from './actions';
import { callRequest } from '../../utils/ApiSauce';
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_COUNT } from './types';
import {
  API_GET_NOTIFICATIONS,
  API_NOTIFICATIONS_COUNT,
} from '../../config/WebService';

// function* watchGetNotificationsRequest(action) {
//   const { payload, reset } = action;

//   try {
//     const response = yield call(callRequest, API_GET_NOTIFICATIONS, payload);

//     yield put(
//       successGetNotifications(response?.data ?? [], response?.page ?? {}, reset)
//     );
//   } catch (err) {
//     yield put(failureGetNotifications(err.message));
//   }
// }

function* watchGetNotificationsRequest(action) {
  const { payload, identifier, reset } = action;
  try {
    const response = yield call(callRequest, API_GET_NOTIFICATIONS, payload);
    yield put(
      successGetNotifications(
        response?.data ?? [],
        response?.page ?? {},
        reset,
        identifier
      )
    );
    yield put(resetNotificationsCount(identifier));
  } catch (err) {
    yield put(failureGetNotifications(err.message, identifier));
  }
}

function* watchGetNotificationsCountRequest(action) {
  const {} = action;
  try {
    const response = yield call(callRequest, API_NOTIFICATIONS_COUNT);
    yield put(successGetNotificationsCount(response?.data ?? {}));
  } catch (err) {
    yield put(failureGetNotificationsCount(err.message));
  }
}

export default function* root() {
  yield takeLatest(GET_NOTIFICATIONS.REQUEST, watchGetNotificationsRequest);
  yield takeLatest(
    GET_NOTIFICATIONS_COUNT.REQUEST,
    watchGetNotificationsCountRequest
  );
}
