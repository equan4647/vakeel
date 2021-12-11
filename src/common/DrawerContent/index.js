import React from 'react';
import { FlatList } from 'react-native';
import {
  DrawerContentScrollView,
  useIsDrawerOpen,
} from '@react-navigation/drawer';

import { guestDrawer, userDrawer } from '../../data/drawer';
import { useUserRole } from '../../utils/CustomHooks';
import styles from './styles';
import ListItem from './Item';
import Footer from './Footer';
import Header from './Header';
import { useSelector } from 'react-redux';
import { getUnreadCount } from '../../ducks/chat/selectors';
import { Util } from '../../utils';

const DrawerStatusBarChange = React.memo(() => {
  const isDrawerOpen = useIsDrawerOpen();
  if (isDrawerOpen) {
    Util.setStatusBarStyle('light-content');
  } else {
    Util.setStatusBarStyle('dark-content');
  }
  return null;
});

const DrawerContent = props => {
  const isGuest = useUserRole(),
    chatUnreads = useSelector(getUnreadCount);

  const userDrawerData = userDrawer.map(_obj => {
    if (_obj.name === 'Messages') {
      return { ..._obj, badge: chatUnreads };
    } else {
      return _obj;
    }
  });

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={styles.container}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Header />}
        ListFooterComponent={() => <Footer />}
        data={isGuest ? guestDrawer : userDrawerData}
        contentContainerStyle={styles.flatlistContainer}
        renderItem={({ item }) => <ListItem {...item} />}
      />
      <DrawerStatusBarChange />
    </DrawerContentScrollView>
  );
};

export default React.memo(DrawerContent, () => true);
