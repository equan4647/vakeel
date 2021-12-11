import { Util } from '../../utils';
import { PLACE_ORDER } from '../orders/types';
import {
  GET_CARD_LIST,
  ADD_PAYMENT_METHOD,
  DELETE_PAYMENT_METHOD,
  GET_WALLET,
  RESET_WALLET,
  SAVE_PREFFERED_CARD,
} from './types';

const initialState = { data: {}, lastUsedCard: '', wallet: 0, myWallet: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_LIST.SUCCESS: {
      const { items } = Util.normalizeData(action.data, 'id');
      return { ...state, data: items };
    }

    case ADD_PAYMENT_METHOD.SUCCESS:
      return {
        ...state,
        data: { ...state.data, [action.data?.id]: action.data },
      };

    case DELETE_PAYMENT_METHOD.SUCCESS: {
      const newData = state.data;
      delete newData[action.data?.id];
      const lastUsedCard =
        state.lastUsedCard == action.data?.id ? '' : state.lastUsedCard;
      return { ...state, data: newData, lastUsedCard };
    }

    case GET_WALLET.SUCCESS:
      return { ...state, wallet: action.data, myWallet: { data: true } };

    case SAVE_PREFFERED_CARD:
      return { ...state, lastUsedCard: action?.id };

    case RESET_WALLET: {
      return { ...state, myWallet: {} };
    }

    default:
      return state;
  }
};
