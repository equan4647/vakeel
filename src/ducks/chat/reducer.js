import { SOCKET_STATUS_CHANGE } from './types';

const initialState = { isSocketConnected: false, isSocketConnecting: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_STATUS_CHANGE: {
      return {
        isSocketConnected: action.isSocketConnected,
        isSocketConnecting: action.isSocketConnecting,
      };
    }
    default:
      return state;
  }
};
