import { SAVE_APPLE_CREDENTIALS } from './types';

const initialState = { data: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_APPLE_CREDENTIALS: {
      const id = action.payload.user;
      return {
        ...state.data,
        data: {
          [id]: action.payload,
        },
      };
    }

    default:
      return state;
  }
};
