import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { screenOptions } from '../../config';
import { FoodTabHome, SearchedFood } from '../../../containers';

enableScreens();
const FoodStack = createStackNavigator();

export default props => (
  <FoodStack.Navigator {...{ screenOptions }}>
    <FoodStack.Screen name="FoodTabHome" component={FoodTabHome} />
    <FoodStack.Screen name="SearchedFood" component={SearchedFood} />
  </FoodStack.Navigator>
);
