import {
  ADD_ADDRESS,
  DELETE_ADDRESS,
  GET_ADDRESSES,
  UPDATE_ADDRESS,
} from './types';

export function requestAddAddress(payload) {
  return {
    payload,
    type: ADD_ADDRESS.REQUEST,
  };
}

export function successAddAddress(data) {
  return {
    data,
    type: ADD_ADDRESS.SUCCESS,
  };
}

export function failureAddAddress(errorMessage) {
  return {
    errorMessage,
    type: ADD_ADDRESS.FAILURE,
  };
}

export function requestGetAddress(payload) {
  return {
    payload,
    type: GET_ADDRESSES.REQUEST,
  };
}

export function successGetAddress(data) {
  return {
    data,
    type: GET_ADDRESSES.SUCCESS,
  };
}

export function failureGetAddress(errorMessage) {
  return {
    errorMessage,
    type: GET_ADDRESSES.FAILURE,
  };
}

export function requestUpdateAddress(payload) {
  return {
    payload,
    type: UPDATE_ADDRESS.REQUEST,
  };
}

export function successUpdateAddress(data) {
  return {
    data,
    type: UPDATE_ADDRESS.SUCCESS,
  };
}

export function failureUpdateAddress(errorMessage) {
  return {
    errorMessage,
    type: UPDATE_ADDRESS.FAILURE,
  };
}

export function requestDeleteAddress(payload) {
  return { payload, type: DELETE_ADDRESS.REQUEST };
}

export function successDeleteAddress(id) {
  return { id, type: DELETE_ADDRESS.SUCCESS };
}

export function failureDeleteAddress(errorMessage) {
  return {
    errorMessage,
    type: DELETE_ADDRESS.FAILURE,
  };
}
