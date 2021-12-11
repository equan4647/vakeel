import _ from 'lodash';
import { create } from 'apisauce';
import { eventChannel, END } from 'redux-saga';
import CookieManager from 'react-native-cookies';

import {
  API_LOG,
  BASE_URL,
  SOCKET_BASE_URL,
  API_TIMEOUT,
  REQUEST_TYPE,
  X_API_TOKEN,
  API_UPLOAD_FILE,
  X_DEVICE_ID,
  GUEST_AUTH,
} from '../config/WebService';

import DataHandler from './DataHandler';
import { strings } from './i18n';
import { NavigationService, Util, FirebaseUtils } from '../utils';
import ChatHelper from '../ChatUtil/ChatHelper';

import { authSelectors, authActions } from '../ducks/auth';
import { userRoleSelectors } from '../ducks/userRoles';

const api = create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

export async function callRequestFileUpload(uri) {
  const payload = new FormData();
  const photo = { uri, type: 'image/jpeg', name: 'image.jpg' };
  payload.append('file', photo);
  const url = API_UPLOAD_FILE;
  const headers = {};

  const { route, access_token_required } = url;
  // set X-API-TOKEN
  if (access_token_required) {
    const token = authSelectors.getUserToken(DataHandler.getStore().getState());
    headers[X_API_TOKEN] = token;
  }

  // init header object
  const headerObject = { headers };

  // init responseoc
  let response = await api.post(route, payload, headerObject);

  // log web service response
  if (__DEV__ && API_LOG) {
    console.log('url', url);
    console.log('response', response);
    console.log('payload', payload);
    console.log('headers', headers);
  }

  return handleResponse(response, headers);
}

export async function callRequest(url, payload, headers = {}, parameter = '') {
  // get attributes from url

  const { type, access_token_required } = url;
  // set X-API-TOKEN
  if (access_token_required) {
    const storeRef = DataHandler.getStore().getState();
    const token = authSelectors.getUserToken(storeRef);
    if (token !== '') {
      headers[X_API_TOKEN] = token;
    } else {
      const guestToken = userRoleSelectors.getGuestUserToken(storeRef);
      const deviceId = userRoleSelectors.getDeviceId(storeRef);
      headers[X_API_TOKEN] = guestToken;
      headers[X_DEVICE_ID] = deviceId;
      headers[GUEST_AUTH] = true;
    }
  }

  const route =
    parameter && parameter !== '' ? url.route + '/' + parameter : url.route;

  headers['Content-Type'] = 'application/json';

  // init header object
  const headerObject = { headers };

  // init responseoc
  let response;

  // Clear cookies automatically saved on native side
  await CookieManager.clearAll();
  // on type send request
  switch (type) {
    case REQUEST_TYPE.GET:
      response = await api.get(route, payload, headerObject);
      break;
    case REQUEST_TYPE.POST:
      response = await api.post(route, payload, headerObject);
      break;
    case REQUEST_TYPE.DELETE:
      response = await api.delete(
        route,
        {},
        { data: payload, ...headerObject }
      );
      //response = await api.delete(route, payload, headerObject);
      break;
    case REQUEST_TYPE.PUT:
      response = await api.put(route, payload, headerObject);
      break;
    case REQUEST_TYPE.PATCH:
      response = await api.patch(route, payload, headerObject);
      break;
    default:
      response = await api.get(route, payload, headerObject);
  }

  // log web service response
  if (__DEV__ && API_LOG) {
    console.log('url', url);
    console.log('response', response);
    console.log('payload', payload);
    console.log('headers', headers);
    console.log('route', route);
  }

  return handleResponse(response, headers);
}

export function handleResponse(response, headers) {
  return new Promise((resolve, reject) => {
    // network error  internet not working
    const isNetWorkError = response.problem === 'NETWORK_ERROR';
    // network error  internet not working
    const isClientError = response.problem === 'CLIENT_ERROR';
    // kick user from server
    const status = response?.status ?? 500;
    const isKickUser = status === 403;
    // if response is valid
    const isResponseValid =
      response.ok && status === 200 && Util.isNotEmpty(response.data)
        ? true
        : false;

    //  && response.data.message;

    //console.log('headers3333', headers);

    //console.log('isResponseValid', isResponseValid);

    if (isResponseValid) {
      resolve(response.data);
    } else if (isNetWorkError) {
      if (DataHandler.getIsInternetConnected()) {
        reject(
          strings({
            message: 'api_error_messages.something_went_wrong',
            statusCode: status,
          })
        );
      } else {
        reject({
          message: strings('api_error_messages.network_not_available'),
          statusCode: status,
        });
      }
    } else if (isKickUser) {
      reject({
        message: headers[GUEST_AUTH]
          ? strings('api_error_messages.device_block_message')
          : strings('api_error_messages.kick_user'),
        statusCode: 403,
      });
      ChatHelper.disconnectSocket();
      FirebaseUtils.removeAllNotifications();
      DataHandler.getStore().dispatch(authActions.UserKicked());

      if (headers[GUEST_AUTH]) {
        setTimeout(() => {
          DataHandler.getGuestModalRef().deviceIsBlocked();
        }, 300);
      } else {
        setTimeout(() => {
          Util.showMessage(strings('api_error_messages.kick_user', 10000));
          NavigationService.reset('Main');
        }, 200);
      }
    } else if (isClientError) {
      reject({
        message:
          response.data &&
          response.data.msg &&
          typeof response.data.msg === 'string'
            ? response.data.msg
            : strings('api_error_messages.something_went_wrong'),
        statusCode: status,
      });
      /*
      reject({
        message: response?.data?.msg
          ? typeof response.data.msg === 'string'
            ? response.data.msg
            : strings('api_error_messages.something_went_wrong')
          : strings('api_error_messages.something_went_wrong'),
        statusCode: status,
      });
      */
    } else {
      reject({
        message: strings('api_error_messages.something_went_wrong'),
        statusCode: status,
      });
    }
  });
}

export function postWithProgress(url, data, headers = {}) {
  // get attributes from url

  const { route, access_token_required } = url;

  // set X-API-TOKEN
  if (access_token_required) {
    const token = authSelectors.getUserToken(DataHandler.getStore());
    headers[X_API_TOKEN] = token;
  }

  return eventChannel(emitter => {
    api
      .post(route, data, {
        headers,
        onUploadProgress: e => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            emitter({ progress });
          }
        },
      })
      .then(
        response => {
          if (response.ok && response.data) {
            emitter({ success: response.data });
            emitter(END);
          } else if (response.problem === 'NETWORK_ERROR') {
            emitter({
              err: strings('api_error_messages.network_not_available'),
            });
            emitter(END);
          } else {
            emitter({
              err: strings('api_error_messages.something_went_wrong'),
            });
            emitter(END);
          }
        },
        err => {
          if (err.problem === 'NETWORK_ERROR') {
            emitter({
              err: strings('api_error_messages.network_not_available'),
            });
            emitter(END);
          } else {
            emitter({
              err: strings('api_error_messages.something_went_wrong'),
            });
            emitter(END);
          }
        }
      );

    return () => {};
  });
}

// for uploading images
export async function rocketChatPostFile(url, data, headers = {}) {
  const customAPI = create({
    baseURL: SOCKET_BASE_URL,
    headers: Object.keys(headers).length
      ? headers
      : {
          'Content-Type': 'multipart/form-data',
          'X-Access-Token': 'prcuxueiy0jq89tmjiprcuxueiy0jq89tmjj',
        },
    timeout: API_TIMEOUT,
  });

  const response = await customAPI.post(url, data);

  if (__DEV__ && API_LOG) {
    console.log('response', response);
  }

  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response || strings('api_error_messages.something_went_wrong'));
    }
  });
}
