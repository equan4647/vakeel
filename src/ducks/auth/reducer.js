import {
  LOGIN,
  LOGOUT,
  SOCIAL_AUTH,
  UPDATE_PROFILE,
  USER_KICKED,
  VERIFY_EMAIL_FORGOT,
  VERIFY_EMAIL_SIGNUP,
} from './types';

const initialState = { data: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS:
    case UPDATE_PROFILE.SUCCESS:
    case VERIFY_EMAIL_SIGNUP.SUCCESS:
    case VERIFY_EMAIL_FORGOT.SUCCESS:
    case SOCIAL_AUTH.SUCCESS: {
      return { data: { ...state.data, ...action.data } };
    }

    case USER_KICKED:
    case LOGOUT.SUCCESS:
      return initialState;

    default:
      return state;
  }
};
