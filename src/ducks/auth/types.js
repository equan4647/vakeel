import createRequestTypes from '../ActionTypes';

export const LOGIN = createRequestTypes('LOGIN');
export const USER_KICKED = 'USER_KICKED';
export const VERIFY_EMAIL_SIGNUP = createRequestTypes('VERIFY_EMAIL_SIGNUP');
export const VERIFY_EMAIL_FORGOT = createRequestTypes('VERIFY_EMAIL_FORGOT');
export const VERIFY_PHONE = createRequestTypes('VERIFY_PHONE');
export const SIGN_UP = createRequestTypes('SIGN_UP');
export const SOCIAL_AUTH = createRequestTypes('SOCIAL_AUTH');
export const UPDATE_PROFILE = createRequestTypes('UPDATE_PROFILE');
export const LOGOUT = createRequestTypes('LOGOUT');
export const SEND_EMAIL_OTP = createRequestTypes('SEND_EMAIL_OTP');
export const SEND_PHONE_OTP = createRequestTypes('SEND_PHONE_OTP');
export const SET_NEW_PASSWORD = createRequestTypes('SET_NEW_PASSWORD');
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');
export const CHECK_SOCIAL_USER_EXIST = 'CHECK_SOCIAL_USER_EXIST';

export const SAVE_APPLE_CREDENTIALS = 'SAVE_APPLE_CREDENTIALS';
