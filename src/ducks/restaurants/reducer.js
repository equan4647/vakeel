import _ from 'lodash';

import {
  ADD_RESTAURANT_TO_FAVORITE,
  RESTAURANTS_DETAIL,
  RESTAURANTS_LIST,
  SET_RESTAURANTS,
} from './types';
import { Util, AppUtil } from '../../utils';
import { FoodUtil } from '../../DataUtils';
import { IDENTIFIERS } from '../../config/Constants';

const initialState = { data: {}, [IDENTIFIERS.FAVORITE_RESTAURANTS]: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case RESTAURANTS_LIST.REQUEST: {
      if (action.isResetData) {
        return { ...state, [action.identifier]: [] };
      }
      return state;
    }

    case SET_RESTAURANTS:
    case RESTAURANTS_LIST.SUCCESS: {
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

    case RESTAURANTS_LIST.RESET: {
      return { ...state, [action.identifier]: [] };
    }

    case ADD_RESTAURANT_TO_FAVORITE.FAILURE:
    case ADD_RESTAURANT_TO_FAVORITE.REQUEST: {
      const item = state.data?.[action?.id],
        isFavourite = FoodUtil.isLiked(item),
        updatedItem = { ...item, is_liked: isFavourite ? 0 : 1 };

      return { ...state, data: { ...state.data, [action?.id]: updatedItem } };
    }

    case RESTAURANTS_DETAIL.REQUEST: {
      const { resturant_id } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [resturant_id]: { ...state.data[resturant_id], detail: {} },
        },
      };
    }

    case RESTAURANTS_DETAIL.SUCCESS: {
      const { data, id } = action;

      return {
        ...state,
        data: {
          ...state.data,
          [id]: { ...state.data[id], items: data, detail: { isFetched: true } },
        },
      };
    }

    case ADD_RESTAURANT_TO_FAVORITE.SUCCESS: {
      return {
        ...state,
        [IDENTIFIERS.FAVORITE_RESTAURANTS]: state[
          IDENTIFIERS.FAVORITE_RESTAURANTS
        ].filter(_id => _id != action.id),
      };
    }

    default:
      return state;
  }
};
