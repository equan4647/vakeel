import { call, put, takeEvery, fork, take } from 'redux-saga/effects';

import {
  successCreateAdvertise,
  failureCreateAdvertise,
  successAdvertisingListing,
  failureAdvertisingListing,
  successAdvertismentView,
  failureAdvertismentView,
  successAdvertismentClick,
  failureAdvertismentClick,
  successSingleAdvertisment,
  successGetAdvertisment,
  failureGetAdvertisment,
  successReportAd,
} from './actions';
import { callRequest, callRequestFileUpload } from '../../utils/ApiSauce';
import {
  API_CREATE_ADVERTISE,
  API_UPDATE_ADVERTISE,
  API_GET_ADVERTISMENTS,
  API_GET_MY_ADVERTISMENTS,
  API_ADVERTISMENT_VIEW,
  API_ADVERTISMENT_CLICK,
  API_ADVERTISMENT_STATS,
  API_REPORT_ADVERTISMENT,
} from '../../config/WebService';
import {
  ADVERTISING_LIST,
  CREATE_ADVERTISE,
  ADVERTISIEMENT_VIEW,
  ADVERTISIEMENT_CLICKED,
  ADVERTISIEMENT_STATS,
  GET_SINGLE_ADVERTISIEMENT,
  REPORT_ADVERTISIEMENT,
  GET_ADVERTISIEMENT,
} from './types';
import { NavigationService, Util } from '../../utils';
import { IDENTIFIERS } from '../../config/Constants';
import { strings } from '../../utils/i18n';

function* watchAdvertisingRequest(action) {
  const { payload, identifier, reset } = action;
  const url =
    identifier === IDENTIFIERS.ADVERTISING_LIST
      ? API_GET_ADVERTISMENTS
      : API_GET_MY_ADVERTISMENTS;
  try {
    const response = yield call(callRequest, url, payload);

    yield put(
      successAdvertisingListing(
        response?.data ?? [],
        response?.page ?? {},
        reset,
        identifier
      )
    );
  } catch (err) {
    yield put(failureAdvertisingListing(err.message, identifier));
  }
}

function* watchCreateAdvertisingRequest() {
  while (true) {
    const { payload, identifier, onSuccess } = yield take(
      CREATE_ADVERTISE.REQUEST
    );
    try {
      const { image, ...rest } = payload;

      // add images first
      let newPayload = {};
      if (identifier !== IDENTIFIERS.ADD_ADVERTISMENT_DAYS) {
        let urlImage = image.url;
        if (image.is_local) {
          urlImage = yield call(callRequestFileUpload, image.url);
          // image.is_local = 0;
        }

        newPayload = {
          image: image.is_local ? urlImage?.data?.file : urlImage,
          ...rest,
        };
      } else {
        newPayload = {
          image,
          ...rest,
        };
      }

      const url =
        identifier === IDENTIFIERS.UPDATE_ADVERTISMENT ||
        identifier === IDENTIFIERS.ADD_ADVERTISMENT_DAYS
          ? API_UPDATE_ADVERTISE
          : API_CREATE_ADVERTISE;

      const response = yield call(callRequest, url, newPayload);

      yield put(successCreateAdvertise(response?.data ?? {}, identifier));
      response && onSuccess(response?.data.id);

      // NavigationService.reset('SuccessScreen');
    } catch (err) {
      yield put(failureCreateAdvertise(err.message, identifier));
      Util.showMessage(err.message);
    }
  }
}

function* watchAdvertismentViewRequest(action) {
  const { payload, identifier, reset } = action;

  try {
    const response = yield call(callRequest, API_ADVERTISMENT_VIEW, payload);

    yield put(
      successAdvertismentView(
        response?.data ?? [],
        response?.page ?? {},
        reset,
        identifier
      )
    );
  } catch (err) {
    yield put(failureAdvertismentView(err.message, identifier));
  }
}

function* watchAdvertismentClickRequest(action) {
  const { payload, identifier, reset } = action;

  try {
    const response = yield call(callRequest, API_ADVERTISMENT_CLICK, payload);

    yield put(
      successAdvertismentClick(
        response?.data ?? [],
        response?.page ?? {},
        reset,
        identifier
      )
    );
  } catch (err) {
    yield put(failureAdvertismentClick(err.message, identifier));
  }
}

function* watchAdvertismentStatsRequest(action) {
  const { payload, onSuccess, onFailure } = action;

  try {
    const response = yield call(callRequest, API_ADVERTISMENT_STATS, payload);
    response && onSuccess(response.data);
  } catch (err) {
    err && onFailure(err.message);
  }
}

function* watchSingleAdvertismentRequest(action) {
  const { payload, onSuccess, onFailure } = action;

  try {
    const response = yield call(callRequest, API_GET_ADVERTISMENTS, payload);
    yield put(successSingleAdvertisment(response?.data));
    response && onSuccess(response.data);
  } catch (err) {
    err && onFailure(err.message);
  }
}

function* watchReportAdvertismentRequest() {
  while (true) {
    const { payload } = yield take(REPORT_ADVERTISIEMENT.REQUEST);
    try {
      yield call(callRequest, API_REPORT_ADVERTISMENT, payload);
      yield put(successReportAd());
      NavigationService.pop();
      Util.showMessage(strings('app.ad_report_message'), 'success');
    } catch (err) {
      Util.showMessage(err.message);
    }
  }
}

function* watchtAdvertismentGetRequest() {
  while (true) {
    const { payload, identifier } = yield take(GET_ADVERTISIEMENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        API_GET_MY_ADVERTISMENTS,
        payload
      );
      yield put(successGetAdvertisment(response?.data ?? {}, identifier));
    } catch (err) {
      yield put(failureGetAdvertisment(err.message, identifier));
    }
  }
}

export default function* root() {
  yield takeEvery(ADVERTISING_LIST.REQUEST, watchAdvertisingRequest);
  yield takeEvery(ADVERTISIEMENT_VIEW.REQUEST, watchAdvertismentViewRequest);
  yield takeEvery(
    ADVERTISIEMENT_CLICKED.REQUEST,
    watchAdvertismentClickRequest
  );
  yield takeEvery(ADVERTISIEMENT_STATS.REQUEST, watchAdvertismentStatsRequest);
  yield takeEvery(
    GET_SINGLE_ADVERTISIEMENT.REQUEST,
    watchSingleAdvertismentRequest
  );
  yield fork(watchCreateAdvertisingRequest);
  yield fork(watchReportAdvertismentRequest);
  yield fork(watchtAdvertismentGetRequest);
}
