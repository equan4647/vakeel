import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { screenOptions } from '../../config';
import {
  FoodCart,
  SelectOrderLocation,
  CurrentLocationMap,
  FoodOrderInProgress,
  FoodOrderDetail,
  Chat,
} from '../../../containers';

enableScreens();
const FoodCartStack = createStackNavigator();

export default () => (
  <FoodCartStack.Navigator {...{ screenOptions }}>
    <FoodCartStack.Screen name="FoodCart" component={FoodCart} />
    <FoodCartStack.Screen
      name="SelectOrderLocation"
      component={SelectOrderLocation}
    />
    <FoodCartStack.Screen name="FoodOrderDetail" component={FoodOrderDetail} />
    <FoodCartStack.Screen name="Chat" component={Chat} />
    <FoodCartStack.Screen
      name="CurrentLocationMap"
      component={CurrentLocationMap}
    />
    <FoodCartStack.Screen
      name="FoodOrderInProgress"
      component={FoodOrderInProgress}
    />
  </FoodCartStack.Navigator>
);
