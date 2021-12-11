import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  successAddPaymentMethod,
  failureAddPaymentMethod,
  successCardList,
  failureCardList,
  successDeletePaymentMethod,
  failureDeletePaymentMethod,
  successGetWallet,
  failureGetWallet,
} from './actions';
import { callRequest } from '../../utils/ApiSauce';
import {
  ADD_PAYMENT_METHOD,
  DELETE_PAYMENT_METHOD,
  GET_CARD_LIST,
  GET_WALLET,
} from './types';
import {
  API_ADD_PAYMENT_METHOD,
  API_DELETE_PAYMENT_METHOD,
  API_GET_WALLET,
  API_LIST_CARD,
} from '../../config/WebService';
import { NavigationService, Util } from '../../utils';
import { StripeUtil } from '../../utils';
import { authSelectors } from '../auth';
import { batchActions } from 'redux-batched-actions';

function* watchAddPaymentMethodRequest(action) {
  const { payload } = action;

  try {
    const tokenData = yield call(StripeUtil.getStripeToken, payload);
    const customer_token = yield select(authSelectors.getStripeCustomerID);

    const paymentObject = {
      customer_token,
      source_token: tokenData?.tokenId,
      card_id: tokenData?.card?.cardId,
    };

    const response = yield call(
      callRequest,
      API_ADD_PAYMENT_METHOD,
      paymentObject
    );

    yield put(successAddPaymentMethod(response?.data ?? {}));

    NavigationService.pop();
  } catch (err) {
    yield put(failureAddPaymentMethod(err.message));

    Util.showMessage(err.message);
  }
}

function* watchDeletePaymentMethodRequest(action) {
  const { payload } = action;

  try {
    const token = yield select(authSelectors.getStripeCustomerID);
    payload.customer_token = token;

    const response = yield call(
      callRequest,
      API_DELETE_PAYMENT_METHOD,
      payload
    );

    yield put(successDeletePaymentMethod(response?.data ?? {}));
  } catch (err) {
    yield put(failureDeletePaymentMethod(err.message));

    Util.showMessage(err.message);
  }
}

function* watchGetCardListRequest() {
  try {
    const customer_token = yield select(authSelectors.getStripeCustomerID);

    const response = yield call(callRequest, API_LIST_CARD, { customer_token });

    yield put(successCardList(response?.data ?? {}));
  } catch (err) {
    yield put(failureCardList(err.message));

    Util.showMessage(err.message);
  }
}

function* watchGetWalletRequest() {
  try {
    const user_id = yield select(authSelectors.getUserID);
    const customer_token = yield select(authSelectors.getStripeCustomerID);

    const [walletResponse, cardsListResponse] = yield all([
      call(callRequest, API_GET_WALLET, { user_id }),
      call(callRequest, API_LIST_CARD, { customer_token }),
    ]);

    yield put(
      batchActions([
        successGetWallet(walletResponse?.data ?? 0),
        successCardList(cardsListResponse?.data ?? {}),
      ])
    );
  } catch (err) {
    yield put(failureGetWallet(err.message));

    Util.showMessage(err.message);
  }
}

export default function* root() {
  yield takeLatest(GET_WALLET.REQUEST, watchGetWalletRequest);
  yield takeLatest(ADD_PAYMENT_METHOD.REQUEST, watchAddPaymentMethodRequest);
  yield takeLatest(GET_CARD_LIST.REQUEST, watchGetCardListRequest);
  yield takeEvery(
    DELETE_PAYMENT_METHOD.REQUEST,
    watchDeletePaymentMethodRequest
  );
}
