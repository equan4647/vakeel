import { DROPDOWN_DATA } from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { identifier, data } = action;

  switch (action.type) {
    case DROPDOWN_DATA.SUCCESS:
      return { ...state, [identifier]: data };

    default:
      return state;
  }
};
