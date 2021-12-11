import { call, put, takeEvery, fork, take } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';

import {
  successClassifiedListing,
  failureClassifiedListing,
  successClassifiedAd,
  failureClassifiedAd,
  successAddtoFavorite,
  failureAddtoFavorite,
  successReportProduct,
  failureReportProduct,
  successUserProfile,
  failureUserProfile,
  setClassifieds,
  successReportUserClassified,
  failureReportUserClassified,
  successDeleteClassified,
  failureDeleteClassified,
  successGetClassified,
  failureGetClassified,
} from './actions';
import {
  API_CLASSIFIED_ADD,
  API_LIKE_UNLIKE_CLASSIFIED,
  API_CLASSIFIED_EDIT,
  API_CLASSIFIED_REPORT_PRODUCT,
  API_CLASSIFIED_LIST,
  API_CLASSIFIED_REPORT_USER,
  API_CLASSIFIED_DELETE,
  API_GET_CLASSIFIED,
} from '../../config/WebService';
import { callRequest, callRequestFileUpload } from '../../utils/ApiSauce';
import {
  CLASSIFIED_LIST,
  CLASSIFIED_ADD,
  ADD_CLASSIFIED_TO_FAVORITE,
  REPORT_CLASSIFIED,
  USER_PROFILE,
  REPORT_USER_CLASSIFIED,
  DELETE_CLASSIFIED,
  GET_CLASSIFIED,
} from './types';
import { NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';

function* watchClassifiedListRequest(action) {
  const { payload, url, identifier, reset } = action;
  try {
    const response = yield call(callRequest, url, payload);
    yield put(
      successClassifiedListing(
        response?.data ?? [],
        response?.page ?? {},
        reset,
        identifier
      )
    );
  } catch (err) {
    yield put(failureClassifiedListing(err.message, identifier));
  }
}

function* watchClassifiedAddRequest() {
  while (true) {
    const { payload } = yield take(CLASSIFIED_ADD.REQUEST);
    try {
      const { attributes_value, attributes, images, id, ...rest } = payload;

      // add images first
      for (let i = 0; i < images.length; i += 1) {
        const item = images[i];
        if (item.is_local) {
          const response = yield call(callRequestFileUpload, item.url);
          item.is_local = 0;
          item.url = response?.data?.file ?? '';
        }
      }

      const newPayload = {
        attributes_value: JSON.stringify(attributes_value),
        images: JSON.stringify(images),
        status: 1,
        ...rest,
      };

      const isEdit = id && id !== null && id !== '';
      const url = isEdit ? API_CLASSIFIED_EDIT : API_CLASSIFIED_ADD;
      const parameter = isEdit ? id : '';

      const response = yield call(callRequest, url, newPayload, {}, parameter);

      yield put(successClassifiedAd(response?.data ?? {}));

      NavigationService.reset('SuccessScreen', {
        classifiedId: response?.data?.id ?? 0,
        isEdit,
      });
    } catch (err) {
      yield put(failureClassifiedAd(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchAddToFavoriteRequest(action) {
  const { product_id, isFavourite } = action;

  try {
    yield call(callRequest, API_LIKE_UNLIKE_CLASSIFIED, {
      product_id,
    });
    yield put(successAddtoFavorite());
  } catch (err) {
    yield put(failureAddtoFavorite(product_id, isFavourite, err.message));
  }
}

function* watchClassifiedReportProductRequest() {
  while (true) {
    const { payload } = yield take(REPORT_CLASSIFIED.REQUEST);
    try {
      yield call(callRequest, API_CLASSIFIED_REPORT_PRODUCT, payload);
      yield put(successReportProduct());
      NavigationService.pop();
      Util.showMessage(strings('app.ad_report_message'), 'success');
    } catch (err) {
      yield put(failureReportProduct(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watcUserProfileRequest(action) {
  const { payload, identifier } = action;

  try {
    const response = yield call(callRequest, API_CLASSIFIED_LIST, payload);
    const adsCount = response?.page?.total ?? 0;
    yield put(
      batchActions([
        successUserProfile(identifier, { adsCount }),
        setClassifieds(identifier, response?.data ?? []),
      ])
    );

    //yield put(successUserProfile({ adsCount }));
  } catch (err) {
    yield put(failureUserProfile(identifier, err.message));
  }
}

function* watchClassifiedReportUserRequest() {
  while (true) {
    const { payload } = yield take(REPORT_USER_CLASSIFIED.REQUEST);
    try {
      yield call(callRequest, API_CLASSIFIED_REPORT_USER, payload);
      yield put(successReportUserClassified());
      Util.showMessage(strings('app.user_report_message'), 'success');
    } catch (err) {
      yield put(failureReportUserClassified(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchClassifiedDeleteRequest() {
  while (true) {
    const { classifiedId } = yield take(DELETE_CLASSIFIED.REQUEST);
    try {
      yield call(callRequest, API_CLASSIFIED_DELETE, {}, {}, classifiedId);
      yield put(successDeleteClassified(classifiedId));
      NavigationService.pop();
      Util.showMessage(strings('app.delete_ad_message'), 'success');
    } catch (err) {
      yield put(failureDeleteClassified(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchClassifiedGetRequest() {
  while (true) {
    const { payload, identifier } = yield take(GET_CLASSIFIED.REQUEST);
    try {
      const response = yield call(
        callRequest,
        API_GET_CLASSIFIED,
        {},
        {},
        payload.classifiedId
      );
      yield put(successGetClassified(response?.data ?? {}, identifier));
    } catch (err) {
      yield put(failureGetClassified(err.message, identifier));
    }
  }
}

export default function* root() {
  yield takeEvery(CLASSIFIED_LIST.REQUEST, watchClassifiedListRequest);
  yield takeEvery(
    ADD_CLASSIFIED_TO_FAVORITE.REQUEST,
    watchAddToFavoriteRequest
  );
  yield takeEvery(USER_PROFILE.REQUEST, watcUserProfileRequest);
  yield fork(watchClassifiedAddRequest);
  yield fork(watchClassifiedReportProductRequest);
  yield fork(watchClassifiedReportUserRequest);
  yield fork(watchClassifiedDeleteRequest);
  yield fork(watchClassifiedGetRequest);
}
