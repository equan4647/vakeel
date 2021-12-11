import { CAROUSEL_LIST } from './types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CAROUSEL_LIST.SUCCESS: {
      return {
        ...state,
        [action.identifier]: action.data,
      };
    }
    default:
      return state;
  }
};
