import {
  CREATE_ADVERTISE,
  ADVERTISING_LIST,
  ADVERTISIEMENT_CLICKED,
  GET_SINGLE_ADVERTISIEMENT,
  GET_ADVERTISIEMENT,
} from './types';
import { IDENTIFIERS } from '../../config/Constants';
import { Util, AppUtil } from '../../utils';

const initialState = {
  data: {},
  MY_ADVERTISING_LIST: [],
  ADVERTISING_LIST: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADVERTISING_LIST.REQUEST: {
      if (action.isResetData) {
        return { ...state, [action.identifier]: [] };
      }
      return state;
    }

    case CREATE_ADVERTISE.SUCCESS: {
      const { data, identifier } = action;
      if (identifier === IDENTIFIERS.CREATE_ADVERTISMENT) {
        return {
          ...state,
          MY_ADVERTISING_LIST: [data.id, ...state.MY_ADVERTISING_LIST],
          data: {
            ...state.data,
            [data.id]: action.data,
          },
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            [data.id]: action.data,
          },
        };
      }
    }

    case ADVERTISING_LIST.SUCCESS: {
      const { ids, items } = Util.normalizeData(action.data, 'id');
      return {
        ...state,
        [action.identifier]: AppUtil.getConcatDataList(action, ids, state),
        //[action.identifier]: ids,
        data: { ...state.data, ...items },
      };
    }

    case ADVERTISIEMENT_CLICKED.SUCCESS: {
      const id = action.data.advertisement_id;
      state.data[id].is_clicked = 1;
      return {
        ...state,
      };
    }

    case GET_ADVERTISIEMENT.SUCCESS:
    case GET_SINGLE_ADVERTISIEMENT.SUCCESS: {
      const { data } = action;
      // state.ADVERTISING_LIST.push(data.id);
      state.data[data.id] = data;
      return {
        ...state,
      };
    }

    case ADVERTISING_LIST.RESET: {
      return {
        ...state,
        [action.identifier]: [],
      };
    }

    default:
      return state;
  }
};
