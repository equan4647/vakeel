import { Util } from '../../utils';
import { PLACE_ORDER } from '../orders/types';
import {
  ADD_TO_BUYING_CART,
  GET_BUYING_CART,
  RESET_BUYING_CART,
  DELETE_FROM_BUYING_CART,
} from './types';

const initialState = { data: {}, myCart: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BUYING_CART.SUCCESS:
    case DELETE_FROM_BUYING_CART.SUCCESS:
    case ADD_TO_BUYING_CART.SUCCESS: {
      const { items } = Util.normalizeData(
        action.data?.items ?? {},
        'product_attribute_id'
      );

      const myCartSynObj =
        action.type === GET_BUYING_CART.SUCCESS
          ? { myCart: { data: true } }
          : {};

      return {
        ...state,
        data: items,
        sum: action.data?.products_sum,
        ...myCartSynObj,
      };
    }

    case PLACE_ORDER.SUCCESS: {
      console.log('order success');
      let _data = { ...state.data };
      action.data?.order_data?.forEach(order => {
        delete _data[order?.product_attribute_id];
      });
      return { ...state, data: _data };
    }

    case RESET_BUYING_CART:
      return { ...state, myCart: {} };

    default:
      return state;
  }
};

/*
case GET_BUYING_CART.SUCCESS: {
      const { items } = Util.normalizeData(
        action.data?.items ?? {},
        'product_attribute_id'
      );

      return {
        data: items,
        sum: action.data?.products_sum,
        myCart: { data: true },
      };
    }
*/
