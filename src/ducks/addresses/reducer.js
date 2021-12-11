import { Util } from '../../utils';
import { LOGOUT } from '../auth/types';
import {
  ADD_ADDRESS,
  DELETE_ADDRESS,
  GET_ADDRESSES,
  UPDATE_ADDRESS,
} from './types';

const initialState = { data: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESSES.SUCCESS: {
      const { items } = Util.normalizeData(action.data);
      return { data: items ?? {} };
    }

    case UPDATE_ADDRESS.SUCCESS:
    case ADD_ADDRESS.SUCCESS: {
      const newData = state.data;
      if (action.data?.is_default == 1) {
        for (let key in state.data) {
          newData[key] = { ...newData[key], is_default: 0 };
        }
      }

      return { data: { ...newData, [action.data?._id]: action.data } };
    }

    case DELETE_ADDRESS.SUCCESS:
      delete state.data[action.id];
      return state;

    case LOGOUT.SUCCESS:
      return initialState;

    default:
      return state;
  }
};
