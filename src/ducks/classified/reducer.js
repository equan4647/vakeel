import {
  SET_CLASSIFIED,
  CLASSIFIED_LIST,
  ADD_CLASSIFIED_TO_FAVORITE,
  CLASSIFIED_ADD,
  USER_PROFILE,
  DELETE_CLASSIFIED,
  GET_CLASSIFIED,
} from './types';
import { IDENTIFIERS } from '../../config/Constants';
import { Util, AppUtil } from '../../utils';

const initialState = { data: {}, usersProfile: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASSIFIED_TO_FAVORITE.REQUEST:
    case ADD_CLASSIFIED_TO_FAVORITE.FAILURE: {
      const { product_id, isFavourite } = action;

      // set boolean to add/remove from wishlist
      const addToWishList =
        (action.type === ADD_CLASSIFIED_TO_FAVORITE.REQUEST &&
          isFavourite === false) ||
        (action.type === ADD_CLASSIFIED_TO_FAVORITE.FAILURE &&
          isFavourite === true);

      // remove item from favourite list
      const newState = addToWishList
        ? {}
        : AppUtil.removeItemFromArrayIdentifiers(
            [IDENTIFIERS.FAVOURITE_CLASSIFIED],
            state,
            product_id
          );

      //console.log('product_id', product_id);
      //console.log('newState', newState);
      //console.log('addToWishList', addToWishList);

      // set favourite attribute
      const like_products = addToWishList ? [{ product_id }] : [];
      const newClassified = { ...state.data[product_id], like_products };

      return {
        ...state,
        ...newState,
        data: {
          ...state.data,
          [product_id]: newClassified,
        },
      };
    }

    case CLASSIFIED_LIST.REQUEST: {
      if (action.isResetData) {
        return {
          ...state,
          [action.identifier]: [],
        };
      }
      return state;
    }

    case SET_CLASSIFIED:
    case CLASSIFIED_LIST.SUCCESS: {
      const { ids, items } = Util.normalizeData(action.data, 'id');
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
    case CLASSIFIED_LIST.RESET: {
      return {
        ...state,
        [action.identifier]: [],
      };
    }
    case CLASSIFIED_ADD.SUCCESS:
    case GET_CLASSIFIED.SUCCESS: {
      const product_id = action.data?.id ?? 0;

      return {
        ...state,
        data: {
          ...state.data,
          [product_id]: action.data,
        },
      };
    }

    case USER_PROFILE.SUCCESS: {
      return {
        ...state,
        usersProfile: {
          ...state.usersProfile,
          [action.identifier]: action.data,
        },
      };
    }
    case DELETE_CLASSIFIED.SUCCESS: {
      const { classifiedId } = action;

      const newState = AppUtil.removeItemFromArrayIdentifiers(
        [IDENTIFIERS.MY_CLASSIFIED, IDENTIFIERS.FAVOURITE_CLASSIFIED],
        state,
        classifiedId
      );

      return {
        ...state,
        ...newState,
      };
    }

    default:
      return state;
  }
};
