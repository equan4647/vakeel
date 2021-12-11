import { call, put, takeEvery, fork, take, delay } from 'redux-saga/effects';

import {
  successServicesListing,
  failureServicesListing,
  successAddtoFavorite,
  failureAddtoFavorite,
  successBookAppointment,
  failureBookAppointment,
  successAvailableBookingSlots,
  failureAvailableBookingSlots,
  successReportService,
  failureReportService,
} from './actions';
import { callRequest, callRequestFileUpload } from '../../utils/ApiSauce';
import {
  API_LIKE_UNLIKE_SERVICES,
  API_BOOK_APPOINTMENT,
  API_AVAILABLE_SLOTS,
  API_SERVICE_REPORT,
} from '../../config/WebService';
import {
  ADD_SERVICE_TO_FAVORITE,
  AVAILABLE_SLOTS,
  BOOK_APPOINTMENT,
  REPORT_SERVICE,
  SERVICES_LIST,
} from './types';
import { NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';

function* watchServicesListRequest(action) {
  const { payload, url, identifier, reset } = action;
  try {
    const response = yield call(callRequest, url, payload);
    yield put(
      successServicesListing(
        response?.data ?? [],
        response?.page ?? {},
        reset,
        identifier
      )
    );
  } catch (err) {
    yield put(failureServicesListing(err.message, identifier));
  }
}

function* watchAddToFavoriteRequest(action) {
  const { service_id, isFavourite, user_id } = action;

  try {
    yield call(callRequest, API_LIKE_UNLIKE_SERVICES, {
      service_id,
      user_id,
    });
    yield put(successAddtoFavorite());
  } catch (err) {
    yield put(failureAddtoFavorite(service_id, isFavourite, err.message));
  }
}

function* watchBookAppointmentRequest() {
  while (true) {
    const { payload, onSuccess } = yield take(BOOK_APPOINTMENT.REQUEST);
    try {
      const response = yield call(callRequest, API_BOOK_APPOINTMENT, payload);
      response && response.data && onSuccess && onSuccess(response.data);
      yield put(successBookAppointment());
    } catch (err) {
      Util.showMessage(err.message);
      yield put(failureBookAppointment());
    }
  }
}

function* watchABookingSlotstRequest() {
  while (true) {
    const { payload, onSuccess } = yield take(AVAILABLE_SLOTS.REQUEST);
    try {
      const response = yield call(callRequest, API_AVAILABLE_SLOTS, payload);
      yield put(successAvailableBookingSlots(response.data, payload));
    } catch (err) {
      yield put(failureAvailableBookingSlots(err.message));
    }
  }
}

function* watchReportServiceRequest() {
  while (true) {
    const { payload, onSuccess } = yield take(REPORT_SERVICE.REQUEST);
    try {
      const response = yield call(callRequest, API_SERVICE_REPORT, payload);
      yield put(successReportService(response.data));
      Util.showMessage(strings('app.report_successfull'), 'success');
      NavigationService.pop();
    } catch (err) {
      yield put(failureReportService());
    }
  }
}

export default function* root() {
  yield takeEvery(SERVICES_LIST.REQUEST, watchServicesListRequest);
  yield takeEvery(ADD_SERVICE_TO_FAVORITE.REQUEST, watchAddToFavoriteRequest);
  yield fork(watchBookAppointmentRequest);
  yield fork(watchABookingSlotstRequest);
  yield fork(watchReportServiceRequest);
}
