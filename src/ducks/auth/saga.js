import { put, call, fork, take, select } from 'redux-saga/effects';
import _ from 'lodash';
import {
  API_USER_LOGIN,
  API_USER_SIGNUP,
  API_VERIFY_EMAIL,
  API_SOCIAL_AUTH,
  API_USER_LOGOUT,
  API_SEND_OTP,
  API_SET_NEW_PASSWORD,
  API_CHANGE_PASSWORD,
  API_UPDATE_PROFILE,
  API_SEND_OTP_PHONE,
  API_VERIFY_PHONE,
  API_CHECK_SOCIAL_USER,
} from '../../config/WebService';
import {
  successLogin,
  failureLogin,
  failureSignup,
  successSignup,
  successLogout,
  failureLogout,
  successSendEmailOTP,
  failureSendEmailOTP,
  successVerifyEmailSignup,
  failureVerifyEmailSignup,
  successVerifyEmailForgot,
  failureVerifyEmailForgot,
  successSetNewPassword,
  failureSetNewPassword,
  successSocialAuth,
  failureSocialAuth,
  successChangePassword,
  failureChangePassword,
  successUpdateProfile,
  failureUpdateProfile,
  successSendPhoneOTP,
  failureSendPhoneOTP,
  successVerifyPhone,
  failureVerifyPhone,
} from './actions';
import {
  LOGIN,
  SIGN_UP,
  SOCIAL_AUTH,
  LOGOUT,
  VERIFY_EMAIL_SIGNUP,
  SEND_EMAIL_OTP,
  VERIFY_EMAIL_FORGOT,
  SET_NEW_PASSWORD,
  CHANGE_PASSWORD,
  UPDATE_PROFILE,
  SEND_PHONE_OTP,
  VERIFY_PHONE,
  CHECK_SOCIAL_USER_EXIST,
} from './types';

import { callRequest, callRequestFileUpload } from '../../utils/ApiSauce';
import { getDrawerPreference } from '../drawerPreference/selectors';
import {
  DataHandler,
  FirebaseUtils,
  NavigationService,
  Util,
} from '../../utils';
import { strings } from '../../utils/i18n';
import { ChatHelper } from '../../ChatUtil';
import { isOrderActive } from '../delivery/selectors';
import { isOrderInProgressOrPending } from '../foodOrders/selectors';

function* watchLoginRequest() {
  while (true) {
    const { payload } = yield take(LOGIN.REQUEST);
    const fcm_token = yield FirebaseUtils.getTokenPromise();

    payload.device_token = fcm_token;
    try {
      const { data, msg } = yield call(callRequest, API_USER_LOGIN, payload);
      if (data.user_verified === false) {
        yield put(failureLogin(msg));
        Util.showMessage(msg);

        NavigationService.reset('OTPVerification', {
          email: payload?.email,
        });
      } else {
        yield put(successLogin(data));

        Util.navigateToAuthorizedApp();
      }
    } catch (err) {
      Util.showMessage(err.message);
      yield put(failureLogin(err.message));
    }
  }
}

function* watchLogoutRequest() {
  while (true) {
    yield take(LOGOUT.REQUEST);

    const deliveryActive = yield select(isOrderActive),
      foodOrderActive = yield select(isOrderInProgressOrPending);

    try {
      if (deliveryActive || foodOrderActive) {
        NavigationService.closeDrawer();
        Util.showMessage(strings('messages.no_logout'));

        yield put(failureLogout(strings('messages.no_logout')));
      } else {
        yield call(callRequest, API_USER_LOGOUT, {});
        yield put(successLogout);
        Util.showMessage(strings('app.you_are_now_guest'), 'success');

        ChatHelper.disconnectSocket(true);
        FirebaseUtils.removeAllNotifications();
        // NavigationService.reset('Login');
      }
    } catch (err) {
      yield put(failureLogout(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchSignupRequest() {
  while (true) {
    const { payload } = yield take(SIGN_UP.REQUEST);
    const fcm_token = yield FirebaseUtils.getTokenPromise();

    payload.device_token = fcm_token;
    try {
      const response = yield call(callRequest, API_USER_SIGNUP, payload);
      yield put(successSignup(response?.data));

      NavigationService.navigate('OTPVerification', {
        email: payload?.email,
        device_token: fcm_token,
      });
    } catch (err) {
      yield put(failureSignup(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchSocialAuthRequest() {
  while (true) {
    const { payload } = yield take(SOCIAL_AUTH.REQUEST);
    const fcm_token = yield FirebaseUtils.getTokenPromise();

    payload.device_token = fcm_token;
    try {
      const response = yield call(callRequest, API_SOCIAL_AUTH, payload);
      yield put(successSocialAuth(response?.data));

      Util.navigateToAuthorizedApp();
      /*
      const drawerPreference = yield select(getDrawerPreference);
      drawerPreference
        ? Util.navigateToAuthorizedApp()
        : NavigationService.reset('SideMenuPrefrence');
      DataHandler.getAuthorizationCB()?.();
      ChatHelper.connectOnLogin();
      */
    } catch (err) {
      yield put(failureSocialAuth(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchSendEmailOTP_Request() {
  while (true) {
    const { payload, onSuccess } = yield take(SEND_EMAIL_OTP.REQUEST);

    try {
      const response = yield call(callRequest, API_SEND_OTP, payload);
      yield put(successSendEmailOTP(response?.data));

      response && onSuccess && onSuccess();
    } catch (err) {
      yield put(failureSendEmailOTP(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchUpdateProfile() {
  while (true) {
    const { payload, onSuccess } = yield take(UPDATE_PROFILE.REQUEST);
    const newPayload = { ...payload };

    try {
      if (!_.isEmpty(payload.image)) {
        const response = yield call(callRequestFileUpload, payload.image);
        delete newPayload.image;
        newPayload.avatar = response?.data?.file;
      }

      const response = yield call(callRequest, API_UPDATE_PROFILE, newPayload);
      yield put(successUpdateProfile(response?.data));

      response && onSuccess && onSuccess();
    } catch (err) {
      yield put(failureUpdateProfile(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchVerifyEmailSignupRequest() {
  while (true) {
    const { payload, onFailure } = yield take(VERIFY_EMAIL_SIGNUP.REQUEST);

    try {
      const response = yield call(callRequest, API_VERIFY_EMAIL, payload);
      yield put(successVerifyEmailSignup(response?.data));

      Util.navigateToAuthorizedApp();
      /*
      NavigationService.reset('SideMenuPrefrence'); //signs up to enter app
      DataHandler.getAuthorizationCB()?.();
      ChatHelper.connectOnLogin();
      */
    } catch (err) {
      yield put(failureVerifyEmailSignup(err.message));
      Util.showMessage(err.message);

      onFailure?.();
    }
  }
}

function* watchVerifyEmailForgotRequest() {
  while (true) {
    const { payload, onFailure } = yield take(VERIFY_EMAIL_FORGOT.REQUEST);

    try {
      const { data } = yield call(callRequest, API_VERIFY_EMAIL, payload);
      yield put(successVerifyEmailForgot({ auth: data?.auth }));

      NavigationService.reset('Password', {
        email: payload.email,
        isForgotFlow: true,
      });
    } catch (err) {
      yield put(failureVerifyEmailForgot(err.message));
      Util.showMessage(err.message);
      if (onFailure) {
        onFailure();
      }
    }
  }
}

function* watchSetNewPassword() {
  while (true) {
    const { payload } = yield take(SET_NEW_PASSWORD.REQUEST);

    try {
      const response = yield call(callRequest, API_SET_NEW_PASSWORD, payload);
      yield put(successSetNewPassword(response?.data));

      Util.showMessage(strings('app.set_new_pass_success'), 'success');
      NavigationService.push('Login', { showCross: false });
    } catch (err) {
      yield put(failureSetNewPassword(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchChangePassword() {
  while (true) {
    const { payload } = yield take(CHANGE_PASSWORD.REQUEST);

    try {
      const response = yield call(callRequest, API_CHANGE_PASSWORD, payload);
      yield put(successChangePassword(response?.data));

      Util.showMessage(strings('app.pass_change_success'), 'success');
      NavigationService.navigate('EditProfile');
    } catch (err) {
      yield put(failureChangePassword(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchSendPhoneOTP() {
  while (true) {
    const { payload, onSuccess } = yield take(SEND_PHONE_OTP.REQUEST);

    try {
      const response = yield call(callRequest, API_SEND_OTP_PHONE, payload);
      yield put(successSendPhoneOTP(response?.data));

      response && onSuccess?.();
    } catch (err) {
      yield put(failureSendPhoneOTP(err.message));
      Util.showMessage(err.message);
    }
  }
}

function* watchVerifyPhoneOTP() {
  while (true) {
    const { payload, onSuccess, onFailure } = yield take(VERIFY_PHONE.REQUEST);

    try {
      const response = yield call(callRequest, API_VERIFY_PHONE, payload);
      yield put(successVerifyPhone(response?.data));

      response && onSuccess && onSuccess();
    } catch (err) {
      yield put(failureVerifyPhone(err.message));
      Util.showMessage(err.message);
      if (onFailure) {
        onFailure();
      }
    }
  }
}

function* watchSocialUserExist() {
  while (true) {
    const { payload, data, onSuccess, onFailure } = yield take(
      CHECK_SOCIAL_USER_EXIST
    );

    try {
      const response = yield call(callRequest, API_CHECK_SOCIAL_USER, payload);
      response?.data && onSuccess?.(response.data, data);
    } catch (err) {
      if (err.statusCode == 400) {
        //Util.showMessage(strings('app.enter_email'), 'sucess');
        onFailure?.();
      } else {
        Util.showMessage(err.message);
      }
    }
  }
}

export default function* root() {
  yield fork(watchLoginRequest);
  yield fork(watchSignupRequest);
  yield fork(watchVerifyEmailSignupRequest);
  yield fork(watchSocialAuthRequest);
  yield fork(watchSendEmailOTP_Request);
  yield fork(watchLogoutRequest);
  yield fork(watchVerifyEmailForgotRequest);
  yield fork(watchSetNewPassword);
  yield fork(watchChangePassword);
  yield fork(watchSendPhoneOTP);
  yield fork(watchVerifyPhoneOTP);
  yield fork(watchUpdateProfile);
  yield fork(watchSocialUserExist);
}
