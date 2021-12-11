import _ from 'lodash';

import { ADD_RECENT_LOCATION, SET_LAST_LOCATION } from './types';
import { RECENT_LOCATION_MAX } from '../../config/Constants';

const initialState = { recentLocations: [], lastLocations: {} };

export default (state = initialState, action) => {
  const { type, data, identifier } = action;
  switch (type) {
    case ADD_RECENT_LOCATION: {
      //const newRecentLocations = [...state.recentLocations];
      const { lat, lng } = action.data;
      const indexLocation = _.findLastIndex(state.recentLocations, {
        lat: lat,
        lng: lng,
      });
      // if it is new location
      if (indexLocation === -1) {
        // new locations array
        const newRecentLocations = [action.data, ...state.recentLocations];

        // set to max array
        const newLocationMax =
          newRecentLocations.length > RECENT_LOCATION_MAX
            ? newRecentLocations.slice(0, RECENT_LOCATION_MAX)
            : newRecentLocations;

        // set data
        return {
          ...state,
          recentLocations: newLocationMax,
        };
      } else {
        // new locations array
        const newRecentLocations = [...state.recentLocations];
        // remove old item
        newRecentLocations.splice(indexLocation, 1);
        // add item at 0 index
        newRecentLocations.splice(0, 0, action.data);
        // set max limit
        const newLocationMax =
          newRecentLocations.length > RECENT_LOCATION_MAX
            ? newRecentLocations.slice(0, RECENT_LOCATION_MAX)
            : newRecentLocations;
        // set data
        return {
          ...state,
          recentLocations: newLocationMax,
        };
      }
    }
    case SET_LAST_LOCATION: {
      return {
        ...state,
        lastLocations: {
          ...state.lastLocations,
          [identifier]: data,
        },
      };
    }
    default:
      return state;
  }
};

/*
    case ADD_RECENT_LOCATION: {
      if (state.recentLocations[identifier]) {
        return {
          ...state,
          recentLocations: {
            ...state.recentLocations,
            [identifier]: _.uniqWith(
              [...state.recentLocations[identifier], data],
              (prev, next) => prev.lat === next.lat && prev.lng === next.lng
            ),
          },
        };
      } else {
        return {
          ...state,
          recentLocations: { ...state.recentLocations, [identifier]: [data] },
        };
      }
    }
*/
