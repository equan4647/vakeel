import {
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  take,
} from 'redux-saga/effects';

import {
  successGetOrder,
  failureGetOrder,
  successFoodOrdersList,
  failureFoodOrdersList,
  successGetDeliveryCharges,
  failureGetDeliveryCharges,
  successPlaceFoodOrder,
  failurePlaceFoodOrder,
  successAddResturantRating,
  failureAddResturantRating,
  successReportFoodOrder,
  failureReportFoodOrder,
} from './actions';
import { callRequest } from '../../utils/ApiSauce';
import {
  GET_FOOD_ORDER,
  FOOD_ORDERS_LIST,
  GET_DELIVERY_CHARGES,
  PLACE_FOOD_ORDER,
  RATE_FOOD_ORDER,
  REPORT_FOOD_ORDER,
} from './types';
import {
  API_GET_RESTURANT_ORDERS,
  API_PLACE_DELIVERY_ORDER,
  API_POST_RESTAURANT_ORDER,
  API_RESTAURANT_ORDER_VALIDATION,
  API_FOOD_ORDER_REPORT,
} from '../../config/WebService';
import { NavigationService, Util } from '../../utils';
import { DeliveryUtil } from '../../DataUtils';
import { resetFoodCart } from '../foodCart/actions';
import { MODULE } from '../../config/Constants';
import { strings } from '../../utils/i18n';

function* watchOrdersListRequest(action) {
  const { payload, reset } = action;

  try {
    const response = yield call(callRequest, API_GET_RESTURANT_ORDERS, payload);

    yield put(
      successFoodOrdersList(response?.data ?? [], response?.page ?? {}, reset)
    );
  } catch (err) {
    yield put(failureFoodOrdersList(err.message));
  }
}

function* watchGetDeliveryChargesRequest(action) {
  const { payload, address } = action;

  try {
    const { data = {} } = yield call(
      callRequest,
      API_RESTAURANT_ORDER_VALIDATION,
      payload
    );

    yield put(successGetDeliveryCharges(data));
    NavigationService.navigate(
      'FoodOrderInProgress',
      {
        address,
        deliveryCharges: DeliveryUtil.deliveryInfoDeliveryCharges(data),
        distanceInKM: DeliveryUtil.deliveryInfoDistInKM(data),
        estimatedDeliveryTime: DeliveryUtil.deliveryInfoExpectedMins(data),
      },
      'FoodCartStack'
    );
  } catch (err) {
    yield put(failureGetDeliveryCharges(err.message));

    Util.showMessage(err.message);
    NavigationService.navigate(
      'FoodOrderInProgress',
      {
        address: '',
        deliveryCharges: 0,
      },
      'FoodCartStack'
    );
  }
}

function* watchPlaceFoodOrderRequest(action) {
  const { payload } = action,
    isDeliveryFlow = payload?.resturant_delivery == 1,
    url = isDeliveryFlow ? API_PLACE_DELIVERY_ORDER : API_POST_RESTAURANT_ORDER;

  Util.showBlurView({
    module: MODULE.FOOD,
    title: strings(
      isDeliveryFlow ? 'app.searching_bringer' : 'app.placing_order'
    ),
    text: strings(
      isDeliveryFlow ? 'app.wait_message_bringer' : 'app.order_will_be_placed'
    ),
  });
  try {
    const { data = {} } = yield call(callRequest, url, payload);

    yield put(successPlaceFoodOrder(data));

    if (!isDeliveryFlow) {
      Util.hideBlurView(MODULE.FOOD);
      NavigationService.reset(
        'FoodOrderDetail',
        { isHistory: false },
        'FoodCartStack'
      );
      yield put(resetFoodCart);
    }
  } catch (err) {
    Util.hideBlurView(MODULE.FOOD);
    yield put(failurePlaceFoodOrder(err.message));
    Util.showMessage(err.message);
  }
}

function* watchGetFoodOrderRequest(action) {
  const { payload, identifier } = action;
  try {
    const response = yield call(callRequest, API_GET_RESTURANT_ORDERS, payload);

    yield put(successGetOrder(response?.data ?? {}, identifier));
  } catch (err) {
    yield put(failureGetOrder(err.message, identifier));
  }
}

function* watchFoodOrderRatingRequest(action) {
  const { payload, url, onComplete } = action;

  try {
    const response = yield call(callRequest, url, payload);

    yield put(successAddResturantRating(response?.data));

    onComplete?.();
  } catch (err) {
    yield put(failureAddResturantRating(err.message));
    Util.showMessage(err.message);
  }
}

function* watchReportFoodOrderRequest() {
  while (true) {
    const { payload } = yield take(REPORT_FOOD_ORDER.REQUEST);
    try {
      const response = yield call(callRequest, API_FOOD_ORDER_REPORT, payload);
      yield put(successReportFoodOrder(response.data));
      Util.showMessage(strings('app.report_successfull'), 'success');
      NavigationService.pop();
    } catch (err) {
      yield put(failureReportFoodOrder());
    }
  }
}

export default function* root() {
  yield takeLatest(GET_FOOD_ORDER.REQUEST, watchGetFoodOrderRequest);
  yield takeEvery(FOOD_ORDERS_LIST.REQUEST, watchOrdersListRequest);
  yield takeLatest(PLACE_FOOD_ORDER.REQUEST, watchPlaceFoodOrderRequest);
  yield takeLatest(RATE_FOOD_ORDER.REQUEST, watchFoodOrderRatingRequest);
  yield takeLatest(
    GET_DELIVERY_CHARGES.REQUEST,
    watchGetDeliveryChargesRequest
  );
  yield fork(watchReportFoodOrderRequest);
}
