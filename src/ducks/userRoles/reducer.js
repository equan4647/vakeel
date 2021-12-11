import { GUEST_TOKEN } from './types';

const initialState = { guestToken: '', deviceId: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case GUEST_TOKEN.SUCCESS:
      return { guestToken: action.guestToken, deviceId: action.deviceId };

    default:
      return state;
  }
};

/*
import { LOGIN, SOCIAL_AUTH, VERIFY_EMAIL_SIGNUP } from '../auth/types';
import { LOGIN_GUEST, GUEST_TOKEN } from './types';

const initialState = { isGuest: false, guestToken: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS:
    case SOCIAL_AUTH.SUCCESS:
    case VERIFY_EMAIL_SIGNUP.SUCCESS:
      return { ...state, isGuest: false };

    case LOGIN_GUEST:
      return { ...state, isGuest: true };

    case GUEST_TOKEN.SUCCESS:
      return { ...state, guestToken: action.data };

    default:
      return state;
  }
};
*/
