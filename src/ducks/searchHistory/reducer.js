import _ from 'lodash';

import { SAVE_SEARCH_HISTORY, CLEAR_SEARCH_HISTORY } from './types';
import { SEARCH_HISTORY_MAX } from '../../config/Constants';

const initialState = {};

export default (state = initialState, action) => {
  const { identifier, data } = action;

  switch (action.type) {
    case SAVE_SEARCH_HISTORY: {
      // get old data
      const newData = _.isUndefined(state[identifier])
        ? []
        : [...state[identifier]];

      // get item index if exists
      const indexLocation = _.findLastIndex(newData, {
        title: data.title,
      });

      // if item does not exists
      if (indexLocation === -1) {
        // add item at 0 index
        newData.splice(0, 0, data);
      } else {
        // remove old item
        newData.splice(indexLocation, 1);
        // add item at 0 index
        newData.splice(0, 0, action.data);
      }

      // set max limit for history
      const newHistoryMax =
        newData.length > SEARCH_HISTORY_MAX
          ? newData.slice(0, SEARCH_HISTORY_MAX)
          : newData;

      // set new data
      return { ...state, [identifier]: newHistoryMax };
    }

    case CLEAR_SEARCH_HISTORY: {
      return { ...state, [identifier]: [] };
    }

    default:
      return state;
  }
};
