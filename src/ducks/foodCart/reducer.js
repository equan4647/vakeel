import _ from 'lodash';
import { Util } from '../../utils';
import {
  ADD_FOOD_TO_CART,
  CHANGE_FOOD_ITEM_QUANTITY,
  RESET_FOOD_CART,
} from './types';

const initialState = {
  ids: [],
  items: {},
  restaurantID: '',
  restaurantData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FOOD_TO_CART:
      const { foodItem, restaurantData } = action,
        restaurantID = Util.getID(restaurantData),
        id = Util.getID(foodItem);

      let quantity = state.items[id]?.quantity ?? 0;
      quantity++;

      const items =
        restaurantID != state.restaurantID
          ? { [id]: { ...foodItem, quantity } }
          : { ...state.items, [id]: { ...foodItem, quantity } };

      const ids =
        restaurantID != state.restaurantID ? [id] : _.uniq([...state.ids, id]);

      return { ...state, ids, items, restaurantID, restaurantData };

    case CHANGE_FOOD_ITEM_QUANTITY:
      const newState = { ...state };

      newState.items = {
        ...state.items,
        [action.id]: {
          ...state.items?.[action?.id],
          quantity: action.quantity,
        },
      };

      if (action.quantity == 0) {
        if (state.ids.length == 1) {
          newState.restaurantID = '';
          newState.restaurantData = {};
        }

        delete newState.items?.[action.id];
        newState.ids = newState.ids.filter(_id => _id != action?.id);
      }

      return newState;

    case RESET_FOOD_CART:
      return initialState;

    default:
      return state;
  }
};
