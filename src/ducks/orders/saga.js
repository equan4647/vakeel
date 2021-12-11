import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
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
  successGetOrder,
  failureGetOrder,
} from './actions';
import { callRequest } from '../../utils/ApiSauce';
import {
  GET_ORDERS,
  CHECKOUT,
  PLACE_ORDER,
  CANCEL_ORDER,
  GET_ORDER,
} from './types';
import {
  API_CHECKOUT,
  API_GET_ADDRESS,
  API_GET_ORDERS,
  API_PLACE_ORDER,
  API_CANCEL_ORDER,
} from '../../config/WebService';
import { NavigationService, Util } from '../../utils';
import { successGetAddress } from '../addresses/actions';

function* watchOrdersListRequest(action) {
  const { payload, identifier, reset } = action;

  try {
    const response = yield call(callRequest, API_GET_ORDERS, payload);

    yield put(
      successGetOrders(
        response?.data ?? [],
        response?.page ?? {},
        reset,
        identifier
      )
    );
  } catch (err) {
    yield put(failureGetOrders(err.message, identifier));
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

function* watchCancelOrderRequest(action) {
  const { payload } = action;

  try {
    const response = yield call(callRequest, API_CANCEL_ORDER, payload);

    // yield put(successCancelOrder(response?.data ?? {}));
    yield put(successCancelOrder({ id: payload.id }));

    NavigationService.pop();
  } catch (err) {
    yield put(failureCancelOrder(err.message));

    Util.showMessage(err.message);
  }
}

function* watchtProductGetRequest() {
  while (true) {
    const { payload, identifier } = yield take(GET_ORDER.REQUEST);
    try {
      const response = yield call(callRequest, API_GET_ORDERS, payload);
      yield put(successGetOrder(response?.data ?? {}, identifier));
    } catch (err) {
      yield put(failureGetOrder(err.message, identifier));
    }
  }
}

export default function* root() {
  yield takeEvery(GET_ORDERS.REQUEST, watchOrdersListRequest);
  yield takeLatest(CHECKOUT.REQUEST, watchCheckoutRequest);
  yield takeLatest(PLACE_ORDER.REQUEST, watchPlaceOrderRequest);
  yield takeLatest(CANCEL_ORDER.REQUEST, watchCancelOrderRequest);
  yield fork(watchtProductGetRequest);
}
