import React from 'react';
import { Image } from 'react-native';
import { Colors, Images } from '../../theme';

const TabIcon = ({ focused, route }) => (
  <Image
    source={Images.tabs[route.name]}
    style={{ tintColor: focused ? Colors.primary : Colors.white214 }}
  />
);
export default React.memo(TabIcon);
