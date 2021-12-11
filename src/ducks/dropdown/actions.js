import { DROPDOWN_DATA } from './types';

export function requestDropdownData(api, identifier, payload) {
  return { api, identifier, payload, type: DROPDOWN_DATA.REQUEST };
}

export function successDropdownData(data, identifier) {
  return { data, identifier, type: DROPDOWN_DATA.SUCCESS };
}

export function failureDropdownData(errorMessage, identifier) {
  return { errorMessage, identifier, type: DROPDOWN_DATA.FAILURE };
}
