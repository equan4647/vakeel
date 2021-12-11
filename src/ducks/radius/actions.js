import { SET_RADIUS } from './types';

export function setRadius(identifier, radius) {
  return {
    identifier,
    radius,
    type: SET_RADIUS,
  };
}
