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
import { AppUtil, Util } from '../../utils';
import { ADD_REVIEW } from '../reviews/types';
import {
  IDENTIFIERS,
  ORDER_CANCEL_ROLE,
  ORDER_STATUS,
} from '../../config/Constants';

const initialState = { data: {}, PENDING: [], COMPLETED: [], CANCELLED: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICE_HISTORY.REQUEST: {
      if (action.isResetData) {
        return { ...state, [action.identifier]: [] };
      }
      return state;
    }

    case GET_SERVICE_HISTORY.SUCCESS: {
      const { ids, items } = Util.normalizeData(action.data);
      return {
        ...state,
        [action.identifier]: AppUtil.getConcatDataList(
          action,
          ids,
          state,
          true
        ),
        data: { ...state.data, ...items },
      };
    }

    case GET_SERVICE_HISTORY.RESET: {
      return {
        ...state,
        [action.identifier]: [],
      };
    }

    case UPDATE_BOOKING.SUCCESS:
      const item = action.data;
      state.data[item._id] = item;
      // const index = state.PENDING.indexOf(item._id);
      // state.PENDING.splice(index, 1);
      const filtered = state.PENDING.filter(el => el !== item._id);
      return {
        ...state,
        [action.identifier]: [item._id, ...state[action.identifier]],
        PENDING: filtered,
      };

    case ADD_SERVICE_RATING.SUCCESS: {
      const orderID = action.data?.order_id;

      return {
        ...state,
        data: {
          ...state.data,
          [orderID]: {
            ...state.data[orderID],
            is_reviewed: true,
            review_obj: action.data,
          },
        },
      };
    }

    case GET_BOOKING.SUCCESS: {
      const { data } = action;
      // state.ADVERTISING_LIST.push(data.id);
      state.data[data._id] = data;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
