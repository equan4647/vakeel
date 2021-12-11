import {
  LOGIN,
  SIGN_UP,
  UPDATE_PROFILE,
  SOCIAL_AUTH,
  LOGOUT,
  VERIFY_EMAIL_SIGNUP,
  SEND_EMAIL_OTP,
  VERIFY_EMAIL_FORGOT,
  SET_NEW_PASSWORD,
  CHANGE_PASSWORD,
  SEND_PHONE_OTP,
  VERIFY_PHONE,
  SAVE_APPLE_CREDENTIALS,
  CHECK_SOCIAL_USER_EXIST,
  USER_KICKED,
} from './types';

export function UserKicked() {
  return { type: USER_KICKED };
}

export function requestLogin(payload) {
  return { payload, type: LOGIN.REQUEST };
}

export function successLogin(data) {
  return { data, type: LOGIN.SUCCESS };
}

export function failureLogin(errorMessage) {
  return { errorMessage, type: LOGIN.FAILURE };
}

export function requestLogout() {
  return { type: LOGOUT.REQUEST };
}

export const successLogout = { type: LOGOUT.SUCCESS };

export function failureLogout(errorMessage) {
  return { errorMessage, type: LOGOUT.FAILURE };
}

export function requestSignup(payload) {
  return { payload, type: SIGN_UP.REQUEST };
}

export function successSignup(data) {
  return { data, type: SIGN_UP.SUCCESS };
}

export function failureSignup(errorMessage) {
  return { errorMessage, type: SIGN_UP.FAILURE };
}

export function requestSocialAuth(payload) {
  return { payload, type: SOCIAL_AUTH.REQUEST };
}

export function successSocialAuth(data) {
  return { data, type: SOCIAL_AUTH.SUCCESS };
}

export function failureSocialAuth(errorMessage) {
  return { errorMessage, type: SOCIAL_AUTH.FAILURE };
}

export function requestVerifyEmailSignup(payload, onFailure) {
  return {
    payload,
    onFailure,
    type: VERIFY_EMAIL_SIGNUP.REQUEST,
  };
}

export function successVerifyEmailSignup(data) {
  return { data, type: VERIFY_EMAIL_SIGNUP.SUCCESS };
}

export function failureVerifyEmailSignup(errorMessage) {
  return { errorMessage, type: VERIFY_EMAIL_SIGNUP.FAILURE };
}

export function requestVerifyEmailForgot(payload, onFailure) {
  return {
    payload,
    onFailure,
    type: VERIFY_EMAIL_FORGOT.REQUEST,
  };
}

export function successVerifyEmailForgot(data) {
  return { data, type: VERIFY_EMAIL_FORGOT.SUCCESS };
}

export function failureVerifyEmailForgot(errorMessage) {
  return { errorMessage, type: VERIFY_EMAIL_FORGOT.FAILURE };
}

export function requestUpdateProfile(payload, onSuccess) {
  return {
    payload,
    onSuccess,
    type: UPDATE_PROFILE.REQUEST,
  };
}

export function successUpdateProfile(data) {
  return { data, type: UPDATE_PROFILE.SUCCESS };
}

export function failureUpdateProfile(errorMessage) {
  return { errorMessage, type: UPDATE_PROFILE.FAILURE };
}

export function requestSendEmailOTP(payload, onSuccess) {
  return {
    payload,
    onSuccess,
    type: SEND_EMAIL_OTP.REQUEST,
  };
}

export function successSendEmailOTP(data) {
  return { data, type: SEND_EMAIL_OTP.SUCCESS };
}

export function failureSendEmailOTP(errorMessage) {
  return { errorMessage, type: SEND_EMAIL_OTP.FAILURE };
}

export function requestSetNewPassword(payload) {
  return { payload, type: SET_NEW_PASSWORD.REQUEST };
}

export function successSetNewPassword(data) {
  return { data, type: SET_NEW_PASSWORD.SUCCESS };
}

export function failureSetNewPassword(errorMessage) {
  return { errorMessage, type: SET_NEW_PASSWORD.FAILURE };
}
export function requestChangePassword(payload) {
  return { payload, type: CHANGE_PASSWORD.REQUEST };
}

export function successChangePassword(data) {
  return { data, type: CHANGE_PASSWORD.SUCCESS };
}

export function failureChangePassword(errorMessage) {
  return { errorMessage, type: CHANGE_PASSWORD.FAILURE };
}

export function requestSendPhoneOTP(payload, onSuccess) {
  return {
    payload,
    onSuccess,
    type: SEND_PHONE_OTP.REQUEST,
  };
}

export function successSendPhoneOTP(data) {
  return { data, type: SEND_PHONE_OTP.SUCCESS };
}

export function failureSendPhoneOTP(errorMessage) {
  return { errorMessage, type: SEND_PHONE_OTP.FAILURE };
}

export function requestVerifyPhone(payload, onSuccess, onFailure) {
  return {
    payload,
    onSuccess,
    onFailure,
    type: VERIFY_PHONE.REQUEST,
  };
}

export function successVerifyPhone(data) {
  return { data, type: VERIFY_PHONE.SUCCESS };
}

export function failureVerifyPhone(errorMessage) {
  return { errorMessage, type: VERIFY_PHONE.FAILURE };
}

export function saveAppleCredentials(payload) {
  return { payload, type: SAVE_APPLE_CREDENTIALS };
}

export function requestCheckSocialUserExist(
  payload,
  data,
  onSuccess,
  onFailure
) {
  return {
    payload,
    data,
    onSuccess,
    onFailure,
    type: CHECK_SOCIAL_USER_EXIST,
  };
}
