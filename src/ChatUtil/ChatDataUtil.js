import moment from 'moment';
import _ from 'lodash';

import { CHAT_IMAGE_URL, MESSAGE_TYPE, ROOM_TYPE_CHAT } from './Constants';
import { strings } from '../utils/i18n';
import ChatHelper from './ChatHelper';
import { Util } from '../utils';

function getLastMessageRoom(room) {
  const lastMessageObject = room?._room?.lastMessage ?? {};
  const lastMessage = lastMessageObject?.msg ?? '';
  const message = getTextFromMessage(lastMessage);
  const messageType = getTypeFromMessage(lastMessage);

  if (messageType === MESSAGE_TYPE.TEXT) {
    return message;
  } else if (messageType === MESSAGE_TYPE.IMAGE) {
    const isMine = isChatMine(lastMessageObject);
    const memberInfo = getMemberInfoRoom(room);
    const userName = isMine ? strings('chat.you') : memberInfo?.name ?? '';
    return strings('chat.sent_a_attachment', { key: 'user', value: userName });
    //return message;
  }
  return '';
}

function getMemberInfoRoom(room) {
  const members = room?.members ?? [];
  const rocketChatUserName = ChatHelper.getRocketChatUserName();
  const memberObject =
    rocketChatUserName !== ''
      ? _.find(members, member => member.username !== rocketChatUserName)
      : {};
  const name = memberObject?.name ?? 'Unknown';
  /*
  const image =
    memberObject && memberObject.username
      ? `${CHAT_IMAGE_URL}${
          memberObject.username
        }?random=${Util.getRandomNumber()}`
      : 'dummy';
  */
  const image =
    memberObject && memberObject.username
      ? `${CHAT_IMAGE_URL}${memberObject.username}`
      : 'dummy';

  return { name, image };
}

function getLastMessageDatetimeRoom(room) {
  return room?._room?.lastMessage?.ts ?? '';
  //return getDateWithFormat(room?._room?.lastMessage?.ts ?? '');
}

function getChatMessageDate(chatItem) {
  return chatItem?.ts ?? '';
  //return Util.formatDate2(chatItem?.ts ?? '', TIME_FORMAT_DISPLAY_CHAT);
}

function getUnreadCount(room) {
  return room?.unread ?? 0;
}

function isChatMine(chatItem) {
  const rocketChatUserName = ChatHelper.getRocketChatUserName();
  return chatItem?.u?.username === rocketChatUserName;
}

function getChatMessage(chatItem) {
  return chatItem?.msg ?? '';
}

function getTypeFromMessage(message) {
  if (message) {
    try {
      const data = JSON.parse(message);
      return data?.message_type ?? '';
    } catch (error) {
      return '';
    }
  }
  return '';
}

function getTextFromMessage(message) {
  if (message) {
    try {
      const data = JSON.parse(message);
      return data?.message ?? '';
    } catch (error) {
      return '';
    }
  }
  return '';
}

function showDateChatMessage(index, chatList) {
  if (index === chatList.length - 1) {
    return true;
  }
  const currentMessage = chatList[index];
  const previousMessage = chatList[index + 1];
  const dateCurrentMessage = getChatMessageDate(currentMessage);
  const datePreviousMessage = getChatMessageDate(previousMessage);
  if (dateCurrentMessage && datePreviousMessage) {
    return !moment(dateCurrentMessage).isSame(datePreviousMessage, 'day');
  }
  return false;
}

function getOrderIdFromRoomName(roomName) {
  if (roomName && roomName.includes('deliveryroom')) {
    const info = roomName.split('-');
    if (info.length > 0) {
      return `${strings('app.order')}#${info[1]}`;
    }
    return '';
  }
  return '';
}

function isRoomTypeChat(item) {
  const isChatRoom =
    item &&
    item.customFields &&
    item.customFields.roomType &&
    item.customFields.roomType === ROOM_TYPE_CHAT
      ? true
      : false;
  return isChatRoom;
}

function getFilteredRoomListing(data) {
  const roomData = [];
  data.map(item => {
    const isRoom =
      item._room &&
      item._room.customFields &&
      item._room.customFields.roomType === ROOM_TYPE_CHAT;
    const roomLastMessage = item?._room?.lastMessage?.msg ?? '';
    if (isRoom && roomLastMessage !== '') {
      roomData.push({
        fname: item.fname,
        date: item._room.lastMessage._updatedAt,
      });
    }
  });
  if (roomData.length > 0) {
    const sortedRooms = roomData.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    const roomNamesArray = sortedRooms.map(itemRoom => itemRoom.fname);
    return roomNamesArray;
  }
  return [];
}

export default {
  getLastMessageRoom,
  getMemberInfoRoom,
  getLastMessageDatetimeRoom,
  getUnreadCount,
  isChatMine,
  getChatMessage,
  getChatMessageDate,
  showDateChatMessage,
  getTypeFromMessage,
  getTextFromMessage,
  isRoomTypeChat,
  getOrderIdFromRoomName,
  getFilteredRoomListing,
};
