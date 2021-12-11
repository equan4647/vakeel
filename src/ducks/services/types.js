import createRequestTypes from '../ActionTypes';

export const SET_SERVICES = 'SET_SERVICES';
export const SERVICES_LIST = createRequestTypes('SERVICES_LIST');
export const BOOK_APPOINTMENT = createRequestTypes('BOOK_APPOINTMENT');
export const AVAILABLE_SLOTS = createRequestTypes('AVAILABLE_SLOTS');
export const REPORT_SERVICE = createRequestTypes('REPORT_SERVICE');
export const ADD_SERVICE_TO_FAVORITE = createRequestTypes(
  'ADD_SERVICE_TO_FAVORITE'
);
