import { FlatList } from 'react-native';
import React from 'react';

import { NavigationService } from '../../utils';
import { AppStyles } from '../../theme';
import { chatData } from '../../data';
import { Text } from '../../components';
import styles from './styles';
import Item from './Item';

const messages2 = [
  {
    id: 1,
    userid: 1,
    message: 'Kidney function, liver function',
    datetime: '2021-01-02 11:12:00',
    isMine: true,
    isRead: true,
  },
  {
    id: 2,
    userid: 2,
    message: 'Wow.',
    datetime: '2021-01-02 11:14:00',
    isMine: false,
  },
  {
    id: 3,
    userid: 2,
    message: 'So what is going on?',
    datetime: '2021-01-02 11:15:00',
    isMine: false,
  },
  {
    id: 4,
    userid: 1,
    message:
      'We had a meth addict in here this morning who was biologically younger',
    datetime: '2021-01-02 11:30:00',
    isMine: true,
    isRead: true,
  },
];

const Chat = ({ navigation }) => {
  // set header
  NavigationService.setTitle(navigation, 'Micheal Doe');

  const [chatList, setChatList] = React.useState(chatData);

  // render item
  const renderItem = ({ item, index }) => {
    return <Item item={item} showDate={index === 0} isMine={item.isMine} />;
  };

  // main render
  return (
    <>
      <FlatList
        data={chatList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={AppStyles.container}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <Text
        style={{ padding: 20 }}
        onPress={() => {
          setChatList([...messages2, ...chatList]);
        }}
      >
        add text
      </Text>
    </>
  );
};
export default Chat;
