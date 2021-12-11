import { GET_REVIEWS, RESET_REVIEWS } from './types';
import _ from 'lodash';
const initialState = {};

export default (state = initialState, action) => {
  console.log('action.identifier', action.identifier);
  switch (action.type) {
    case GET_REVIEWS.REQUEST: {
      if (action.isResetData) {
        return {
          ...state,
          [action.identifier]: [],
        };
      }
      return state;
    }

    case GET_REVIEWS.SUCCESS: {
      return {
        ...state,
        [action.identifier]: state[action.identifier]
          ? _.uniqBy(_.concat(state[action.identifier], action.data), '_id')
          : action.data,
      };
    }

    case RESET_REVIEWS: {
      return {
        ...state,
        [action.identifier]: [],
      };
    }

    default:
      return state;
  }
};
