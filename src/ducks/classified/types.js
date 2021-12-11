import createRequestTypes from '../ActionTypes';

export const CLASSIFIED_ADD = createRequestTypes('CLASSIFIED_ADD');
export const CLASSIFIED_LIST = createRequestTypes('CLASSIFIED_LIST');
export const ADD_CLASSIFIED_TO_FAVORITE = createRequestTypes(
  'ADD_CLASSIFIED_TO_FAVORITE'
);
export const SET_CLASSIFIED = 'SET_CLASSIFIED';
export const REPORT_CLASSIFIED = createRequestTypes('REPORT_CLASSIFIED');
export const USER_PROFILE = createRequestTypes('USER_PROFILE');
export const REPORT_USER_CLASSIFIED = createRequestTypes(
  'REPORT_USER_CLASSIFIED'
);
export const DELETE_CLASSIFIED = createRequestTypes('DELETE_CLASSIFIED');
export const GET_CLASSIFIED = createRequestTypes('GET_CLASSIFIED');

//export const RESET_LIST = 'RESET_LIST';
