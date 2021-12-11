import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_COUNT,
  RESET_NOTIFICATIONS_COUNT,
} from './types';

// export function requestGetNotifications(
//   payload,
//   reset,
//   isPullToRefresh,
//   isResetData = false
// ) {
//   return {
//     payload,
//     reset,
//     isPullToRefresh,
//     isResetData,
//     type: GET_NOTIFICATIONS.REQUEST,
//   };
// }

// export function successGetNotifications(data, page, reset) {
//   return {
//     data,
//     page,
//     reset,
//     type: GET_NOTIFICATIONS.SUCCESS,
//   };
// }

// export function failureGetNotifications(errorMessage) {
//   return { errorMessage, type: GET_NOTIFICATIONS.FAILURE };
// }

export function requestGetNotifications(
  payload,
  reset,
  isPullToRefresh,
  identifier,
  isResetData = false
) {
  return {
    payload,
    reset,
    isPullToRefresh,
    identifier,
    isResetData,
    type: GET_NOTIFICATIONS.REQUEST,
  };
}

export function successGetNotifications(data, page, reset, identifier) {
  return {
    data,
    page,
    reset,
    identifier,
    type: GET_NOTIFICATIONS.SUCCESS,
  };
}

export function failureGetNotifications(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: GET_NOTIFICATIONS.FAILURE,
  };
}

export function requestGetNotificationsCount() {
  return {
    type: GET_NOTIFICATIONS_COUNT.REQUEST,
  };
}

export function successGetNotificationsCount(data) {
  return {
    data,
    type: GET_NOTIFICATIONS_COUNT.SUCCESS,
  };
}

export function failureGetNotificationsCount(errorMessage) {
  return {
    errorMessage,
    type: GET_NOTIFICATIONS_COUNT.FAILURE,
  };
}

export function resetNotificationsCount(identifier) {
  return {
    identifier,
    type: RESET_NOTIFICATIONS_COUNT,
  };
}
