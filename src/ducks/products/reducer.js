import _ from 'lodash';

import {
  SET_PRODUCTS,
  PRODUCT_LIST,
  ADD_PRODUCT_TO_FAVORITE,
  REMOVE_PRODUCT_FROM_FAVORITE,
  GET_PRODUCT,
} from './types';
import { Util, AppUtil } from '../../utils';
import { IDENTIFIERS } from '../../config/Constants';
import {
  ADD_TO_BUYING_CART,
  GET_BUYING_CART,
  DELETE_FROM_BUYING_CART,
} from '../buyingCart/types';

const initialState = { data: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST.REQUEST: {
      if (action.isResetData) {
        return {
          ...state,
          [action.identifier]: [],
        };
      }
      return state;
    }

    case SET_PRODUCTS:
    case PRODUCT_LIST.SUCCESS: {
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

    case REMOVE_PRODUCT_FROM_FAVORITE.FAILURE:
    case ADD_PRODUCT_TO_FAVORITE.REQUEST: {
      const { item_id } = action.payload;
      const fav_ids = state[IDENTIFIERS.FAVORITE_PRODUCTS] ?? [];
      return {
        ...state,
        [IDENTIFIERS.FAVORITE_PRODUCTS]: _.uniq([...fav_ids, item_id]),
        data: {
          ...state.data,

          [item_id]: {
            ...state.data[item_id],
            is_added_to_wishlist: 1,
          },
        },
      };
    }

    case REMOVE_PRODUCT_FROM_FAVORITE.REQUEST:
    case ADD_PRODUCT_TO_FAVORITE.FAILURE: {
      const { item_id } = action.payload;
      const fav_ids = state[IDENTIFIERS.FAVORITE_PRODUCTS] ?? [];
      return {
        ...state,
        [IDENTIFIERS.FAVORITE_PRODUCTS]: fav_ids.filter(
          fav_id => fav_id !== item_id
        ),
        data: {
          ...state.data,

          [item_id]: {
            ...state.data[item_id],
            is_added_to_wishlist: 0,
          },
        },
      };
    }

    case DELETE_FROM_BUYING_CART.SUCCESS:
    case ADD_TO_BUYING_CART.SUCCESS:
    case GET_BUYING_CART.SUCCESS: {
      const { items } = Util.normalizeData(action.data.items, 'product_id');

      const itemDetails = {};
      for (let key in items) {
        itemDetails[key] = items[key].item_detail;
      }

      return { ...state, data: { ...state.data, ...itemDetails } };
    }

    case PRODUCT_LIST.RESET: {
      return { ...state, [action.identifier]: [] };
    }

    case GET_PRODUCT.SUCCESS:
      return {
        ...state,
        data: { ...state.data, [action?.identifier]: action.data },
      };

    default:
      return state;
  }
};
