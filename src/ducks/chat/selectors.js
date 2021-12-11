const defaultList = [];

export const getRoomsInfo = store => store.chatRooms;
export const getRoomsData = store => store.chatRooms.data;
export const getRoomsList = store => store.chatRooms.list;

export const getUnreadCount = store =>
  store.chatRooms.list.filter(
    roomID => store.chatRooms.data[roomID]?.unread > 0
  )?.length;
// .reduce((a, chatObj) => a + chatObj?.unread, 0);

export const getChatOfRoom = identifier => store =>
  store.chatMessages?.[identifier] ?? defaultList;

export const isSocketConnected = store => store.chat.isSocketConnected;
export const isSocketConnecting = store => store.chat.isSocketConnecting;

export const getPushTokenSet = store => store.pushToken.isSet;
