import { PUSH_TOKEN_IS_SET } from './types';

const initialState = { isSet: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case PUSH_TOKEN_IS_SET: {
      return { isSet: true };
    }
    default:
      return state;
  }
};
