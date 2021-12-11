import { SET_RADIUS } from './types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RADIUS:
      const { identifier, radius } = action;
      return { ...state, [identifier]: radius };

    default:
      return state;
  }
};
