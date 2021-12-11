import createRequestTypes from '../ActionTypes';

export const ROOM_LISTING = createRequestTypes('ROOM_LISTING');
export const ROOM_CHAT = createRequestTypes('ROOM_CHAT');
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const UPLOAD_FILE_AND_SEND_MESSAGE = 'UPLOAD_FILE_AND_SEND_MESSAGE';
export const SOCKET_STATUS_CHANGE = 'SOCKET_STATUS_CHANGE';
export const MARK_ROOM_AS_READ = 'MARK_ROOM_AS_READ';
export const PUSH_TOKEN_IS_SET = 'PUSH_TOKEN_IS_SET';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const DELETE_CONVERSION = createRequestTypes('DELETE_CONVERSION');
