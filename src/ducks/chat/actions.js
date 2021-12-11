import {
  ROOM_LISTING,
  ROOM_CHAT,
  MESSAGE_RECEIVED,
  SOCKET_STATUS_CHANGE,
  UPDATE_ROOM,
  MARK_ROOM_AS_READ,
  PUSH_TOKEN_IS_SET,
  UPLOAD_FILE_AND_SEND_MESSAGE,
  DELETE_CONVERSION,
} from './types';

export function requestRoomListing(
  payload,
  reset,
  isPullToRefresh,
  isResetData = false
) {
  return {
    payload,
    reset,
    isPullToRefresh,
    isResetData,
    type: ROOM_LISTING.REQUEST,
  };
}

export function successRoomListing(data, reset) {
  return {
    data,
    reset,
    type: ROOM_LISTING.SUCCESS,
  };
}

export function failureRoomListing(errorMessage) {
  return {
    errorMessage,
    type: ROOM_LISTING.FAILURE,
  };
}

export function requestRoomChat(
  payload,
  reset,
  identifier,
  isResetData = false
) {
  return {
    payload,
    reset,
    identifier,
    isResetData,
    type: ROOM_CHAT.REQUEST,
  };
}

export function successRoomChat(data, reset, identifier, roomId) {
  return {
    data,
    reset,
    identifier,
    roomId,
    type: ROOM_CHAT.SUCCESS,
  };
}

export function failureRoomChat(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: ROOM_CHAT.FAILURE,
  };
}

export function messageReceived(roomInfo, message) {
  return {
    roomInfo,
    message,
    type: MESSAGE_RECEIVED,
  };
}

export function resetChat(identifier) {
  return {
    identifier,
    type: ROOM_CHAT.RESET,
  };
}

export function socektStatusChange(isSocketConnected, isSocketConnecting) {
  return {
    isSocketConnected,
    isSocketConnecting,
    type: SOCKET_STATUS_CHANGE,
  };
}

export function updateRoom(data) {
  return {
    data,
    type: UPDATE_ROOM,
  };
}

export function markRoomAsRead(roomName) {
  return {
    roomName,
    type: MARK_ROOM_AS_READ,
  };
}

export function pushTokenIsSet() {
  return {
    type: PUSH_TOKEN_IS_SET,
  };
}

export function uploadFileAndSendMessage(roomId, uri, callback) {
  return {
    roomId,
    uri,
    callback,
    type: UPLOAD_FILE_AND_SEND_MESSAGE,
  };
}

export function requestDeleteConversion(roomId, roomName) {
  return {
    roomId,
    roomName,
    identifier: roomName,
    type: DELETE_CONVERSION.REQUEST,
  };
}

export function successDeleteConversion(roomName, identifier) {
  return {
    roomName,
    identifier,
    type: DELETE_CONVERSION.SUCCESS,
  };
}

export function failureDeleteConversion(errorMessage, identifier) {
  return {
    errorMessage,
    identifier,
    type: DELETE_CONVERSION.FAILURE,
  };
}
