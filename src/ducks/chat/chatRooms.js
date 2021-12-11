import _ from 'lodash';

import {
  ROOM_LISTING,
  UPDATE_ROOM,
  MARK_ROOM_AS_READ,
  DELETE_CONVERSION,
} from './types';
import { Util } from '../../utils';
import ChatDataUtil from '../../ChatUtil/ChatDataUtil';

const initialState = { data: {}, list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case MARK_ROOM_AS_READ: {
      const { roomName } = action;
      const newRoomData = { ...state.data[roomName], unread: 0 };
      return {
        ...state,
        data: {
          ...state.data,
          [roomName]: newRoomData,
        },
      };
    }
    case DELETE_CONVERSION.SUCCESS: {
      const { roomName } = action;
      const indeOfRoom = _.indexOf(state.list, roomName);
      const newList = [...state.list];
      if (indeOfRoom !== -1) {
        newList.splice(indeOfRoom, 1);
      }
      return { ...state, list: newList };
    }

    case ROOM_LISTING.SUCCESS: {
      const { items } = Util.normalizeData(action.data, 'fname');
      const filteredList = ChatDataUtil.getFilteredRoomListing(action.data);
      return { data: items, list: filteredList };
    }
    case UPDATE_ROOM: {
      const { fname } = action.data;
      const indeOfRoom = _.indexOf(state.list, fname);
      const isRoomTypeChat = ChatDataUtil.isRoomTypeChat(action.data);

      const newList =
        indeOfRoom === 0 || isRoomTypeChat === false
          ? state.list
          : [...state.list];
      if (indeOfRoom === -1 && isRoomTypeChat) {
        // add group at zero index
        newList.splice(0, 0, fname);
      } else if (indeOfRoom > 0 && isRoomTypeChat) {
        // remove at room index and then add at 0 index
        newList.splice(indeOfRoom, 1);
        newList.splice(0, 0, fname);
      }

      return {
        list: newList,
        data: {
          ...state.data,
          [fname]: action.data,
        },
      };
    }

    default:
      return state;
  }
};
