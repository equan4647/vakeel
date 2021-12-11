// @flow
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const CANCEL = 'CANCEL';
export const RESET = 'RESET';

export const defaultTypes = [REQUEST, SUCCESS, FAILURE, CANCEL, RESET];

export default function createRequestTypes(base, types = defaultTypes) {
  const res = {};
  types.forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}
