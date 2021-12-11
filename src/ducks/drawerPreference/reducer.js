import Immutable from 'seamless-immutable';
import { DRAWER_PREFERENCE } from '../../config/Constants';

const initialState = Immutable({
  orientation: null,
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case DRAWER_PREFERENCE.RIGHT: {
      return { ...state, orientation: DRAWER_PREFERENCE.RIGHT };
    }

    case DRAWER_PREFERENCE.LEFT: {
      return { ...state, orientation: DRAWER_PREFERENCE.LEFT };
    }

    default:
      return state;
  }
};
