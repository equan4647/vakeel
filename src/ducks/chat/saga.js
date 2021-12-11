import { put, takeLatest, takeEvery, select, call } from 'redux-saga/effects';
import * as SDK from '@rocket.chat/sdk';

import {
  successRoomListing,
  failureRoomListing,
  successRoomChat,
  failureRoomChat,
  updateRoom,
  markRoomAsRead,
  successDeleteConversion,
  failureDeleteConversion,
} from './actions';
import { getRoomsData } from './selectors';
import {
  ROOM_LISTING,
  ROOM_CHAT,
  MESSAGE_RECEIVED,
  UPLOAD_FILE_AND_SEND_MESSAGE,
  DELETE_CONVERSION,
} from './types';
import { MESSAGE_TYPE } from '../../ChatUtil/Constants';
import { Util, NavigationService } from '../../utils';
import ChatHelper from '../../ChatUtil/ChatHelper';
import { strings } from '../../utils/i18n';

import { callRequestFileUpload } from '../../utils/ApiSauce';

function* watchRoomListingRequest(action) {
  if (ChatHelper.getIsSocketConnected()) {
    const { reset } = action;
    try {
      const roomsList = yield SDK.api.get('rooms.get', {}, true);
      const roomsData = roomsList?.update ?? [];

      yield put(successRoomListing(roomsData, reset));
    } catch (err) {
      yield put(
        failureRoomListing(strings('api_error_messages.something_went_wrong'))
      );
    }
  }
}

function* watchChatListingRequest(action) {
  const { reset, payload, identifier } = action;
  try {
    const chatList = yield SDK.api.get('groups.history', payload, true);
    yield put(
      successRoomChat(
        chatList?.messages ?? [],
        reset,
        identifier,
        payload.roomId
      )
    );
  } catch (err) {
    const errorMessage = err?.toString() ?? '';
    ChatHelper.checkAuthorizationError(err);
    yield put(failureRoomChat(errorMessage || '', identifier));
  }
}

function* watchOnMessageReceived(action) {
  const { roomInfo, message } = action;

  try {
    const currentRoom = ChatHelper.getCurrentChatroom();
    const rocketChatUserName = ChatHelper.getRocketChatUserName();
    const roomsData = yield select(getRoomsData);
    const { roomName } = roomInfo;

    // if we have room data
    if (roomsData[roomName]) {
      const isMessageInSameRoom =
        currentRoom && currentRoom.fname && currentRoom.fname === roomName;
      const isMessageFromCurrentUser =
        message && message.u && message.u.username === rocketChatUserName;

      const newRoomData = { ...roomsData[roomName] };
      newRoomData._room.lastMessage = message;

      if (isMessageInSameRoom) {
        // read on server if it is not your message
        if (!isMessageFromCurrentUser) {
          const { rid } = newRoomData;
          yield SDK.api.post('subscriptions.read', { rid });
        }
        // set count
        newRoomData.unread = 0;
      } else {
        const oldCount = Number(newRoomData?.unread ?? 0);
        const newUnread = oldCount + 1;
        newRoomData.unread = newUnread;
      }
      yield put(updateRoom(newRoomData));
    } else {
      const payload = {
        roomName: roomName,
      };
      const roominfo = yield SDK.api.get('rooms.info', payload);
      if (roominfo.room) {
        yield put(updateRoom(roominfo.room));
      }
    }
  } catch (err) {}
}

function* watchChatListingSuccess(action) {
  const { roomId, identifier, reset } = action;
  try {
    if (reset) {
      yield SDK.api.post('subscriptions.read', { rid: roomId });
      yield put(markRoomAsRead(identifier));
    }
  } catch (error) {}
}

function* watchUploadFileRequest(action) {
  const { roomId, uri, callback } = action;
  try {
    const response = yield call(callRequestFileUpload, uri);

    const message = {
      message_type: MESSAGE_TYPE.IMAGE,
      message: response?.data?.file ?? '',
    };
    const messageJson = JSON.stringify(message);
    yield ChatHelper.sendMessageToRoom(messageJson, roomId);

    if (callback) {
      callback(true);
    }
  } catch (error) {
    Util.showMessage(strings('api_error_messages.something_went_wrong'));
    if (callback) {
      callback(false);
    }
  }
}

function* watchDeleteConversionRequest(action) {
  const { roomId, roomName, identifier } = action;
  try {
    const payload = { roomId };
    yield SDK.api.post('chat.deleteConversation', payload);
    yield put(successDeleteConversion(roomName, identifier));
    NavigationService.pop();
  } catch (error) {
    yield put(
      failureDeleteConversion(
        'api_error_messages.something_went_wrong',
        identifier
      )
    );
    Util.showMessage(strings('api_error_messages.something_went_wrong'));
  }
}

export default function* root() {
  yield takeLatest(ROOM_LISTING.REQUEST, watchRoomListingRequest);
  yield takeEvery(ROOM_CHAT.REQUEST, watchChatListingRequest);
  yield takeEvery(DELETE_CONVERSION.REQUEST, watchDeleteConversionRequest);
  yield takeEvery(ROOM_CHAT.SUCCESS, watchChatListingSuccess);
  yield takeEvery(UPLOAD_FILE_AND_SEND_MESSAGE, watchUploadFileRequest);
  yield takeEvery(MESSAGE_RECEIVED, watchOnMessageReceived);
}
