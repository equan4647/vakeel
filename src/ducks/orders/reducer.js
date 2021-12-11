import {
  GET_ORDERS,
  CHECKOUT,
  PLACE_ORDER,
  CANCEL_ORDER,
  GET_ORDER,
} from './types';
import { AppUtil, Util } from '../../utils';
import { ADD_REVIEW } from '../reviews/types';
import { ORDER_CANCEL_ROLE, ORDER_STATUS } from '../../config/Constants';

const initialState = { data: {}, checkoutData: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS.REQUEST: {
      if (action.reset && !action.isPullToRefresh) {
        return { ...state, [action.identifier]: [] };
      }
      return state;
    }

    case GET_ORDERS.SUCCESS: {
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

    case CHECKOUT.REQUEST:
      return { ...state, checkoutData: {} };

    case PLACE_ORDER.SUCCESS:
    case CHECKOUT.SUCCESS:
      return { ...state, checkoutData: action.data };

    case ADD_REVIEW.SUCCESS: {
      const orderID = action.data?.order_id;
      const productID = action.data?.product_id;
      const attrID = action.data?.item_id;

      const newData = state.data[orderID]?.order_data.map(order => {
        if (
          order?.product_id === productID &&
          order?.product_attribute_id === attrID
        ) {
          return { ...order, is_rated: 1, rating_obj: action.data };
        } else {
          return order;
        }
      });

      return {
        ...state,
        data: {
          ...state.data,
          [orderID]: { ...state.data[orderID], order_data: newData },
        },
      };
    }

    case CANCEL_ORDER.SUCCESS: {
      const identifierCompleted = `${ORDER_STATUS.DELIVERED}_${ORDER_STATUS.CANCELLED}`;
      const orderID = action.data?.id;
      return {
        ...state,
        [ORDER_STATUS.PENDING]: state[ORDER_STATUS.PENDING].filter(
          orderId => orderId !== orderID
        ),

        [identifierCompleted]: [orderID, ...state[identifierCompleted]],

        data: {
          ...state.data,
          [orderID]: {
            ...state.data?.[orderID],
            status: ORDER_STATUS.CANCELLED,
            cancelled_by: ORDER_CANCEL_ROLE.USER,
          },
        },
      };
    }

    case GET_ORDER.SUCCESS: {
      const { data } = action;
      state.data[data._id] = data;
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
