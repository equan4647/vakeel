import createRequestTypes from '../ActionTypes';

export const PRODUCT_LIST = createRequestTypes('PRODUCT_LIST');
export const ADD_PRODUCT_TO_FAVORITE = createRequestTypes(
  'ADD_PRODUCT_TO_FAVORITE'
);
export const REMOVE_PRODUCT_FROM_FAVORITE = createRequestTypes(
  'REMOVE_PRODUCT_FROM_FAVORITE'
);

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const GET_PRODUCT = createRequestTypes('GET_PRODUCT');
//export const RESET_BUYING_LIST = createRequestTypes('RESET_BUYING_LIST');
//export const RESET_LIST = 'RESET_LIST';
