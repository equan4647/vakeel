import {
  ADD_FOOD_TO_CART,
  CHANGE_FOOD_ITEM_QUANTITY,
  GET_CURRENT_FOOD_ORDER,
  RESET_FOOD_CART,
} from './types';

export function addFoodToCart(foodItem, restaurantData) {
  return { foodItem, restaurantData, type: ADD_FOOD_TO_CART };
}

export function changeItemQuantity(id, quantity) {
  return { id, quantity, type: CHANGE_FOOD_ITEM_QUANTITY };
}

export const resetFoodCart = { type: RESET_FOOD_CART };

export const requestCurrentFoodOrder = { type: GET_CURRENT_FOOD_ORDER.REQUEST };

export const successCurrentFoodOrder = { type: GET_CURRENT_FOOD_ORDER.SUCCESS };

export function failureCurrentFoodOrder(errorMessage) {
  return { errorMessage, type: GET_CURRENT_FOOD_ORDER.FAILURE };
}
