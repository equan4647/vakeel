import { SET_CATEGORIES, CATEGORIES_LIST, CATEGORY_DETAIL } from './types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
    case CATEGORY_DETAIL.SUCCESS:
    case CATEGORIES_LIST.SUCCESS: {
      return {
        ...state,
        [action.identifier]: action.data,
      };
    }
    default:
      return state;
  }
};
