import createRequestTypes from '../ActionTypes';

export const CREATE_ADVERTISE = createRequestTypes('CREATE_ADVERTISE');
export const ADVERTISING_LIST = createRequestTypes('ADVERTISING_LIST');
export const ADVERTISIEMENT_VIEW = createRequestTypes('ADVERTISIEMENT_VIEW');
export const ADVERTISIEMENT_CLICKED = createRequestTypes(
  'ADVERTISIEMENT_CLICKED'
);
export const ADVERTISIEMENT_STATS = createRequestTypes('ADVERTISIEMENT_STATS');
export const REPORT_ADVERTISIEMENT = createRequestTypes(
  'REPORT_ADVERTISIEMENT'
);
export const GET_SINGLE_ADVERTISIEMENT = createRequestTypes(
  'GET_SINGLE_ADVERTISIEMENT'
);

export const GET_ADVERTISIEMENT = createRequestTypes('GET_ADVERTISIEMENT');

export const ADVERTISIEMENT_GET_DAYS = createRequestTypes(
  'ADVERTISIEMENT_GET_DAYS'
);
// export const ADD_CLASSIFIED_TO_FAVORITE = createRequestTypes(
//   'ADD_CLASSIFIED_TO_FAVORITE'
// );
// export const SET_CLASSIFIED = 'SET_CLASSIFIED';
// export const RESET_LIST = 'RESET_LIST';
