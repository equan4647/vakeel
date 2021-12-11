import { FlatList, ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import { IQKeyboardManager, NavigationService } from '../../utils';
import { ChatDataUtil, ChatHelper } from '../../ChatUtil';
import { KeyboardSpacer, Loader } from '../../components';
import { Metrics, AppStyles, Colors } from '../../theme';
import { CHAT_LIMIT } from '../../ChatUtil/Constants';
import ToolBar from './ToolBar';

import SocketDisconnected from './SocketDisconnected';
import styles from './styles';
import Item from './Item';

import { requestFlagSelectors } from '../../ducks/requestFlags';
import { chatActions, chatSelectors } from '../../ducks/chat';

const Chat = ({ navigation, route }) => {
  // get room info
  const room = route?.params?.room ?? {};
  const roomName = room?.fname ?? '';
  const roomId = room?.rid ?? 0;
  const member = ChatDataUtil.getMemberInfoRoom(room);
  const orderId = ChatDataUtil.getOrderIdFromRoomName(roomName);
  const chatLimit = orderId !== '' ? 50 : CHAT_LIMIT;

  const isSocketConnected = useSelector(chatSelectors.isSocketConnected);
  const isSocketConnecting = useSelector(chatSelectors.isSocketConnecting);

  const flatListRef = React.useRef(null);

  const scrollListToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    }
  };

  // dispatch
  const dispatch = useDispatch();

  // set chat room name
  React.useEffect(() => {
    ChatHelper.setCurrentChatroom(room);

    /*
    if (isSocketConnected === false && isSocketConnecting === false) {
      ChatHelper.connectToSocket();
    }
    */

    return () => {
      ChatHelper.setCurrentChatroom({});
    };
  }, []);

  // set header
  /*
  const options = {
    [strings('chat.delete_conversion')]: () => {
      Util.showAlertConfirm(
        strings('chat.delete_confirmation_message'),
        '',
        strings('chat.delete'),
        () => {
          dispatch(chatActions.requestDeleteConversion(roomId, roomName));
        }
      );
    },
  };
  NavigationService.setOptionsHeader(navigation, member.name, options, 0);
  */
  // NavigationService.setHeader(navigation, orderId || member.name);

  // hide keyboadr back
  NavigationService.hideKeyboardBack(navigation);

  NavigationService.setHeader(navigation, member.name, () => null, [roomName]);
  // disable IQ manager and reset chat
  React.useEffect(() => {
    IQKeyboardManager.setEnable(false);
    return () => {
      dispatch(chatActions.resetChat(roomName));
      IQKeyboardManager.setEnable(true);
    };
  }, []);

  // chatList & requestFlags and socket connected
  const chatList = useSelector(chatSelectors.getChatOfRoom(roomName));
  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`ROOM_CHAT_${roomName}`)
  );

  //console.log('requestFlags', requestFlags);

  // send request chat
  const sendRequestChat = (reset, extraPayload = {}, isResetData = false) => {
    const payload = { roomId: roomId, count: chatLimit, ...extraPayload };
    dispatch(
      chatActions.requestRoomChat(payload, reset, roomName, isResetData)
    );
  };

  // load data first time
  React.useEffect(() => {
    ChatHelper.setCurrentChatroom(room);
    if (isSocketConnected) {
      sendRequestChat(true, {}, true);
    }
  }, [isSocketConnected, roomName]);

  const sendRequestLoadMore = () => {
    const chatListLength = chatList.length;
    const chatListLastItem = chatList[chatListLength - 1];
    sendRequestChat(false, { latest: chatListLastItem.ts });
  };

  // on end reach
  const onEndReached = () => {
    const { loading, lastRecordsLength, failure } = requestFlags;

    if (!loading && lastRecordsLength >= CHAT_LIMIT && failure === false) {
      sendRequestLoadMore();
    }
  };

  // render loader load more
  const renderFooter = () => {
    const { loading } = requestFlags;
    if (loading) {
      return (
        <ActivityIndicator
          style={styles.topLoader}
          animating
          size="small"
          color={Colors.primary}
        />
      );
    }
    return null;
  };

  /*
  const renderHeader = () => {
    if (isSocketConnecting && chatList.length === 0) {
      return (
        <ActivityIndicator
          style={styles.topLoader}
          animating
          size="small"
          color={Colors.primary}
        />
      );
    }
    return null;
  };
  */

  const renderDisconnectMessage = () => {
    if (isSocketConnected || isSocketConnecting) {
      return null;
    }

    return <SocketDisconnected />;
  };

  // render item
  const renderItem = ({ item, index }) => {
    return (
      <Item
        item={item}
        showDate={ChatDataUtil.showDateChatMessage(index, chatList)}
      />
    );
  };

  // render main list
  return (
    <>
      <View style={AppStyles.flex}>
        {isSocketConnecting ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <ActivityIndicator
              style={styles.topLoader}
              animating
              size="small"
              color={Colors.primary}
            />
          </View>
        ) : (
          <FlatList
            data={chatList}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            style={AppStyles.container}
            contentContainerStyle={styles.contentContainerStyle}
            inverted
            onEndReachedThreshold={0.1}
            onEndReached={onEndReached}
            //ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            //ListHeaderComponent={renderHeader}
            extraData={requestFlags}
            ref={flatListRef}
          />
        )}

        {renderDisconnectMessage()}
        <ToolBar
          isSocketConnected={isSocketConnected && isSocketConnecting === false}
          showAttachment={true}
          roomId={roomId}
          scrollListToTop={scrollListToTop}
        />

        <KeyboardSpacer topSpacing={Metrics.BOTTOM_SPACING * -1 + 20} />
      </View>
      <Loader type={`DELETE_CONVERSION_${roomName}`} />
    </>
  );
};
export default Chat;

/*
const navigateToReport = () =>
  NavigationService.navigate('Report', { title: 'Report User' });
const options = {
  'Report User': navigateToReport,
  'Block User': () => alert('Blocked'),
};
const onPressMore = () => {
  Util.showMoreOptions(options, 0);
};
*/
