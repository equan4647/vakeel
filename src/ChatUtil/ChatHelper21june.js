import * as SDK from '@rocket.chat/sdk';
import _ from 'lodash';

import {
  DataHandler,
  DeliveryRoomHelper,
  NavigationService,
  RestaurantDeliveryHelper,
  Util,
} from '../utils';
import {
  SOCKET_BASE_URL,
  NOTIFICATION_TYPE,
  APP_NAME,
  ROOM_TYPE_CHAT,
  MESSAGE_TYPE,
  RECONNECT_TIME,
} from './Constants';
import { UserUtil } from '../DataUtils';

import { isMessageForRestaurantDelivery } from '../utils/RestaurantDeliveryHelper';
import { chatActions, chatSelectors } from '../ducks/chat';
import { authSelectors, authActions } from '../ducks/auth';
import { strings } from '../utils/i18n';

let isSocketConnected = false,
  rocketChatUserName = '',
  isConnecting = false,
  currentChatRoom = {},
  reConnectTimeout,
  roomJoinData = {},
  ddp = null,
  connectSocketTimeOut,
  currentChatRoomFun;

function checkAuthorizationError(err) {
  const isRoomIsInvalid =
    err && err.error && err.error === 'error-invalid-room';
  const errorMessage = err?.toString() ?? '';
  if (
    errorMessage.includes('400') ||
    errorMessage.includes('401') ||
    isRoomIsInvalid
  ) {
    NavigationService.pop();
    Util.showMessage(strings('chat.chat_is_unavailable'));
  }
}

function hideLoaderRoom() {
  setTimeout(() => {
    const topLoader = DataHandler.getTopLoaderRef();
    topLoader.hide();
  }, 200);
}

function checkRoomExists(roomName) {
  const rooms = chatSelectors.getRoomsData(DataHandler.getStore().getState());
  //const roomInfo = _.find(rooms, { fname: roomName });

  if (rooms[roomName]) {
    goToChatScreen(rooms[roomName]);
    return true;
  }
  return false;
}

function goToChatScreen(roomInfo) {
  NavigationService.navigate('Chat', { room: roomInfo });
}

async function checkRoomAndNavigate(
  roomName,
  rocketChatMemberName,
  customFields = {},
  isRoomChat = true
) {
  if (isRoomChat) {
    customFields.roomType = ROOM_TYPE_CHAT;
  }
  if (!checkRoomExists(roomName)) {
    const topLoader = DataHandler.getTopLoaderRef();
    topLoader.show();
    if (isConnecting) {
      roomJoinData = {
        roomName,
        rocketChatMemberName,
        customFields,
        isRoomChat,
      };
    } else if (isSocketConnected === false) {
      roomJoinData = {
        roomName,
        rocketChatMemberName,
        customFields,
        isRoomChat,
      };
      connectToSocket();
    } else {
      try {
        const payload = { roomName };
        const roominfo = await SDK.api.get('rooms.info', payload);
        if (roominfo.room) {
          hideLoaderRoom();
          DataHandler.getStore().dispatch(
            chatActions.updateRoom(roominfo.room)
          );
          goToChatScreen(roominfo.room);
        } else {
          if (isRoomChat) {
            createRoomAndNavigate(roomName, rocketChatMemberName, customFields);
          } else {
            Util.showMessage('chat.user_is_unavailable');
            hideLoaderRoom();
          }
        }
      } catch (err2) {
        if (isRoomChat) {
          createRoomAndNavigate(roomName, rocketChatMemberName, customFields);
        } else {
          Util.showMessage('chat.user_is_unavailable');
          hideLoaderRoom();
        }
      }
    }
  }
}

async function createRoomAndNavigate(
  roomName,
  rocketChatMemberName,
  customFields
) {
  try {
    const roomCreated = await SDK.api.post('groups.create', {
      name: roomName,
      members: [rocketChatMemberName],
      customFields,
    });
    if (roomCreated.group) {
      const newRoom = {
        ...roomCreated.group,
        unread: 0,
        userMentions: 0,
        rid: roomCreated?.group?._id ?? 0,
        fname: roomCreated?.group?.fname ?? '',
        _room: {
          _id: roomCreated?.group?._id ?? 0,
          name: roomCreated?.group?.name ?? '',
          fname: roomCreated?.group?.fname ?? '',
        },
      };

      DataHandler.getStore().dispatch(chatActions.updateRoom(newRoom));
      goToChatScreen(newRoom);
    } else {
      Util.showMessage(strings('api_error_messages.something_went_wrong'));
    }
  } catch (err) {
    Util.showMessage(strings('api_error_messages.something_went_wrong'));
  } finally {
    hideLoaderRoom();
  }
}

// callback for incoming messages filter and processing
async function onMessageReceive(err, message, messageOptions) {
  if (!err) {
    try {
      const msg = message.fields.args[0];
      const roomInfo = message.fields.args[1];

      const messageObject = JSON.parse(msg.msg);
      const messageType = messageObject?.message_type ?? '';

      if (
        messageType === MESSAGE_TYPE.TEXT ||
        messageType === MESSAGE_TYPE.IMAGE
      ) {
        DataHandler.getStore().dispatch(
          chatActions.messageReceived(roomInfo, msg)
        );
      } else if (DeliveryRoomHelper.isMessageInDeliveryRoom(message)) {
        DeliveryRoomHelper.handleDeliveryRoom(message);
      } else if (isMessageForRestaurantDelivery(message)) {
        RestaurantDeliveryHelper.handleRestaurantDelivery(message);
      }
    } catch (error) {}
  }
}

async function markReadMessages(rid, roomName) {
  try {
    await SDK.api.post('subscriptions.read', { rid });
  } catch (error) {}
}

function onDisconnected() {
  disconnectSocket();
  reconnectSocket();
}

async function disconnectSocket(isLogout = false) {
  if (isSocketConnected) {
    try {
      isConnecting = false;
      DataHandler.getStore().dispatch(
        chatActions.socektStatusChange(false, false)
      );
      ddp = null;
      isSocketConnected = false;
      if (isLogout) {
        await SDK.api.logout();
        await SDK.driver.disconnect();
      } else {
        await SDK.driver.unsubscribeAll();
        await SDK.api.setAuth({ undefined });
        SDK.api.currentLogin = null;
      }
    } catch (error) {
      //console.warn(error, 'fcfcfcfcf');
    }
  }
}

async function connectOnLogin() {
  connectToSocket();
}

async function updatePushTokenIfNeeded() {
  const store = DataHandler.getStore().getState();
  const { dispatch } = DataHandler.getStore();

  const isSet = chatSelectors.getPushTokenSet(store);
  if (!isSet) {
    setPushToken(() => {
      dispatch(chatActions.pushTokenIsSet());
    });
  }
}

async function setPushToken(callback = undefined) {
  const store = DataHandler.getStore().getState();
  const token = authSelectors.getDeviceToken(store);
  if (token) {
    const payload = {
      type: NOTIFICATION_TYPE.GCM,
      value: token,
      appName: APP_NAME,
    };
    try {
      await SDK.api.post('push.token', payload);
      if (callback) {
        callback();
      }
    } catch (error) {}
  }
}

async function removePushToken(disconnect = false) {
  const store = DataHandler.getStore().getState();
  const token = authSelectors.getDeviceToken(store);
  if (token) {
    try {
      const payload = { token };
      await SDK.api.del('push.token', payload);
      if (disconnect) {
        disconnectSocket();
      }
    } catch (error) {
      if (disconnect) {
        disconnectSocket();
      }
    }
  }
}

async function connectToSocket(isFirstTime = false) {
  // get chat user token
  const { auth } = DataHandler.getStore().getState();
  const chatAccessToken =
    auth?.data?.rocket_chat_account?.data?.authToken ?? '';

  // remove timeout
  if (reConnectTimeout) {
    clearTimeout(reConnectTimeout);
  }

  if (connectSocketTimeOut) {
    clearTimeout(connectSocketTimeOut);
  }

  connectSocketTimeOut = setTimeout(async () => {
    if (
      chatAccessToken !== '' &&
      isConnecting === false &&
      isSocketConnected === false
    ) {
      // set rocket chat userid
      rocketChatUserName =
        auth?.data?.rocket_chat_account?.data?.me?.username ?? '';

      if (rocketChatUserName) {
        // check if use ssl
        const useSsl = SOCKET_BASE_URL.indexOf('https://') === 0;
        try {
          // disconnect socket
          await SDK.driver.unsubscribeAll();
          await SDK.api.setAuth({ undefined });
          SDK.api.currentLogin = null;

          if (isFirstTime) {
            // set isconnecting true
            isConnecting = true;
            DataHandler.getStore().dispatch(
              chatActions.socektStatusChange(false, true)
            );
          }

          // set base url api
          SDK.api.setBaseUrl(SOCKET_BASE_URL);

          // connect to rocket chat
          ddp = await SDK.driver.connect({
            host: SOCKET_BASE_URL,
            useSsl: useSsl,
            timeout: 5000,
          });

          // if socket connect successfully
          if (ddp) {
            // set isconnecting true
            isConnecting = true;
            DataHandler.getStore().dispatch(
              chatActions.socektStatusChange(false, true)
            );

            // resume login with rocket.chat authToken given by server
            await SDK.driver.login({
              resume: chatAccessToken,
            });

            // login with api
            await SDK.api.login({
              resume: chatAccessToken,
            });

            // unsubscribe for subscringing to rooms
            await SDK.driver.unsubscribeAll();

            // subscribe to messages
            await SDK.driver.subscribeToMessages();

            // response to message when change in stream
            await SDK.driver.reactToMessages(onMessageReceive);

            // when socket gets disconnect

            SDK.driver.on('disconnected', onDisconnected);

            // set socket is connected
            isSocketConnected = true;
            isConnecting = false;

            DataHandler.getStore().dispatch(
              chatActions.socektStatusChange(true, false)
            );

            // get rooms
            DataHandler.getStore().dispatch(
              chatActions.requestRoomListing({}, true, false)
            );

            if (Util.isNotEmpty(roomJoinData)) {
              const {
                roomName,
                rocketChatMemberName,
                customFields,
                isRoomChat,
              } = roomJoinData;

              checkRoomAndNavigate(
                roomName,
                rocketChatMemberName,
                customFields,
                isRoomChat
              );
            }

            roomJoinData = {};

            // update push token if needed
            //updatePushTokenIfNeeded();
          }
        } catch (err) {
          if (Util.isNotEmpty(roomJoinData)) {
            Util.showMessage(strings('chat.server_not_connected'));
          }
          roomJoinData = {};
          isConnecting = false;
          DataHandler.getStore().dispatch(
            chatActions.socektStatusChange(false, false)
          );

          hideLoaderRoom();

          disconnectSocket();

          reconnectSocket();
          if (err && err.error && err.error === 403) {
            DataHandler.getStore().dispatch(authActions.requestLogout());
          }
        }
      }
    }
  }, 200);
}
function reconnectSocket() {
  if (reConnectTimeout) {
    clearTimeout(reConnectTimeout);
  }

  reConnectTimeout = setTimeout(() => {
    const userData = authSelectors.getUser(DataHandler.getStore().getState());
    const userExists = userData && userData._id ? true : false;
    const isInternetConnected = DataHandler.getIsInternetConnected();
    if (
      isInternetConnected &&
      userExists &&
      isSocketConnected === false &&
      isConnecting === false
    ) {
      connectToSocket();
    }
  }, RECONNECT_TIME);
}
async function sendMessageToRoom(message, roomId, successCallback) {
  try {
    //await SDK.driver.sendToRoomId(message, `${roomId}abc`);
    await SDK.driver.sendToRoomId(message, roomId);

    if (successCallback) {
      successCallback();
    }
  } catch (err) {
    checkAuthorizationError(err);
  }
}

function getRoomNameAndNavigate(user) {
  const userName = UserUtil.getRocketChatUserName(user);
  if (userName) {
    const currentUserName = getRocketChatUserName();
    const roomName =
      userName > currentUserName
        ? `${currentUserName}-${userName}`
        : `${userName}-${currentUserName}`;
    checkRoomAndNavigate(roomName.toLowerCase(), userName);
  } else {
    Util.showMessage(strings('chat.user_is_unavailable'));
  }
}

function getRocketChatUserName() {
  //return currentChatRoom;
  const { auth } = DataHandler.getStore().getState();
  return auth?.data?.rocket_chat_account?.data?.me?.username ?? '';
}

function setCurrentChatroom(chatRoom) {
  currentChatRoom = chatRoom;
}

function getCurrentChatroom() {
  return currentChatRoom;
}

function getIsConnecting() {
  return isConnecting;
}

function getIsSocketConnected() {
  return isSocketConnected;
}

export default {
  setPushToken,
  removePushToken,
  connectToSocket,
  disconnectSocket,
  checkRoomAndNavigate,
  createRoomAndNavigate,
  sendMessageToRoom,
  getRocketChatUserName,
  checkRoomExists,
  goToChatScreen,
  setCurrentChatroom,
  getCurrentChatroom,
  markReadMessages,
  connectOnLogin,
  updatePushTokenIfNeeded,
  getIsConnecting,
  getIsSocketConnected,
  getRoomNameAndNavigate,
  checkAuthorizationError,
};

//navigateToUserChat();
//navigateToUserChat({ _id: '605c8a2fc71cff1c1a4c41fc' });
//navigateToUserChat({ _id: '605c6b4a3879910db2d03c91' });
//navigateToUserChat({ _id: '605c67a95f20390c3e9fe13e' });
//navigateToUserChat({ _id: '60360cd63df4e8563708b9de' });
//"_id": "605c67a95f20390c3e9fe13e",
/*
        navigateToChat(
          'classfieid-30',
          'bizad-undefined6061b30600a50566eff1ca74',
          { classifeidId: 1 }
        );
        */

/*
        bizad-undefined6061b30600a50566eff1ca74
        */

/*
        // syn rooms
        DataHandler.getStore().dispatch(
          chatActions.requestRoomListing({}, true, false)
        );

        navigateToChat(
          'classfieid-28',
          'bizad-undefined6061b30600a50566eff1ca74',
          { classifeidId: 1 }
        );
        */

/*
        bizad-undefined6061b30600a50566eff1ca74
        */
/*
        checkRoomAndNavigate(
          'classfieid-888',
          'bizad-undefined6061b40d00a50566eff1ca76'
        );
        */

//console.log('groupCreated1');

/*
        try {
          const groupCreated = await SDK.api.post('groups.create', {
            name: 'classfieid-37777777',
            members: ['bizad-undefined6061b40d00a50566eff1ca76'],
            //customFields: customFields,
          });
        } catch (err) {
          console.log('here555', err);
        }
        */

//console.log('groupCreated', groupCreated);

/*
        checkRoomAndNavigate(
          'classfieid-3033',
          'bizad-undefined6061b40d00a50566eff1ca76',
          {
            classifeidId: 1,
          }
        );
          */
