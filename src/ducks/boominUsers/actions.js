import { GET_BOOMIN_USER, REPORT_BOOMIN_USER } from './types';

export function requestGetBoominUser(
  payload,
  isPullToRefresh,
  identifier,
  isResetData
) {
  return {
    payload,
    isPullToRefresh,
    identifier,
    isResetData,
    type: GET_BOOMIN_USER.REQUEST,
  };
}

export function successGetBoominUser(data, identifier) {
  return { data, identifier, type: GET_BOOMIN_USER.SUCCESS };
}

export function failureGetBoominUser(errorMessage, identifier) {
  return { errorMessage, identifier, type: GET_BOOMIN_USER.FAILURE };
}

export function requestReportBoominUser(payload) {
  return { payload, type: REPORT_BOOMIN_USER.REQUEST };
}

export function successReportBoominUser(data) {
  return { data, type: REPORT_BOOMIN_USER.SUCCESS };
}

export function failureReportBoominUser(errorMessage) {
  return { errorMessage, type: REPORT_BOOMIN_USER.FAILURE };
}
