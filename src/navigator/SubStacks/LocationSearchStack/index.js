import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { LocationSearch, CurrentLocationMap } from '../../../containers';
import { screenOptions } from '../../config';

enableScreens();
const LocationSearchStack = createStackNavigator();

export default props => (
  <LocationSearchStack.Navigator {...{ screenOptions }}>
    <LocationSearchStack.Screen
      name="LocationSearch"
      component={LocationSearch}
    />
    <LocationSearchStack.Screen
      name="CurrentLocationMap"
      component={CurrentLocationMap}
    />
  </LocationSearchStack.Navigator>
);
