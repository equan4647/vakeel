import _ from 'lodash';
import { AppUtil, Util } from '../../utils';
import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_COUNT,
  RESET_NOTIFICATIONS_COUNT,
} from './types';

const initialState = { notificationCount: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS.REQUEST: {
      if (action.isResetData) {
        return {
          ...state,
          [action.identifier]: [],
        };
      }
      return state;
    }

    case GET_NOTIFICATIONS.SUCCESS: {
      const { ids, items } = Util.normalizeData(action.data);
      return {
        ...state,
        [action.identifier]: AppUtil.getConcatDataList(action, ids, state),
        data: { ...state.data, ...items },
      };
    }

    case GET_NOTIFICATIONS_COUNT.SUCCESS: {
      return {
        ...state,
        notificationCount: action.data,
      };
    }

    case RESET_NOTIFICATIONS_COUNT: {
      const { identifier } = action;
      return {
        ...state,
        notificationCount: { ...state.notificationCount, [identifier]: 0 },
      };
    }

    default:
      return state;
  }
};
