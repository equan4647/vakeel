import { call, put, takeLatest, all } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';

import {
  successGetBoominUser,
  failureGetBoominUser,
  successReportBoominUser,
  failureReportBoominUser,
} from './actions';
import { GET_BOOMIN_USER, REPORT_BOOMIN_USER } from './types';
import { callRequest } from '../../utils/ApiSauce';
import {
  API_MARKETPLACE_PRODUCT_LIST,
  API_REPORT_BOOMIN_USERS,
  API_SERVICES_LIST_CATEGORIES,
} from '../../config/WebService';
import { Util } from '../../utils';
import { strings } from '../../utils/i18n';
import { setProducts } from '../products/actions';
import { setServices } from '../services/actions';

function* watchGetBoominUserRequest(action) {
  const { payload, identifier } = action;

  try {
    // const response = yield call(
    //   callRequest,
    //   API_MARKETPLACE_PRODUCT_LIST,
    //   payload
    // );

    const [productResponse, servicesResponse] = yield all([
      call(callRequest, API_MARKETPLACE_PRODUCT_LIST, payload),
      call(callRequest, API_SERVICES_LIST_CATEGORIES, payload),
    ]);
    yield put(
      batchActions([
        successGetBoominUser(
          { product_count: productResponse?.page?.totalDocs },
          identifier
        ),

        setProducts(identifier, productResponse?.data ?? []),
        setServices(identifier, servicesResponse?.data ?? []),
      ])
    );
  } catch (err) {
    yield put(failureGetBoominUser(err.message, identifier));
  }
}

function* watchReportBoominUserRequest(action) {
  const { payload } = action;

  try {
    const { data } = yield call(callRequest, API_REPORT_BOOMIN_USERS, payload);
    yield put(successReportBoominUser(data ?? {}));

    Util.showMessage(strings('app.user_reported'), 'success');
  } catch (err) {
    yield put(failureReportBoominUser(err.message));
  }
}

export default function* root() {
  yield takeLatest(GET_BOOMIN_USER.REQUEST, watchGetBoominUserRequest);
  yield takeLatest(REPORT_BOOMIN_USER.REQUEST, watchReportBoominUserRequest);
}
