import { LOGIN_GUEST, GUEST_TOKEN } from './types';

export const loginGuest = { type: LOGIN_GUEST };

export function requestGuestToken(payload) {
  return { payload, type: GUEST_TOKEN.REQUEST };
}

export function successGuestToken(guestToken, deviceId) {
  return { guestToken, deviceId, type: GUEST_TOKEN.SUCCESS };
}

export function failureGuestToken(errorMessage) {
  return { errorMessage, type: GUEST_TOKEN.FAILURE };
}
