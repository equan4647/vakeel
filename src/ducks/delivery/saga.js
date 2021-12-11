import { call, put, takeLatest } from 'redux-saga/effects';

import {
  successCreateDelivery,
  failureCreateDelivery,
  successPlaceDeliveryOrder,
  failurePlaceDeliveryOrder,
  successCancelDeliveryOrder,
  failureCancelDeliveryOrder,
  successOngoingOrder,
  failureOngoingOrder,
  successAddDeliveryRating,
  failureAddDeliveryRating,
  resetCurrentDelivery,
  successReportDeliveryOrder,
  failureReportDeliveryOrder,
} from './actions';
import { callRequest } from '../../utils/ApiSauce';
import {
  ADD_DELIVERY_RATING,
  CANCEL_DELIVERY_ORDER,
  CREATE_DELIVERY,
  GET_ONGOING_ORDER,
  PLACE_DELIVERY_ORDER,
  REPORT_DELIVERY_ORDER,
} from './types';
import {
  API_CREATE_DELIVERY,
  API_PLACE_DELIVERY_ORDER,
  API_UPDATE_DELIVERY_ORDER,
  API_GET_DELIVERY_HISTORY,
  API_REPORT_DELIVERY_ORDERS,
} from '../../config/WebService';
import { strings } from '../../utils/i18n';

import { DeliveryUtil } from '../../DataUtils';
import { NavigationService, Util } from '../../utils';
import { MODULE } from '../../config/Constants';

function* watchCreateDeliveryRequest(action) {
  const { payload, onSuccess } = action;

  try {
    const response = yield call(callRequest, API_CREATE_DELIVERY, payload);

    yield put(successCreateDelivery(response?.data));

    DeliveryUtil.deliveryInfoDistInKM(response?.data) == 0
      ? Util.showMessage(strings('app.err_msg_zero_distance'))
      : onSuccess?.();
  } catch (err) {
    yield put(failureCreateDelivery(err.message));
  }
}

function* watchPlaceDeliverOrderRequest(action) {
  const { payload, onComplete } = action;

  try {
    const response = yield call(callRequest, API_PLACE_DELIVERY_ORDER, payload);

    yield put(successPlaceDeliveryOrder(response?.data));

    // onComplete?.();
  } catch (err) {
    yield put(failurePlaceDeliveryOrder(err.message));
    Util.showMessage(err.message);

    onComplete?.();
  }
}

function* watchOngoingOrderRequest(action) {
  const { payload } = action;

  try {
    const response = yield call(callRequest, API_GET_DELIVERY_HISTORY, payload);

    yield put(successOngoingOrder(response?.data?.[0]) ?? {});
  } catch (err) {
    yield put(failureOngoingOrder(err.message));
  }
}

function* watchCancelDeliveryOrderRequest(action) {
  const { payload } = action;

  try {
    const response = yield call(
      callRequest,
      API_UPDATE_DELIVERY_ORDER,
      payload
    );

    yield put(successCancelDeliveryOrder(response?.data));

    Util.hideBlurView(MODULE.DELIVERY);

    setImmediate(() => {
      NavigationService.popToTop();
      NavigationService.pop();
    });
  } catch (err) {
    yield put(failureCancelDeliveryOrder(err.message));
  }
}

function* watchAddDeliveryRatingRequest(action) {
  const { payload, url, onComplete } = action;

  try {
    const response = yield call(callRequest, url, payload);

    yield put(successAddDeliveryRating(response?.data));
    yield put(resetCurrentDelivery());

    onComplete?.();
  } catch (err) {
    yield put(failureAddDeliveryRating(err.message));
    Util.showMessage(err.message);
  }
}

function* watchReportDeliveryOrderRequest(action) {
  const { payload } = action;

  try {
    const response = yield call(
      callRequest,
      API_REPORT_DELIVERY_ORDERS,
      payload
    );

    yield put(successReportDeliveryOrder(response?.data));
    NavigationService.goBack();
    Util.showMessage(strings('app.report_successfull'), 'success');
  } catch (err) {
    yield put(failureReportDeliveryOrder(err.message));
    Util.showMessage(err.message);
  }
}

export default function* root() {
  yield takeLatest(CREATE_DELIVERY.REQUEST, watchCreateDeliveryRequest);
  yield takeLatest(PLACE_DELIVERY_ORDER.REQUEST, watchPlaceDeliverOrderRequest);
  yield takeLatest(GET_ONGOING_ORDER.REQUEST, watchOngoingOrderRequest);
  yield takeLatest(ADD_DELIVERY_RATING.REQUEST, watchAddDeliveryRatingRequest);
  yield takeLatest(
    REPORT_DELIVERY_ORDER.REQUEST,
    watchReportDeliveryOrderRequest
  );
  yield takeLatest(
    CANCEL_DELIVERY_ORDER.REQUEST,
    watchCancelDeliveryOrderRequest
  );
}
