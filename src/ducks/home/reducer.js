import {
  GET_HOME_MARKETPLACE,
  GET_HOME_CLASSIFIED,
  GET_HOME_SERVICES,
  GET_HOME_FOOD,
} from './types';

const initialState = {
  marketplace: {},
  classified: {},
  services: {},
  food: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_MARKETPLACE.REQUEST: {
      if (action.isResetData) {
        return {
          ...state,
          marketplace: {},
        };
      }
      return state;
    }

    case GET_HOME_MARKETPLACE.SUCCESS: {
      return {
        ...state,
        marketplace: action.data,
      };
    }

    case GET_HOME_CLASSIFIED.REQUEST: {
      if (action.isResetData) {
        return {
          ...state,
          classified: {},
        };
      }
      return state;
    }

    case GET_HOME_CLASSIFIED.SUCCESS: {
      return {
        ...state,
        classified: action.data,
      };
    }

    case GET_HOME_SERVICES.REQUEST: {
      if (action.isResetData) {
        return {
          ...state,
          services: {},
        };
      }
      return state;
    }

    case GET_HOME_SERVICES.SUCCESS: {
      return {
        ...state,
        services: action.data,
      };
    }

    case GET_HOME_FOOD.REQUEST: {
      if (action.isResetData) {
        return {
          ...state,
          food: {},
        };
      }
      return state;
    }

    case GET_HOME_FOOD.SUCCESS: {
      return {
        ...state,
        food: action.data,
      };
    }

    default:
      return state;
  }
};
