import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  successAddToBuyingCart,
  failureAddToBuyingCart,
  successDeleteFromBuyingCart,
  failureDeleteFromBuyingCart,
  successFreshBuyingCart,
  failureFreshBuyingCart,
} from './actions';
import { callRequest } from '../../utils/ApiSauce';
import {
  ADD_TO_BUYING_CART,
  DELETE_FROM_BUYING_CART,
  GET_BUYING_CART,
} from './types';
import {
  API_ADD_PRODUCT_TO_CART,
  API_GET_PRODUCT_CART,
  API_DELETE_FROM_PRODUCT_CART,
} from '../../config/WebService';

import { Util } from '../../utils';

function* watchAddProductToCart(action) {
  const { payload, callback } = action;

  try {
    const response = yield call(callRequest, API_ADD_PRODUCT_TO_CART, payload);
    yield put(successAddToBuyingCart(response?.data ?? {}));
    if (callback) {
      callback();
    }
  } catch (err) {
    yield put(failureAddToBuyingCart(err.message));
    Util.showMessage(err.message);
  }
}

function* watchDeleteFromCart(action) {
  const { payload } = action;

  try {
    const response = yield call(
      callRequest,
      API_DELETE_FROM_PRODUCT_CART,
      payload
    );

    yield put(successDeleteFromBuyingCart(response?.data ?? {}));
  } catch (err) {
    yield put(failureDeleteFromBuyingCart(err.message));
    Util.showMessage(err.message);
  }
}

function* watchGetBuyingCart() {
  try {
    const response = yield call(callRequest, API_GET_PRODUCT_CART);

    yield put(successFreshBuyingCart(response?.data ?? {}));
  } catch (err) {
    yield put(failureFreshBuyingCart(err.message));
  }
}

export default function* root() {
  yield takeEvery(ADD_TO_BUYING_CART.REQUEST, watchAddProductToCart);
  yield takeEvery(DELETE_FROM_BUYING_CART.REQUEST, watchDeleteFromCart);
  yield takeLatest(GET_BUYING_CART.REQUEST, watchGetBuyingCart);
  // yield takeLatest(
  //   DELETE_FROM_BUYING_CART.REQUEST,
  //   watchDeleteFromProductToCart
  // );
}
