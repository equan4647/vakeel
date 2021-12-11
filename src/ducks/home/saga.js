import { put, call, fork, take, all, takeLatest } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';

import {
  successMarketPlaceHome,
  failureMarketPlaceHome,
  successClassifiedHome,
  failureClassifiedHome,
  successServicesHome,
  failureServicesHome,
  successFoodHome,
  failureFoodHome,
} from './actions';
import {
  GET_HOME_MARKETPLACE,
  GET_HOME_CLASSIFIED,
  GET_HOME_SERVICES,
  GET_HOME_FOOD,
} from './types';
import {
  API_MARKETPLACE_HOME,
  API_CLASSIFIED_HOME,
  API_SERVICES_HOME,
  API_FOOD_HOME,
  API_GET_RESTURANT_ORDERS,
  API_GET_DELIVERY_HISTORY,
} from '../../config/WebService';
import { IDENTIFIERS, ORDER_STATUS, USER_TYPES } from '../../config/Constants';
import { callRequest } from '../../utils/ApiSauce';

import { setCategories } from '../categories/actions';
import { setProducts } from '../products/actions';
import { setClassifieds } from '../classified/actions';
import { setServices } from '../services/actions';
import { setRestaurants } from '../restaurants/actions';
import { updateFoodOrder } from '../foodOrders/actions';
import { GET_CURRENT_FOOD_ORDER } from '../foodCart/types';
import {
  failureCurrentFoodOrder,
  successCurrentFoodOrder,
} from '../foodCart/actions';

function* requestCurrentFoodOrder() {
  const [ongoingOrder, pendingOrder] = yield all([
    call(callRequest, API_GET_RESTURANT_ORDERS, {
      status: ORDER_STATUS.IN_PROGRESS,
    }),
    call(callRequest, API_GET_DELIVERY_HISTORY, {
      status: ORDER_STATUS.PENDING,
      user_type: USER_TYPES.BASIC,
    }),
  ]);

  return pendingOrder?.data?.[0] ?? ongoingOrder?.data?.[0] ?? {};
}

function* watchFoodCurrentOrderRequest() {
  try {
    const currentOrder = yield call(requestCurrentFoodOrder);

    yield put(
      batchActions([successCurrentFoodOrder, updateFoodOrder(currentOrder)])
    );
  } catch (err) {
    yield put(failureCurrentFoodOrder(err.message));
  }
}

function* watchMarketPlaceHomeRequest() {
  while (true) {
    const { payload } = yield take(GET_HOME_MARKETPLACE.REQUEST);
    try {
      const response = yield call(callRequest, API_MARKETPLACE_HOME, payload);
      yield put(
        batchActions([
          successMarketPlaceHome({ data: true }),
          setCategories(
            IDENTIFIERS.POPULAR_CATEGORIES_MARKETPLACE_HOME,
            response?.data?.popular_categories ?? []
          ),
          setProducts(
            IDENTIFIERS.POPULAR_PRODUCTS_HOME,
            response?.data?.popular_products ?? []
          ),
          setProducts(
            IDENTIFIERS.TOP_RATED_PRODUCTS_HOME,
            response?.data?.top_rated_products ?? []
          ),
        ])
      );
    } catch (err) {
      yield put(failureMarketPlaceHome(err.message));
    }
  }
}

function* watchClassifiedHomeRequest() {
  while (true) {
    const { payload } = yield take(GET_HOME_CLASSIFIED.REQUEST);
    try {
      const response = yield call(callRequest, API_CLASSIFIED_HOME, payload);
      yield put(
        batchActions([
          successClassifiedHome({ data: true }),
          setCategories(
            IDENTIFIERS.POPULAR_CATEGORIES_CLASSIFIED_HOME,
            response?.data?.category ?? []
          ),
          setClassifieds(
            IDENTIFIERS.RECENTLY_ADDED_CLASSIFIED_HOME,
            response?.data?.recently ?? []
          ),
          setClassifieds(
            IDENTIFIERS.HELP_WANTED_CLASSIFIED_HOME,
            response?.data?.help_wanted ?? []
          ),
        ])
      );
    } catch (err) {
      yield put(failureClassifiedHome(err.message));
    }
  }
}

function* watchServicesHomeRequest() {
  while (true) {
    const { payload } = yield take(GET_HOME_SERVICES.REQUEST);
    try {
      const response = yield call(callRequest, API_SERVICES_HOME, payload);
      yield put(
        batchActions([
          successServicesHome({ data: true }),
          setCategories(
            IDENTIFIERS.POPULAR_CATEGORIES_SERVICES_HOME,
            response?.data?.categories ?? []
          ),
          setServices(
            IDENTIFIERS.RECENTLY_ADDED_SERVICES_HOME,
            response?.data?.recently_added_services ?? []
          ),
          setServices(
            IDENTIFIERS.MOST_BOOKED_SERVICES_HOME,
            response?.data?.booked_services_this_month ?? []
          ),
        ])
      );
    } catch (err) {
      yield put(failureServicesHome(err.message));
    }
  }
}

function* watchFoodHomeRequest() {
  while (true) {
    const { payload } = yield take(GET_HOME_FOOD.REQUEST);
    try {
      const home = yield call(callRequest, API_FOOD_HOME, payload);

      yield put(
        batchActions([
          successFoodHome({ data: true }),
          setRestaurants(
            IDENTIFIERS.TOP_RATED_RESTAURANTS_HOME,
            home?.data?.top_rated_resturants ?? []
          ),
          setRestaurants(
            IDENTIFIERS.ALL_RESTAURANTS_HOME,
            home?.data?.new_resturants ?? []
          ),
        ])
      );
    } catch (err) {
      yield put(failureFoodHome(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchMarketPlaceHomeRequest);
  yield fork(watchClassifiedHomeRequest);
  yield fork(watchServicesHomeRequest);
  yield fork(watchFoodHomeRequest);
  yield takeLatest(
    GET_CURRENT_FOOD_ORDER.REQUEST,
    watchFoodCurrentOrderRequest
  );
}
