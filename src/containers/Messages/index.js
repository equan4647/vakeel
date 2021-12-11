import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

import { NavigationService } from '../../utils';
import { FlatListApi } from '../../components';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';
import Item from './Item';

import { requestFlagSelectors } from '../../ducks/requestFlags';
import { chatActions, chatSelectors } from '../../ducks/chat';
import { EmptyView } from '../../common';

const Messages = ({ navigation }) => {
  // set header
  NavigationService.setHeader(navigation, strings('app.messages'));

  const roomsList = useSelector(chatSelectors.getRoomsList);
  const roomsData = useSelector(chatSelectors.getRoomsData);
  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag('ROOM_LISTING')
  );
  console.log(roomsList.length, 'roooms');
  return (
    <FlatListApi
      data={roomsList}
      requestAction={chatActions.requestRoomListing}
      style={AppStyles.flex}
      contentContainerStyle={styles.contentContainerStyle}
      requestFlags={requestFlags}
      keyExtractor={item => `${item}`}
      renderItem={({ item }) => <Item item={roomsData[item] || {}} />}
      //ItemSeparatorComponent={() => <View style={styles.seperator} />}
      extraData={roomsData}
      ListEmptyComponent={
        <EmptyView
          withoutArrow
          image="messages"
          text={strings('app.messages_empty_text')}
          imageStyle={AppStyles.emptyViewImage}
          containerStyle={AppStyles.emptyContainerStyle}
        />
      }
    />
  );
};

export default Messages;
