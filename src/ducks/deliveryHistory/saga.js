import { call, put, takeLatest } from 'redux-saga/effects';

import {
  successGetDeliveryHistory,
  failureGetDeliveryHistory,
} from './actions';
import { callRequest } from '../../utils/ApiSauce';
import { GET_DELIVERY_HISTORY } from './types';
import { API_GET_DELIVERY_HISTORY } from '../../config/WebService';
import { updateCurrentDelivery } from '../delivery/actions';
import { ORDER_STATUS } from '../../config/Constants';
import { Util } from '../../utils';

function* watchGetDeliveryHistoryListRequest(action) {
  const { payload, reset } = action;

  try {
    const response = yield call(callRequest, API_GET_DELIVERY_HISTORY, payload);

    yield put(
      successGetDeliveryHistory(
        response?.data
          ? response?.data?.filter(d => d.status !== ORDER_STATUS.PENDING)
          : [],
        response?.page ?? {},
        reset
      )
    );
    const FirstItem = response?.data?.[0] ?? {};
    if (
      [
        ORDER_STATUS.IN_PROGRESS,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.PENDING,
      ].includes(Util.getStatus(FirstItem))
    ) {
      yield put(updateCurrentDelivery(FirstItem) ?? {});
    }
  } catch (err) {
    yield put(failureGetDeliveryHistory(err.message));
  }
}

export default function* root() {
  yield takeLatest(
    GET_DELIVERY_HISTORY.REQUEST,
    watchGetDeliveryHistoryListRequest
  );
}
