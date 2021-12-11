import createRequestTypes from '../ActionTypes';

export const ADD_FOOD_TO_CART = 'ADD_FOOD_TO_CART';
export const RESET_FOOD_CART = 'RESET_FOOD_CART';
export const CHANGE_FOOD_ITEM_QUANTITY = 'CHANGE_FOOD_ITEM_QUANTITY';
export const REMOVE_FOOD_FROM_CART = createRequestTypes(
  'REMOVE_FOOD_FROM_CART'
);
export const GET_CURRENT_FOOD_ORDER = createRequestTypes(
  'GET_CURRENT_FOOD_ORDER'
);
