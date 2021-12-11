import { GET_BOOMIN_USER } from './types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOMIN_USER.SUCCESS:
      return {
        ...state,
        [action.identifier]: { product_count: action.data?.product_count },
      };

    default:
      return state;
  }
};
