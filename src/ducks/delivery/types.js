import createRequestTypes from '../ActionTypes';

export const SET_DELIEVERY_PAYMENT_METHOD = 'SET_DELIEVERY_PAYMENT_METHOD';
export const CREATE_DELIVERY = createRequestTypes('CREATE_DELIVERY');
export const PLACE_DELIVERY_ORDER = createRequestTypes('PLACE_DELIVERY_ORDER');
export const GET_ONGOING_ORDER = createRequestTypes('GET_ONGOING_ORDER');
export const ADD_DELIVERY_RATING = createRequestTypes('ADD_DELIVERY_RATING');
export const RESET_CURRENT_DELIVERY = 'RESET_CURRENT_DELIVERY';
export const UPDATE_DELIVERY_INFO = 'UPDATE_DELIVERY_INFO';
export const UPDATE_CURRENT_DELIVERY = 'UPDATE_CURRENT_DELIVERY';
export const CANCEL_DELIVERY_ORDER = createRequestTypes(
  'CANCEL_DELIVERY_ORDER'
);
export const REPORT_DELIVERY_ORDER = createRequestTypes(
  'REPORT_DELIVERY_ORDER'
);
export const FIND_DRIVER = createRequestTypes('FIND_DRIVER');
