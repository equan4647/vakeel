import createRequestTypes from '../ActionTypes';

export const GET_WALLET = createRequestTypes('GET_WALLET');
export const RESET_WALLET = 'RESET_WALLET';
export const SAVE_PREFFERED_CARD = 'SAVE_PREFFERED_CARD';
export const GET_CARD_LIST = createRequestTypes('GET_CARD_LIST');
export const ADD_PAYMENT_METHOD = createRequestTypes('ADD_PAYMENT_METHOD');
export const DELETE_PAYMENT_METHOD = createRequestTypes(
  'DELETE_PAYMENT_METHOD'
);
