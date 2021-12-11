// import {} from './types';
// import { IDENTIFIERS } from '../../config/Constants';
// import { Util, AppUtil } from '../../utils';

import { IDENTIFIERS } from '../../config/Constants';
import { AppUtil, Util } from '../../utils';
import {
  ADD_SERVICE_TO_FAVORITE,
  AVAILABLE_SLOTS,
  SERVICES_LIST,
  SET_SERVICES,
} from './types';

const initialState = { data: {}, usersProfile: {}, slots: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case SERVICES_LIST.REQUEST: {
      if (action.isResetData) {
        return {
          ...state,
          [action.identifier]: [],
        };
      }
      return state;
    }

    case SET_SERVICES:
    case SERVICES_LIST.SUCCESS: {
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

    case SERVICES_LIST.RESET: {
      return {
        ...state,
        [action.identifier]: [],
      };
    }

    case AVAILABLE_SLOTS.RESET: {
      return {
        ...state,
        slots: [],
      };
    }

    case ADD_SERVICE_TO_FAVORITE.REQUEST:
    case ADD_SERVICE_TO_FAVORITE.FAILURE: {
      const { service_id, isFavourite } = action;

      // set boolean to add/remove from wishlist
      const addToWishList =
        (action.type === ADD_SERVICE_TO_FAVORITE.REQUEST &&
          isFavourite === 0) ||
        (action.type === ADD_SERVICE_TO_FAVORITE.FAILURE && isFavourite === 1);

      // remove item from favourite list
      const newState = addToWishList
        ? {}
        : AppUtil.removeItemFromArrayIdentifiers(
            [IDENTIFIERS.FAVOURITE_SERVICES],
            state,
            service_id
          );

      //console.log('product_id', product_id);
      console.log('newState', newState);

      // set favourite attribute
      const is_liked = addToWishList ? 1 : 0;
      const newServices = { ...state.data[service_id], is_liked };
      console.log('newServices', newServices);

      return {
        ...state,
        ...newState,
        data: {
          ...state.data,
          [service_id]: newServices,
        },
      };
    }

    case AVAILABLE_SLOTS.REQUEST: {
      return {
        ...state,
        slots: [],
      };
    }

    case AVAILABLE_SLOTS.SUCCESS: {
      const { data, payload } = action;
      return {
        ...state,
        slots: AppUtil.formatBookingSlots(data, payload),
      };
    }

    default:
      return state;
  }
};
