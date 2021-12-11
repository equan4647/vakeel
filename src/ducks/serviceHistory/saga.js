import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  take,
  fork,
} from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';

import {
  successGetOrders,
  failureGetOrders,
  successCheckout,
  failureCheckout,
  successPlaceOrder,
  failurePlaceOrder,
  successCancelOrder,
  failureCancelOrder,
  successServiceHistory,
  failureServiceHistory,
  successUpdateBooking,
  failureUpdateBooking,
  successAddServiceRating,
  failureAddServiceRating,
  successGetBooking,
  failureGetBooking,
} from './actions';
import { callRequest } from '../../utils/ApiSauce';
import {
  GET_ORDERS,
  CHECKOUT,
  PLACE_ORDER,
  CANCEL_ORDER,
  GET_SERVICE_HISTORY,
  UPDATE_BOOKING,
  ADD_SERVICE_RATING,
  GET_BOOKING,
} from './types';
import {
  API_CHECKOUT,
  API_GET_ADDRESS,
  API_GET_ORDERS,
  API_PLACE_ORDER,
  API_CANCEL_ORDER,
  API_BOOKING_HISTORY,
  API_UPDATE_BOOKING,
} from '../../config/WebService';
import { NavigationService, Util } from '../../utils';
import { successGetAddress } from '../addresses/actions';

function* watchServiceHistoryRequest(action) {
  const { payload, identifier, reset } = action;

  try {
    const response = yield call(callRequest, API_BOOKING_HISTORY, payload);

    yield put(
      successServiceHistory(
        response?.data ?? [],
        response?.page ?? {},
        reset,
        identifier
      )
    );
  } catch (err) {
    yield put(failureServiceHistory(err.message, identifier));
  }
}

function* watchCheckoutRequest(action) {
  const { payload } = action;

  try {
    const [checkoutResponse, addressResponse] = yield all([
      call(callRequest, API_CHECKOUT, payload),
      call(callRequest, API_GET_ADDRESS),
    ]);

    yield put(
      batchActions([
        successCheckout(checkoutResponse?.data ?? {}),
        successGetAddress(addressResponse?.data ?? []),
      ])
    );

    NavigationService.navigate('OrderInProgress');
  } catch (err) {
    yield put(failureCheckout(err.message));

    Util.showMessage(err.message);
  }
}

function* watchPlaceOrderRequest(action) {
  const { payload, callback } = action;

  try {
    const response = yield call(callRequest, API_PLACE_ORDER, payload);

    yield put(successPlaceOrder(response?.data ?? {}, payload?.card_token));

    callback?.();
  } catch (err) {
    yield put(failurePlaceOrder(err.message));

    Util.showMessage(err.message);
  }
}

function* watchUpdateBookingRequest() {
  while (true) {
    const { payload, identifier } = yield take(UPDATE_BOOKING.REQUEST);
    try {
      const response = yield call(callRequest, API_UPDATE_BOOKING, payload);
      yield put(successUpdateBooking(response?.data ?? {}, identifier));
    } catch (err) {
      yield put(failureUpdateBooking(err.message, identifier));
    }
  }
}

function* watchAddReviews() {
  while (true) {
    const { payload, url } = yield take(ADD_SERVICE_RATING.REQUEST);

    try {
      const response = yield call(callRequest, url, payload);
      yield put(successAddServiceRating(response?.data));

      NavigationService.pop();
    } catch (err) {
      yield put(failureAddServiceRating(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchtBookingGetRequest() {
  while (true) {
    const { payload, identifier } = yield take(GET_BOOKING.REQUEST);
    try {
      const response = yield call(callRequest, API_BOOKING_HISTORY, payload);
      yield put(successGetBooking(response?.data ?? {}, identifier));
    } catch (err) {
      yield put(failureGetBooking(err.message, identifier));
    }
  }
}
export default function* root() {
  yield takeEvery(GET_SERVICE_HISTORY.REQUEST, watchServiceHistoryRequest);
  yield fork(watchUpdateBookingRequest);
  yield fork(watchAddReviews);
  yield fork(watchtBookingGetRequest);
}
