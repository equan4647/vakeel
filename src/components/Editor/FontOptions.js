import React from 'react';
import { MenuOption } from 'react-native-popup-menu';
import { View, FlatList, Text } from 'react-native';

import { Util } from '../../utils';
import styles from './styles';

const FontOptions = () => (
  <FlatList
    contentContainerStyle={styles.fontOptionsContainer}
    data={Util.EditorFontsList}
    renderItem={({ item }) => (
      <MenuOption value={item} key={item}>
        <View style={styles.fontsListItem}>
          <Text style={[styles.fontItemText, { fontFamily: item }]}>
            {item}
          </Text>
        </View>
      </MenuOption>
    )}
  />
);
export default React.memo(FontOptions);
