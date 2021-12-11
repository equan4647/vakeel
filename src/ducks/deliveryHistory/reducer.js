import { GET_DELIVERY_HISTORY } from './types';
import { Util } from '../../utils';
import {
  ADD_DELIVERY_RATING,
  RESET_CURRENT_DELIVERY,
  UPDATE_CURRENT_DELIVERY,
} from '../delivery/types';
import { ORDER_STATUS } from '../../config/Constants';
import _ from 'lodash';

const initialState = { data: {}, ids: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DELIVERY_HISTORY.SUCCESS: {
      const { ids, items } = Util.normalizeData(action.data);
      return {
        ...state,
        data: { ...state.data, ...items },
        ids: action.reset ? ids : _.uniq(_.concat(state.ids, ids)),
      };
    }

    case RESET_CURRENT_DELIVERY:
    case UPDATE_CURRENT_DELIVERY: {
      const id =
        action.type === UPDATE_CURRENT_DELIVERY ? action.data?._id : action?.id;
      if (
        action.type === RESET_CURRENT_DELIVERY ||
        action.data?.status === ORDER_STATUS.PENDING
      ) {
        return { ...state, ids: state.ids.filter(dataID => dataID != id) };
      }
      return {
        ...state,
        data: { ...state.data, [id]: { ...state.data[id], ...action.data } },
        ids: _.uniq(_.concat(id, state.ids)),
      };
    }

    case ADD_DELIVERY_RATING.SUCCESS: {
      const id = action.data?.order_id;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: { ...state.data?.[id], driver_rating: action.data },
        },
      };
    }

    default:
      return state;
  }
};
