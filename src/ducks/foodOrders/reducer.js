import {
  FOOD_ORDERS_LIST,
  GET_FOOD_ORDER,
  PLACE_FOOD_ORDER,
  RATE_FOOD_ORDER,
  RESET_FOOD_ORDER,
  UPDATE_FOOD_ORDER,
} from './types';
import { Util } from '../../utils';
import _ from 'lodash';

const initialState = { ids: [], data: {}, orderInProgress: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FOOD_ORDERS_LIST.REQUEST:
      return {
        ...state,
        ids: action.reset && !action.isPullToRefresh ? [] : state.ids,
      };

    case FOOD_ORDERS_LIST.SUCCESS:
      const { ids, items } = Util.normalizeData(action.data);

      return {
        ...state,
        ids: action.reset ? ids : _.uniq([...state.ids, ...ids]),
        data: { ...state.data, ...items },
      };

    case UPDATE_FOOD_ORDER:
    case PLACE_FOOD_ORDER.SUCCESS:
      const restaurantData = action.data?.resturant_order_details ?? {},
        id = action.data?.resturant_order_id ?? action.data?._id,
        _data = { ...action.data, ...restaurantData };

      return {
        ...state,
        orderInProgress: _data,
        ids: _.uniq([id, ...state.ids]),
        data: { ...state.data, [id]: _data },
      };

    case RESET_FOOD_ORDER:
      return { ...state, orderInProgress: {} };

    case RATE_FOOD_ORDER.SUCCESS:
      const orderID = action.data?.order_id;
      return {
        ...state,
        data: {
          ...state.data,
          [orderID]: {
            ...state.data?.[orderID],
            is_rated: 1,
            rating_obj: action.data,
          },
        },
      };

    case GET_FOOD_ORDER.SUCCESS: {
      const { data, identifier } = action;
      return { ...state, data: { ...state.data, [identifier]: data } };
    }

    default:
      return state;
  }
};
