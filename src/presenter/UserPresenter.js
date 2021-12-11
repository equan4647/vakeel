// @flow
import _ from 'lodash';
import {Util} from '../utils';
import {
  API_USER_LOGIN,
  API_VALIDATE_USERNAME,
  API_USER_VERIFY_CODE,
  API_USER_LOGOUT,
  API_USER_UPDATE,
  API_USER_CHANGE_PASSWORD,
  API_USER_RESET_PASSWORD,
  API_USER_VERIFY_CODE_PHONE,
} from '../config/WebService';
import {DataHandler} from '../utils/';
import {
  AUTH_IDENTIFIER_RESET,
  AUTH_IDENTIFIER_CHANGE_PASSWORD,
  AUTH_IDENTIFIER_VALIDATE_USERNAME,
  AUTH_IDENTIFIER_VERIFY_PHONE,
} from '../ducks/ActionTypes';
import {getUserID} from '../ducks/auth/selectors';
import {COUNTRY_CODE} from '../config/Constants';

class UserPresenter {
  onFaliure = (err) => Util.showMessage(err.message);

  /** Requests **/
  validateUserName(requestMethod, payload, failureCallback) {
    requestMethod(
      payload,
      AUTH_IDENTIFIER_VALIDATE_USERNAME,
      API_VALIDATE_USERNAME,
      () => null,
      failureCallback,
    );
  }

  login(requestMethod, payload, identifier, successCallback, failureCallback) {
    requestMethod(
      payload,
      identifier,
      API_USER_LOGIN,
      successCallback,
      failureCallback || this.onFaliure,
    );
  }

  sendVerificationCodeRequest(
    requestMethod,
    payload,
    identifier,
    url,
    successCallback,
    failureCallback,
  ) {
    requestMethod(
      payload,
      identifier,
      url,
      successCallback,
      failureCallback || this.onFaliure,
    );
  }

  VerifyCode(
    requestMethod,
    payload,
    identifier,
    successCallback,
    failureCallback,
  ) {
    requestMethod(
      payload,
      identifier,
      identifier === AUTH_IDENTIFIER_VERIFY_PHONE
        ? API_USER_VERIFY_CODE_PHONE
        : API_USER_VERIFY_CODE,
      successCallback,
      failureCallback || this.onFaliure,
    );
  }

  updateUser(
    requestMethod,
    payload,
    identifier,
    successCallback,
    header_data,
    failureCallback,
  ) {
    const isResetPass = identifier === AUTH_IDENTIFIER_RESET;
    const url = isResetPass
      ? API_USER_RESET_PASSWORD(header_data.id)
      : API_USER_UPDATE(getUserID(DataHandler.getStore().getState()));

    if (isResetPass) {
      url.token = header_data.token;
    }

    requestMethod(
      payload,
      identifier,
      url,
      successCallback,
      failureCallback || this.onFaliure,
    );
  }

  changePassword(requestMethod, payload, successCallback, failureCallback) {
    requestMethod(
      payload,
      AUTH_IDENTIFIER_CHANGE_PASSWORD,
      API_USER_CHANGE_PASSWORD,
      successCallback,
      failureCallback || this.onFaliure,
    );
  }

  logout(requestMethod, id) {
    const onSuccess = () => {};

    requestMethod(API_USER_LOGOUT(id), onSuccess, this.onFaliure);
  }

  /** Requests **/

  getId(user) {
    return !Util.isEmpty(user) && user.id ? user.id : '';
  }

  getDeviceToken(user) {
    return !Util.isEmpty(user) && user.device_token ? user.device_token : '';
  }

  getAccessToken(user) {
    return !Util.isEmpty(user) && user.access_token
      ? user.access_token.accessToken
      : '';
  }

  isPhoneVerified(user) {
    return !Util.isEmpty(user) && user.phone_verified !== undefined
      ? user.phone_verified
      : false;
  }

  isEmailVerified(user) {
    return !Util.isEmpty(user) && user.email_verified !== undefined
      ? user.email_verified
      : false;
  }

  getCountryCode(user) {
    return !Util.isEmpty(user) && user.country_code
      ? user.country_code
      : COUNTRY_CODE;
  }
  getPhoneNumber(user) {
    return !Util.isEmpty(user) && user.phone_number ? user.phone_number : '';
  }
  isPhoneNumberVerified(user) {
    return !Util.isEmpty(user) && user['phone_verified']
      ? user.phone_number
      : false;
  }
  getName(user) {
    return !Util.isEmpty(user) && user.name ? user.name : '';
  }
  getLegalName(user) {
    return !Util.isEmpty(user) && user.legal_name ? user.legal_name : '';
  }
  getStageName(user) {
    return !Util.isEmpty(user) && user.stage_name ? user.stage_name : '';
  }
  getUserName(user) {
    return !Util.isEmpty(user) && user.username ? user.username : '';
  }
  getEmail(user) {
    return !Util.isEmpty(user) && user.emailAddress ? user.emailAddress : '';
  }

  getImage(user) {
    return !Util.isEmpty(user) && user.attachment?.url
      ? user.attachment.url
      : '';
  }

  getThumbnail(user) {
    return !Util.isEmpty(user) && user.attachment?.thumbnail_url
      ? user.attachment.thumbnail_url
      : '';
  }

  getPhoneNumberWithCountryCode(user) {
    return !Util.isEmpty(user) &&
      !Util.isEmpty(user.country_code) &&
      !Util.isEmpty(user.phone)
      ? `${user.country_code}${user.phone}`
      : '';
  }

  getUserType(user) {
    return !Util.isEmpty(user) && user.usertype ? user.usertype : [];
  }

  getChatUserName(user) {
    return !Util.isEmpty(user) && user.chat_username ? user.chat_username : '';
  }

  getChatID(user) {
    return !Util.isEmpty(user) &&
      !Util.isEmpty(user.access_token) &&
      !Util.isEmpty(user.access_token.chatAccessToken) &&
      !Util.isEmpty(user.access_token.chatAccessToken.userId)
      ? user.access_token.chatAccessToken.userId
      : '';
  }

  getDOB(user) {
    return !Util.isEmpty(user) && user.dob ? user.dob : '';
  }
  getAddress(user) {
    return !Util.isEmpty(user) && user.address ? user.address.address : '';
  }
  getState(user) {
    return !Util.isEmpty(user) && user.address ? user.address.state : '';
  }
  getCity(user) {
    return !Util.isEmpty(user) && user.address ? user.address.city : '';
  }
  getZipCode(user) {
    return !Util.isEmpty(user) && user.address ? user.address.zip_code : '';
  }
  getUnions(user) {
    return !Util.isEmpty(user) && user.unions ? user.unions : [];
  }
  isTestUploaded(user) {
    return !Util.isEmpty(user) && user.test_status
      ? user.test_status.test_uploaded
      : false;
  }

}

export default new UserPresenter();
