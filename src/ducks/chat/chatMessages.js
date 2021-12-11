import { MESSAGE_RECEIVED, ROOM_CHAT, DELETE_CONVERSION } from './types';
import { AppUtil } from '../../utils';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_RECEIVED: {
      const { roomInfo, message } = action;
      const roomName = roomInfo?.roomName ?? '';
      if (roomName) {
        const previousList = state?.[roomName] ?? [];
        const found = previousList.find(element => element._id === message._id);
        const newChatList = found
          ? previousList
          : [message, ...state[roomName]];

        return { ...state, [roomName]: newChatList };
      }
      return state;
    }
    case DELETE_CONVERSION.SUCCESS: {
      const newData = { ...state };
      delete newData[action.roomName];
      return newData;
    }

    case ROOM_CHAT.REQUEST: {
      if (action.isResetData) {
        return {
          ...state,
          [action.identifier]: [],
        };
      }
      return state;
    }

    case ROOM_CHAT.SUCCESS: {
      return {
        ...state,
        [action.identifier]: AppUtil.getConcatDataList(
          action,
          action.data,
          state
        ),
      };
    }
    case ROOM_CHAT.RESET: {
      return {
        ...state,
        [action.identifier]: [],
      };
    }

    default:
      return state;
  }
};

/*
import { ROOM_LISTING } from './types';
 case ROOM_LISTING.SUCCESS: {
      return { ...state, rooms: [action.data] };
    }
*/
