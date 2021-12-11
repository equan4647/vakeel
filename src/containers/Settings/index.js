import React from 'react';
import { FlatList, View } from 'react-native';

import { AppStyles } from '../../theme';
import styles from './styles';
import settingsData from '../../data/settings';
import { NavigationService } from '../../utils';
import Item from './Item';
import ListHeader from './Header';
import { useUserRole } from '../../utils/CustomHooks';

const Settings = () => {
  const isGuest = useUserRole();

  const onPress = (route, params) => NavigationService.navigate(route, params);
  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      style={AppStyles.flex}
      contentContainerStyle={styles.contentContainerStyle}
      data={isGuest ? settingsData.slice(1) : settingsData}
      renderItem={({ item }) => <Item {...{ onPress, ...item }} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default Settings;
